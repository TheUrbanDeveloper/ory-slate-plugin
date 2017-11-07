/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react'
import BoldIcon from 'material-ui-icons/FormatBold'
import ItalicIcon from 'material-ui-icons/FormatItalic'
import UnderlinedIcon from 'material-ui-icons/FormatUnderlined'
import StrikethroughIcon from 'material-ui-icons/FormatStrikethrough'
import SizeIcon from 'material-ui-icons/FormatSize'
import TextFieldsIcon from 'material-ui-icons/TextFields'
import { makeTagMark, ToolbarButton } from '../helpers'
import Plugin from './Plugin'
import type { Props } from './props'

export const STRONG = 'EMPHASIZE/STRONG'
export const EM = 'EMPHASIZE/EM'
export const U = 'EMPHASIZE/U'
export const S = 'EMPHASIZE/S'
export const SUB = 'EMPHASIZE/SUB'
export const SUP = 'EMPHASIZE/SUP'

// eslint-disable-next-line react/display-name
const createButton = (type, icon) => ({ editorState, onChange }: Props) => {
  const onClick = e => {
    e.preventDefault()

    onChange(
      editorState
        .transform()
        .toggleMark(type)
        .apply()
    )
  }

  const isActive =
    editorState && editorState.marks.some(mark => mark.type === type)

  return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
}

export default class EmphasizePlugin extends Plugin {
  props: Props

  name = 'emphasize'

  marks = {
    [STRONG]: makeTagMark('strong'),
    [EM]: makeTagMark('em'),
    [U]: makeTagMark('u'),
    [S]: makeTagMark('s'),
    [SUB]: makeTagMark('sub'),
    [SUP]: makeTagMark('sup')
  }

  onKeyDown = (e: Event, data: { key: string, isMod: boolean }, state) => {
    if (data.isMod) {
      let mark

      switch (data.key) {
        case 'b':
          mark = STRONG
          break
        case 'i':
          mark = EM
          break
        case 'u':
          mark = U
          break
        case 'k':
          mark = S
          break
        default:
          return
      }

      return state
        .transform()
        .toggleMark(mark)
        .apply()
    }
  }

  hoverButtons = [
    createButton(STRONG, <BoldIcon />),
    createButton(EM, <ItalicIcon />),
    createButton(U, <UnderlinedIcon />),
    createButton(S, <StrikethroughIcon />),
    createButton(SUB, <TextFieldsIcon />),
    createButton(SUP, <SizeIcon />)
  ]

  deserialize = (el, next) => {
    switch (el.tagName.toLowerCase()) {
      case 'strong':
      case 'b':
        return {
          kind: 'mark',
          type: STRONG,
          nodes: next(el.childNodes)
        }
      case 'em':
      case 'i':
        return {
          kind: 'mark',
          type: EM,
          nodes: next(el.childNodes)
        }
      case 'u':
        return {
          kind: 'mark',
          type: U,
          nodes: next(el.childNodes)
        }
      case 's':
        return {
          kind: 'mark',
          type: S,
          nodes: next(el.childNodes)
        }
      case 'sub':
        return {
          kind: 'mark',
          type: SUB,
          nodes: next(el.childNodes)
        }
      case 'sup':
        return {
          kind: 'mark',
          type: SUP,
          nodes: next(el.childNodes)
        }
    }
  }

  serialize = (object: { type: string, kind: string }, children: any[]) => {
    const styles = {
      sub: {
        position: 'relative',
        bottom: '0.5em',
        fontSize: '0.8em'
      },
      sup: {
        position: 'relative',
        top: '0.3em',
        fontSize: '0.8em'
      }
    };

    if (object.kind !== 'mark') {
      return
    }
    switch (object.type) {
      case STRONG:
        return <strong>{children}</strong>
      case EM:
        return <em>{children}</em>
      case U:
        return <u>{children}</u>
      case S:
        return <s>{children}</s>
      case SUB:
        return <span style={styles.sub}>{children}</span>
      case SUP:
        return <span style={styles.sup}>{children}</span>
    }
  }
}
