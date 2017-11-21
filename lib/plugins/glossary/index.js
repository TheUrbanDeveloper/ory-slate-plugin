'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.GLOSSARY = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _LibraryBooks = require('material-ui-icons/LibraryBooks');

var _LibraryBooks2 = _interopRequireDefault(_LibraryBooks);

var _slate = require('slate');

var _helpers = require('../../helpers');

var _Plugin2 = require('../Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

var _Input = require('material-ui/Input');

var _Input2 = _interopRequireDefault(_Input);

var _TextField = require('material-ui/TextField');

var _TextField2 = _interopRequireDefault(_TextField);

var _Paper = require('material-ui/Paper');

var _Paper2 = _interopRequireDefault(_Paper);

var _Menu = require('material-ui/Menu');

var _reactAutosuggest = require('react-autosuggest');

var _reactAutosuggest2 = _interopRequireDefault(_reactAutosuggest);

var _match = require('autosuggest-highlight/match');

var _match2 = _interopRequireDefault(_match);

var _parse = require('autosuggest-highlight/parse');

var _parse2 = _interopRequireDefault(_parse);

var _Dialog = require('material-ui/Dialog');

var _Dialog2 = _interopRequireDefault(_Dialog);

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _superagent = require('superagent');

var _superagent2 = _interopRequireDefault(_superagent);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; } /* eslint-disable prefer-reflect, default-case, react/display-name */


var GLOSSARY = exports.GLOSSARY = 'GLOSSARY/GLOSSARY';
var METADATA_SERVICE = process.env.REACT_APP_METADATA_SERVICE;

var renderInputComponent = function renderInputComponent(inputProps) {
    var autoFocus = inputProps.autoFocus,
        value = inputProps.value,
        ref = inputProps.ref,
        other = _objectWithoutProperties(inputProps, ['autoFocus', 'value', 'ref']);

    return _react2.default.createElement(_TextField2.default, {
        name: 'Autocomplete',
        label: 'Definition',
        inputRef: ref,
        value: value,
        InputProps: Object.assign({}, other)
    });
};

var renderSuggestion = function renderSuggestion(suggestion, _ref) {
    var query = _ref.query,
        isHighlighted = _ref.isHighlighted;

    var matches = (0, _match2.default)(suggestion.definition, query);
    var parts = (0, _parse2.default)(suggestion.definition, matches);

    return _react2.default.createElement(
        _Menu.MenuItem,
        { selected: isHighlighted, component: 'div' },
        _react2.default.createElement(
            'div',
            null,
            parts.map(function (part, idx) {
                return part.highlight ? _react2.default.createElement(
                    'span',
                    { key: part.text },
                    part.text
                ) : _react2.default.createElement(
                    'em',
                    { key: part.text },
                    part.text
                );
            })
        )
    );
};

var renderSuggestionContainer = function renderSuggestionContainer(options) {
    var containerProps = options.containerProps,
        children = options.children;

    return _react2.default.createElement(
        _Paper2.default,
        containerProps,
        children
    );
};

var getDefinitionForSuggestion = function getDefinitionForSuggestion(suggestion) {
    return suggestion;
};

var GlossaryButton = function (_Component) {
    _inherits(GlossaryButton, _Component);

    function GlossaryButton() {
        var _ref2;

        var _temp, _this, _ret;

        _classCallCheck(this, GlossaryButton);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = GlossaryButton.__proto__ || Object.getPrototypeOf(GlossaryButton)).call.apply(_ref2, [this].concat(args))), _this), _this.state = {
            open: false,
            definition: '',
            id: '',
            term: '',
            options: [],
            hadDefinition: false
        }, _this.onRef = function (component) {
            if (!component && true) {
                return null;
            }

            var e = component.querySelector('input');
            if (e) {
                e.focus();
            }
        }, _this.onClick = function (e) {
            var _this$props = _this.props,
                editorState = _this$props.editorState,
                onChange = _this$props.onChange;

            e.preventDefault();

            var hasDefinition = editorState.inlines.some(function (inline) {
                return inline.type === GLOSSARY;
            });

            var selection = editorState.characters.map(function (char) {
                return char.text;
            }).join('');

            if (hasDefinition) {
                var newState = editorState.transform().unwrapInline(GLOSSARY).apply();
                onChange(newState);
            } else if (editorState.isExpanded) {
                _superagent2.default.get(METADATA_SERVICE + '/glossary/search?term=' + selection).then(function (res) {
                    // Search the glossary for the term
                    _this.setState({
                        open: true,
                        wasExpanded: editorState.isExpanded,
                        definition: '',
                        id: '',
                        term: selection,
                        hadDefinition: hasDefinition,
                        options: res.body.docs
                    });
                }).catch(function (err) {
                    return console.log(new Error(err));
                });
            } else {
                _this.setState({
                    open: true,
                    wasExpanded: editorState.isExpanded,
                    definition: '',
                    id: '',
                    term: '',
                    options: [],
                    hadDefinition: hasDefinition
                });
            }
        }, _this.handleClose = function () {
            _this.setState({ open: false });

            var newState = _this.props.editorState.transform().focus().apply();
            window.setTimeout(function () {
                return _this.props.onChange(newState);
            }, 1);
        }, _this.handleSubmit = function () {
            _this.setState({ open: false });

            if (!_this.state.definition) {
                _this.handleClose();
                return;
            }

            // if no id write the new term to the metadata service
            var add = new Promise(function (resolve, reject) {
                if (!_this.state.id) {
                    _superagent2.default.post(METADATA_SERVICE + '/glossary').send({
                        term: _this.state.term,
                        definition: _this.state.definition
                    }).then(function (res) {
                        resolve(res.body.id);
                    }).catch(function (err) {
                        return reject(err);
                    });
                } else {
                    resolve(_this.state.id);
                }
            });

            add.then(function (id) {
                if (_this.state.wasExpanded) {
                    var _newState = _this.props.editorState.transform().focus().apply().transform().wrapInline({
                        type: GLOSSARY,
                        data: { id: id }
                    }).collapseToEnd().apply();

                    window.setTimeout(function () {
                        return _this.props.onChange(_newState);
                    }, 1);
                    window.setTimeout(function () {
                        return _this.props.focus();
                    }, 100);
                    return;
                }

                var newState = _this.props.editorState.transform().insertText(_this.state.term).extend(-_this.state.term.length).wrapInline({
                    type: GLOSSARY,
                    data: { id: id }
                }).collapseToEnd().focus().apply();

                _this.props.onChange(newState);
                window.setTimeout(function () {
                    return _this.props.focus();
                }, 100);
            }).catch(function (err) {
                return console.log(err);
            });
        }, _this.onDefinitionChange = function (e, t) {
            if (t.newValue instanceof Object) {
                _this.setState({
                    definition: t.newValue.definition,
                    id: t.newValue.id
                });
            } else {
                _this.setState({
                    definition: t.newValue,
                    id: null
                });
            }
        }, _this.handleFetchRequest = function (e) {
            if (e.value.length > 3) {
                if (e.value != _this.state.term) {
                    // do a new search
                    _superagent2.default.get(METADATA_SERVICE + '/glossary/search?term=' + e.value).then(function (res) {
                        _this.setState({
                            options: res.body.docs
                        });
                    }).catch(function (err) {
                        return console.log(new Error(err));
                    });
                }
            }
        }, _this.handleClearSuggested = function () {
            _this.setState({
                options: []
            });
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(GlossaryButton, [{
        key: 'render',
        value: function render() {
            var editorState = this.props.editorState;


            var hasDefinition = editorState.inlines.some(function (inline) {
                return inline.type === GLOSSARY;
            });

            return _react2.default.createElement(
                'span',
                null,
                _react2.default.createElement(_helpers.ToolbarButton, {
                    onClick: this.onClick,
                    isActive: hasDefinition,
                    icon: _react2.default.createElement(_LibraryBooks2.default, null)
                }),
                _react2.default.createElement(
                    'span',
                    null,
                    _react2.default.createElement(
                        _Dialog2.default,
                        {
                            className: 'ory-prevent-blur',
                            open: this.state.open
                        },
                        _react2.default.createElement(
                            _Dialog.DialogTitle,
                            null,
                            'Add or Select a Glossary Definition'
                        ),
                        _react2.default.createElement(
                            _Dialog.DialogContent,
                            null,
                            this.state.wasExpanded ? null : _react2.default.createElement(_TextField2.default, {
                                id: 'term',
                                label: 'Term',
                                hintText: 'Glossary Term',
                                value: this.state.term
                            }),
                            _react2.default.createElement(_reactAutosuggest2.default, {
                                renderInputComponent: renderInputComponent,
                                suggestions: this.state.options,
                                onSuggestionsFetchRequested: this.handleFetchRequest,
                                onSuggestionsClearRequested: this.handleClearSuggested,
                                getSuggestionValue: getDefinitionForSuggestion,
                                renderSuggestionsContainer: renderSuggestionContainer,
                                renderSuggestion: renderSuggestion,
                                inputProps: {
                                    placeholder: 'Select a definition or enter a new definition',
                                    value: this.state.definition,
                                    onChange: this.onDefinitionChange
                                },
                                id: 'definition'
                            })
                        ),
                        _react2.default.createElement(
                            _Dialog.DialogActions,
                            null,
                            _react2.default.createElement(
                                _Button2.default,
                                {
                                    key: '0',
                                    color: 'accent',
                                    onClick: this.handleClose
                                },
                                'Cancel'
                            ),
                            _react2.default.createElement(
                                _Button2.default,
                                {
                                    key: '1',
                                    color: 'primary',
                                    onClick: this.handleSubmit
                                },
                                'Submit'
                            )
                        )
                    )
                )
            );
        }
    }]);

    return GlossaryButton;
}(_react.Component);

var GlossaryPlugin = function (_Plugin) {
    _inherits(GlossaryPlugin, _Plugin);

    function GlossaryPlugin() {
        var _ref3;

        var _temp2, _this2, _ret2;

        _classCallCheck(this, GlossaryPlugin);

        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
        }

        return _ret2 = (_temp2 = (_this2 = _possibleConstructorReturn(this, (_ref3 = GlossaryPlugin.__proto__ || Object.getPrototypeOf(GlossaryPlugin)).call.apply(_ref3, [this].concat(args))), _this2), _this2.name = 'glossary', _this2.nodes = _defineProperty({}, GLOSSARY, _node2.default), _this2.hoverButtons = [GlossaryButton], _this2.deserialize = function (el, next) {
            switch (el.tagName.toLowerCase()) {
                case 'glossary':
                    return {
                        kind: 'inline',
                        type: GLOSSARY,
                        nodes: next(el.childNodes),
                        data: _slate.Data.create({
                            id: (el.attrs.find(function (_ref4) {
                                var name = _ref4.name;
                                return name === 'id';
                            }) || {
                                value: ''
                            }).value
                        })
                    };
            }
        }, _this2.serialize = function (object, children) {
            if (object.kind !== 'inline') {
                return;
            }

            switch (object.type) {
                case GLOSSARY:
                    return _react2.default.createElement(
                        _node2.default,
                        { node: object.data },
                        children
                    );
            }
        }, _temp2), _possibleConstructorReturn(_this2, _ret2);
    }

    return GlossaryPlugin;
}(_Plugin3.default);

exports.default = GlossaryPlugin;
//# sourceMappingURL=index.js.map