/* eslint-disable prefer-reflect */
import React from 'react'
import IndentDecreaseIcon from 'material-ui/svg-icons/editor/format-indent-decrease';
import IndentIncreaseIcon from 'material-ui/svg-icons/editor/format-indent-increase';

import { ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export default class IndentationPlugin extends Plugin {
    props: Props
  
    // eslint-disable-next-line react/display-name
    createButton = (action, icon) => ({ editorState, onChange }: Props) => {
      const onClick = e => {
        e.preventDefault()

        let indent = 0
        let align;
        editorState.blocks.some(
          block => {
            align = block.data.get('align')
            if (block.data.get('indent')) {
              indent = block.data.get('indent')
              return true
            }
          }
        )

        if(indent != 0) {
          if(action === 'indent') {
            indent += 1
          } else if(indent > 0) {
            indent -= 1
          }
        } else {
          if(action === 'indent') {
            indent = 1
          }
        }

        onChange(
          editorState
            .transform()
            .setBlock({ data: { indent, align } })
            .apply()
        )
      }


      return <ToolbarButton onClick={onClick} icon={icon} />
    }
  
    name = 'indentation'
  
    toolbarButtons = [
      this.createButton('indent', <IndentIncreaseIcon />),      
      this.createButton('unindent', <IndentDecreaseIcon />),
    ]
  }
  