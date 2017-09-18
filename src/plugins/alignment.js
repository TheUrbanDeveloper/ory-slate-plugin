/* eslint-disable prefer-reflect */
import React from 'react'
import FormatAlignLeftIcon from 'material-ui-icons/FormatAlignLeft'
import FormatAlignCenterIcon from 'material-ui-icons/FormatAlignCenter'
import FormatAlignRightIcon from 'material-ui-icons/FormatAlignRight'
import FormatAlignJustifyIcon from 'material-ui-icons/FormatAlignJustify'

import { ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export default class AlignmentPlugin extends Plugin {
  props: Props

  // eslint-disable-next-line react/display-name
  createButton = (align, icon) => ({ editorState, onChange }: Props) => {
    const onClick = e => {
      e.preventDefault()

      const isActive = editorState.blocks.some(
        block => block.data.get('align') === align
      )

      onChange(
        editorState
          .transform()
          .setBlock({ data: { align: isActive ? null : align } })
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
    this.createButton('left', <FormatAlignLeftIcon />),
    this.createButton('center', <FormatAlignCenterIcon />),
    this.createButton('right', <FormatAlignRightIcon />),
    this.createButton('justify', <FormatAlignJustifyIcon />)
  ]
}
