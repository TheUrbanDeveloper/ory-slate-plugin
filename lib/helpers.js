var _jsxFileName = 'src/helpers.js',
    _this = this;

import IconButton from 'material-ui/IconButton';
import React from 'react';

export var makeTagNode = function makeTagNode(Tag) {
  var NodeComponent = function NodeComponent(_ref) {
    var attributes = _ref.attributes,
        children = _ref.children,
        node = _ref.node;

    var align = node.data.get('align');
    return React.createElement(
      Tag,
      Object.assign({}, attributes, { style: { textAlign: align }, __source: {
          fileName: _jsxFileName,
          lineNumber: 16
        },
        __self: _this
      }),
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
      {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 29
        },
        __self: _this
      },
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
    IconButton,
    {
      onTouchTap: onClick,
      style: isActive ? { color: 'rgb(0, 188, 212)' } : { color: '#3C3C3C' },
      __source: {
        fileName: _jsxFileName,
        lineNumber: 46
      },
      __self: _this
    },
    icon
  );
};
//# sourceMappingURL=helpers.js.map