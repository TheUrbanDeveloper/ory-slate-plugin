/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import createMuiTheme from 'material-ui/styles/createMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import React, { Component } from 'react'
import Portal from 'react-portal'
import position from 'selection-position'
import { Editor } from 'slate'
import BottomToolbar from 'ory-editor-ui/lib/BottomToolbar'
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes'

const onBlur = (_event, _data, state) => state

export type Props = ContentPluginProps<{ editorState: Object }>

class Slate extends Component {
  componentDidMount = () => {
    this.selection = window.getSelection()
    this.updateToolbar()
  }

  shouldComponentUpdate = nextProps =>
    nextProps.state.editorState !== this.props.state.editorState ||
    nextProps.state.toolbar !== this.props.state.toolbar ||
    nextProps.focused !== this.props.focused ||
    nextProps.readOnly !== this.props.readOnly

  componentDidUpdate = () => this.updateToolbar()

  props: ContentPluginProps<{ editorState: Object }>
  portal: any

  onStateChange = editorState => {
    this.props.onChange({ editorState })
  }

  handleOpen = portal => {
    this.toolbar = portal.firstChild
  }

  updateToolbar = () => {
    const { editorState } = this.props.state
    const toolbar = this.toolbar

    if (!toolbar || editorState.isBlurred || editorState.isCollapsed) {
      return
    }

    const { left, top, width } = position()

    toolbar.style.opacity = 1
    toolbar.style.top = `${top + window.scrollY - toolbar.offsetHeight}px`
    toolbar.style.left = `${left +
      window.scrollX -
      toolbar.offsetWidth / 2 +
      width / 2}px`
  }

  render() {
    const {
      focused,
      readOnly,
      id,
      state: { editorState },
      schema,
      plugins,
      onKeyDown,
      HoverButtons,
      ToolbarButtons,
      focus
    } = this.props
    const isOpened = editorState.isExpanded && editorState.isFocused
    return (
      <div>
        <MuiThemeProvider theme={createMuiTheme()}>
          <Portal isOpened={isOpened} onOpen={this.handleOpen}>
            {/* ory-prevent-blur is required to prevent global blurring */}
            <div
              className="ory-prevent-blur ory-plugins-content-slate-inline-toolbar"
              style={{ padding: 0, backgroundColor: '#212121' }}
            >
              <HoverButtons
                editorState={editorState}
                onChange={this.onStateChange}
                focus={focus}
              />
            </div>
          </Portal>          
        </MuiThemeProvider>
        <Editor
          onChange={this.onStateChange}
          onKeyDown={onKeyDown}
          readOnly={Boolean(readOnly)}
          onBlur={onBlur}
          schema={schema}
          state={editorState}
          plugins={plugins}
        />
        {readOnly || !focused ? null :
          (
            <BottomToolbar key={id} open={focused}>
              <ToolbarButtons
                key={id}
                id={id}
                editorState={editorState}
                onChange={this.onStateChange}
                focus={focus}
              />
          </BottomToolbar>
          )
        }
      </div>
    )
  }
}

export default Slate
