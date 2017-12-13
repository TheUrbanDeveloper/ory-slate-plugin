import React, { Component } from 'react'
import { Placeholder } from 'slate'
import { placeholder } from '../../const.js'
import shallowEqual from 'fbjs/lib/shallowEqual'

class Paragraph extends Component {
  shouldComponentUpdate(nextProps) {
    return !shallowEqual(this.props, nextProps)
  }

  props: {
    children: any,
    state: any,
    node: any,
    attributes: any
  }

  render() {
    const { node, state, children, attributes } = this.props
    const align = this.props.node.data.get('align')
    const indent = this.props.node.data.get('indent')
    return (
      <p {...attributes} style={{ textAlign: align, marginLeft: indent ? (5 * indent) : 0 + '%' }}>
        <Placeholder
          className="ory-plugins-content-slate-paragraph-placeholder"
          node={node}
          parent={state.document}
          state={state}
          style={{ top: 'auto', bottom: 'auto', left: 'auto', right: 'auto' }}
        >
          {placeholder}
        </Placeholder>
        {children}
      </p>
    )
  }
}

export default Paragraph
