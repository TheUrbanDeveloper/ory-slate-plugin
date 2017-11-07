/* eslint-disable prefer-reflect, default-case, react/display-name */
import FormatClearIcon from 'material-ui-icons/FormatClear'
import React from 'react'

import { makeTagNode, ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export default class ClearPlugin extends Plugin {
    constructor(props: Props) {
        super(props)

        this.DEFAULT_NODE = props.DEFAULT_NODE
    }

    // eslint-disable-next-line react/display-name
    Button = ({ editorState, onChange }: Props) => {
        const onClick = e => {
            e.preventDefault()

            let transform = editorState.transform()
            transform = transform.setBlock(this.DEFAULT_NODE)
            onChange(transform.apply());

            editorState.marks.forEach(mark => {
                transform = transform.toggleMark(mark.type);
                onChange(transform.apply())
            });

            editorState.blocks.forEach(block => {
                transform = transform.unwrapBlock(block.type);
                onChange(transform.apply())
            });

            editorState.inlines.forEach(inline => {
                transform = transform.unwrapInline(inline.type);
                onChange(transform.apply());
            });

        }

        return (
            <ToolbarButton
                onClick={onClick}
                icon={<FormatClearIcon />}
            />
        )
    }

    hoverButtons = [this.Button]
}
