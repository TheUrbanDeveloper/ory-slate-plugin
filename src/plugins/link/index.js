/* eslint-disable no-alert, prefer-reflect, default-case, react/display-name */
import LinkIcon from 'material-ui-icons/Link'
import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import { ToolbarButton } from '../../helpers'
import Plugin from '../Plugin'
import Link from './node'
import Checkbox from 'material-ui/Checkbox'
import { FormControlLabel } from 'material-ui/Form'
import Dialog, { DialogTitle, DialogActions, DialogContent } from 'material-ui/Dialog'
import Button from 'material-ui/Button'
import { Data } from 'slate'
import type { Props } from '../props'

export const A = 'LINK/LINK'

class LinkButton extends Component {
  state = {
    open: false,
    href: '',
    title: '',
    hadLinks: false,
    newTab: false,
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

    const hasLinks = editorState.inlines.some(
      (inline: any) => inline.type === A
    )

    if (hasLinks) {
      const newState = editorState
        .transform()
        .unwrapInline(A)
        .apply()
      onChange(newState)
    } else if (editorState.isExpanded) {
      this.setState({
        open: true,
        wasExpanded: editorState.isExpanded,
        href: '',
        title: '',
        hadLinks: hasLinks,
        newTab: false,
      })
    } else {
      this.setState({
        open: true,
        wasExpanded: editorState.isExpanded,
        href: '',
        title: '',
        hadLinks: hasLinks,
        newTab: false,
      })
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

    if (!this.state.href) {
      this.handleClose()
      return
    }

    if (this.state.wasExpanded) {
      const newState = this.props.editorState
        .transform()
        .focus()
        .apply()
        .transform()
        .wrapInline({
          type: A,
          data: { href: this.state.href, newTab: this.state.newTab }
        })
        .collapseToEnd()
        .apply()

      window.setTimeout(() => this.props.onChange(newState), 1)
      window.setTimeout(() => this.props.focus(), 100)
      return
    }

    if (!this.state.title) {
      this.handleClose()
      return
    }

    const newState = this.props.editorState
      .transform()
      .insertText(this.state.title)
      .extend(-this.state.title.length)
      .wrapInline({
        type: A,
        data: { href: this.state.href }
      })
      .collapseToEnd()
      .focus()
      .apply()

    this.props.onChange(newState)
    window.setTimeout(() => this.props.focus(), 100)
  }

  onCheck = e => {
    this.setState({ newTab: e.target.checked })
  }

  onHrefChange = e => {
    this.setState({ href: e.target.value })
  }

  onTitleChange = e => {
    this.setState({ title: e.target.value })
  }

  render() {
    const { editorState } = this.props

    const hasLinks = editorState.inlines.some(
      (inline: any) => inline.type === A
    )
    return (
      <span>
        <ToolbarButton
          onClick={this.onClick}
          isActive={hasLinks}
          icon={<LinkIcon />}
        />
          <Dialog
            className="ory-prevent-blur"
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            <DialogTitle>Create a link</DialogTitle>
            <DialogContent>
              {this.state.wasExpanded ? null : (
                <div>
                  <TextField
                    label="Link title"
                    onChange={this.onTitleChange}
                    value={this.state.title}
                  />
                </div>
              )}
              <div ref={this.onRef}>
                <TextField
                  label="http://example.com/my/link.html"
                  onChange={this.onHrefChange}
                  value={this.state.href}
                />
              </div>
              <div>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={this.state.newTab}
                      onChange={this.onCheck}
                      value="newTab"
                    />
                  }
                  label="Open in new tab"
                />
              </div>
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
    )
  }
}

export default class LinkPlugin extends Plugin {
  name = 'link'

  nodes = { [A]: Link }

  hoverButtons = [LinkButton]
  toolbarButtons = [LinkButton]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'a':
        return {
          kind: 'inline',
          type: A,
          nodes: next(el.childNodes),
          data: Data.create({
            href: (el.attrs.find(({ name }) => name === 'href') || {
              value: ''
            }).value,
            newTab: false,
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
      case A:
        return <a href={object.data.get('href')} target={object.data.get('newTab') ? '_blank' : ''}>{children}</a>
    }
  }
}
