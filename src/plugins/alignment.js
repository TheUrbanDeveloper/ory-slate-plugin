/* eslint-disable prefer-reflect */
import React from 'react'
import AlignLeftIcon from 'material-ui-icons/FormatAlignLeft'
import AlignCenterIcon from 'material-ui-icons/FormatAlignCenter'
import AlignRightIcon from 'material-ui-icons/FormatAlignRight'
import AlignJustifyIcon from 'material-ui-icons/FormatAlignJustify'

import { ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export default class AlignmentPlugin extends Plugin {
  props: Props

  // eslint-disable-next-line react/display-name
  createButton = (align, icon) => ({ editorState, onChange }: Props) => {
    const onClick = e => {
      e.preventDefault()
      let indent;
      const isActive = editorState.blocks.some(
        block => {
          indent = block.data.get('indent')
          block.data.get('align') === align
        }
      )

      onChange(
        editorState
          .transform()
          .setBlock({ data: { align: isActive ? null : align, indent } })
          .apply()
      )
    }

    const isActive = editorState.blocks.some(
      block => block.data.get('align') === align
    )

    return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
  }

  name = 'alignment'

  toolbarButtons = [
    this.createButton('left', <AlignLeftIcon />),
    this.createButton('center', <AlignCenterIcon />),
    this.createButton('right', <AlignRightIcon />),
    this.createButton('justify', <AlignJustifyIcon />)
  ]
}
