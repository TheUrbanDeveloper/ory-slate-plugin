import Button from 'material-ui/Button';
import React from 'react';

export var makeTagNode = function makeTagNode(Tag) {
  var NodeComponent = function NodeComponent(_ref) {
    var attributes = _ref.attributes,
        children = _ref.children,
        node = _ref.node;

    var align = node.data.get('align');
    var indent = node.data.get('indent');
    return React.createElement(
      Tag,
      Object.assign({}, attributes, {
        style: {
          textAlign: align,
          marginLeft: 5 * indent + '%'
        } }),
      children
    );
  };

  NodeComponent.displayName = Tag + '-node';

  return NodeComponent;
};

export var makeTagMark = function makeTagMark(Tag) {
  var MarkComponent = function MarkComponent(_ref2) {
    var children = _ref2.children;
    return React.createElement(
      Tag,
      null,
      children
    );
  };

  MarkComponent.displayName = Tag + '-mark';

  return MarkComponent;
};

export var ToolbarButton = function ToolbarButton(_ref3) {
  var icon = _ref3.icon,
      isActive = _ref3.isActive,
      onClick = _ref3.onClick;
  return React.createElement(
    Button,
    {
      onTouchTap: onClick,
      style: isActive ? { color: 'rgb(0, 188, 212)' } : { color: 'white' }
    },
    icon
  );
};
//# sourceMappingURL=helpers.js.map