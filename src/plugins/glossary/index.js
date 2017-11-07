/* eslint-disable prefer-reflect, default-case, react/display-name */
import React, {Component} from 'react';
import LibraryBooksIcon from 'material-ui-icons/LibraryBooks';
import { Data } from 'slate';
import { makeTagMark, ToolbarButton } from '../../helpers';
import Plugin from '../Plugin';
import Input, { InputLabel } from 'material-ui/Input';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import { MenuItem } from 'material-ui/Menu';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Dialog, { DialogActions, DialogTitle, DialogContent } from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import request from 'superagent';
import Glossary from './node';
import type { Props } from '../props';

export const GLOSSARY = 'GLOSSARY/GLOSSARY';
const METADATA_SERVICE = process.env.REACT_APP_METADATA_SERVICE;


const renderInputComponent = (inputProps) => {
    const { autoFocus, value, ref, ...other } = inputProps;
    return (
        <TextField
            name="Autocomplete"
            label="Definition"
            inputRef={ref}
            value={value}
            InputProps={{
                ...other,
            }}
        />
    );
};

const renderSuggestion = (suggestion, { query, isHighlighted }) => {
    const matches = match(suggestion.definition, query);
    const parts = parse(suggestion.definition, matches);

    return (
        <MenuItem selected={isHighlighted} component="div">
            <div>
                {parts.map((part, idx) => {
                    return part.highlight ? (
                        <span key={part.text}>
                            {part.text}
                        </span>
                    ) : (
                        <em key={part.text}>
                            {part.text}
                        </em>
                    );
                })}
            </div>
        </MenuItem>
    );
}

const renderSuggestionContainer = (options) => {
    const { containerProps, children } = options;
    return (
        <Paper {...containerProps}>
            {children}
        </Paper>
    );
}

const getDefinitionForSuggestion = (suggestion) => {
    return suggestion;
};

class GlossaryButton extends Component {
    state = {
        open: false,
        definition: '',
        id: '',
        term: '',
        options: [],
        hadDefinition: false
    }

    props: Props

    input: Component<*, *, *>

    onRef = (component: Component<*, *, *>) => {
        if (!component && true) {
            return null
        }

        const e = component.querySelector('input')
        if (e) {
            e.focus()
        }
    }

    onClick = e => {
        const { editorState, onChange } = this.props
        e.preventDefault()

        const hasDefinition = editorState.inlines.some(
            (inline: any) =>inline.type === GLOSSARY);

        const selection = editorState.characters.map(char => char.text).join('');

        if (hasDefinition) {
            const newState = editorState
                .transform()
                .unwrapInline(GLOSSARY)
                .apply()
            onChange(newState)
        } else if (editorState.isExpanded) {
            request.get(`${METADATA_SERVICE}/glossary/search?term=${selection}`)
                .then(res => {
                    // Search the glossary for the term
                    this.setState({
                        open: true,
                        wasExpanded: editorState.isExpanded,
                        definition: '',
                        id: '',
                        term: selection,
                        hadDefinition: hasDefinition,
                        options: res.body.docs,
                    });
                }).catch(err => console.log(new Error(err)));
        } else {
            this.setState({
                open: true,
                wasExpanded: editorState.isExpanded,
                definition: '',
                id: '',
                term: '',
                options: [],
                hadDefinition: hasDefinition
            });
        }
    }

    handleClose = () => {
        this.setState({ open: false })

        const newState = this.props.editorState
            .transform()
            .focus()
            .apply()
        window.setTimeout(() => this.props.onChange(newState), 1)
    }

    handleSubmit = () => {
        this.setState({ open: false })

        if (!this.state.definition) {
            this.handleClose()
            return
        }

        // if no id write the new term to the metadata service
        const add = new Promise((resolve, reject) => {
            if (!this.state.id) {
                request.post(`${METADATA_SERVICE}/glossary`)
                    .send({
                        term: this.state.term,
                        definition: this.state.definition
                    })
                    .then(res => {
                        resolve(res.body.id);
                    })
                    .catch(err => reject(err));
            } else {
                resolve(this.state.id);
            }
        });

        add.then(id => {
            if (this.state.wasExpanded) {
                const newState = this.props.editorState
                    .transform()
                    .focus()
                    .apply()
                    .transform()
                    .wrapInline({
                        type: GLOSSARY,
                        data: { id },
                    })
                    .collapseToEnd()
                    .apply()

                window.setTimeout(() => this.props.onChange(newState), 1)
                window.setTimeout(() => this.props.focus(), 100)
                return
            }

            const newState = this.props.editorState
                .transform()
                .insertText(this.state.term)
                .extend(-this.state.term.length)
                .wrapInline({
                    type: GLOSSARY,
                    data: { id }
                })
                .collapseToEnd()
                .focus()
                .apply()

            this.props.onChange(newState)
            window.setTimeout(() => this.props.focus(), 100)
        }).catch(err => console.log(err));
    }

    onDefinitionChange = (e, t) => {
        if(t.newValue instanceof Object) {
            this.setState({
                definition: t.newValue.definition,
                id: t.newValue.id,
            });
        } else {
            this.setState({
                definition: t.newValue,
                id: null,
            });
        }
    }

    handleFetchRequest = e => {
        if(e.value.length > 3) {
            if (e.value != this.state.term) {
                // do a new search
                request.get(`${METADATA_SERVICE}/glossary/search?term=${e.value}`)
                    .then(res => {
                        this.setState({
                            options: res.body.docs
                        });
                    }).catch(err => console.log(new Error(err)));
            }
        }
    }

    handleClearSuggested = () => {
        this.setState({
            options: [],
        });
    }

    render() {
        const { editorState } = this.props

        const hasDefinition = editorState.inlines.some(
            (inline: any) => inline.type === GLOSSARY
        )

        return (
            <span>
                <ToolbarButton
                    onClick={this.onClick}
                    isActive={hasDefinition}
                    icon={<LibraryBooksIcon />}
                />
                <span>
                    <Dialog
                        className="ory-prevent-blur"
                        open={this.state.open}
                    >
                        <DialogTitle>Add or Select a Glossary Definition</DialogTitle>
                        <DialogContent>
                            {this.state.wasExpanded ? null : (
                                <TextField
                                    id="term"
                                    label="Term"
                                    hintText="Glossary Term"
                                    value={this.state.term}
                                />
                            )}
                            <Autosuggest
                                renderInputComponent={renderInputComponent}
                                suggestions={this.state.options}
                                onSuggestionsFetchRequested={this.handleFetchRequest}
                                onSuggestionsClearRequested={this.handleClearSuggested}
                                getSuggestionValue={getDefinitionForSuggestion}
                                renderSuggestionsContainer={renderSuggestionContainer}
                                renderSuggestion={renderSuggestion}
                                inputProps={{
                                    placeholder: 'Select a definition or enter a new definition',
                                    value: this.state.definition,
                                    onChange: this.onDefinitionChange,
                                }}
                                id="definition"
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button
                                key="0"
                                color="accent"
                                onClick={this.handleClose}
                            >
                                Cancel
                            </Button>
                            <Button
                                key="1"
                                color="primary"
                                onClick={this.handleSubmit}
                            >
                                Submit
                            </Button>
                        </DialogActions>
                    </Dialog>
                </span>
            </span>
        )
    }
}

export default class GlossaryPlugin extends Plugin {
    name = 'glossary'

    nodes = { [GLOSSARY]: Glossary }

    hoverButtons = [GlossaryButton]

    deserialize = (el, next) => {
        switch (el.tagName.toLowerCase()) {
            case 'glossary':
                return {
                    kind: 'inline',
                    type: GLOSSARY,
                    nodes: next(el.childNodes),
                    data: Data.create({
                        id: (el.attrs.find(({ name }) => name === 'id') || {
                            value: ''
                        }).value
                    })
                }
        }
    }

    serialize = (
        object: { type: string, kind: string, data: any },
        children: any[]
    ) => {
        if (object.kind !== 'inline') {
            return
        }

        switch (object.type) {
            case GLOSSARY:
                return <Glossary node={object.data}>{children}</Glossary>
        }
    }
}