import Button from 'material-ui/Button'
import React from 'react'

export const makeTagNode = Tag => {
  const NodeComponent = ({
    attributes,
    children,
    node
  }: {
    attributes: Object,
    children: any,
    node: any
  }) => {
    const align = node.data.get('align')
    const indent = node.data.get('indent')
    return (
      <Tag
        {...attributes}
        style={{
          textAlign: align,
          marginLeft: (5 * indent) + '%',
        }}>
        {children}
      </Tag>
    )
  }

  NodeComponent.displayName = `${Tag}-node`

  return NodeComponent
}

export const makeTagMark = Tag => {
  const MarkComponent = ({ children }: { children: any }) => (
    <Tag>{children}</Tag>
  )

  MarkComponent.displayName = `${Tag}-mark`

  return MarkComponent
}

export const ToolbarButton = ({
  icon,
  isActive,
  onClick
}: {
  icon: string,
  isActive: string,
  onClick(): void
}) => (
  <Button
    onTouchTap={onClick}
    style={isActive ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }}
  >
    {icon}
  </Button>
)
