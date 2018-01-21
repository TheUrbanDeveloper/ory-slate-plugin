'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ToolbarButton = exports.makeTagMark = exports.makeTagNode = undefined;

var _Button = require('material-ui/Button');

var _Button2 = _interopRequireDefault(_Button);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var makeTagNode = exports.makeTagNode = function makeTagNode(Tag) {
  var NodeComponent = function NodeComponent(_ref) {
    var attributes = _ref.attributes,
        children = _ref.children,
        node = _ref.node;

    var align = node.data.get('align');
    var indent = node.data.get('indent');
    return _react2.default.createElement(
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

var makeTagMark = exports.makeTagMark = function makeTagMark(Tag) {
  var MarkComponent = function MarkComponent(_ref2) {
    var children = _ref2.children;
    return _react2.default.createElement(
      Tag,
      null,
      children
    );
  };

  MarkComponent.displayName = Tag + '-mark';

  return MarkComponent;
};

var ToolbarButton = exports.ToolbarButton = function ToolbarButton(_ref3) {
  var icon = _ref3.icon,
      isActive = _ref3.isActive,
      onClick = _ref3.onClick;
  return _react2.default.createElement(
    _Button2.default,
    {
      onTouchTap: onClick,
      style: {
        color: isActive ? 'rgb(0, 188, 212)' : 'white',
        minWidth: '44px'
      }
    },
    icon
  );
};
//# sourceMappingURL=helpers.js.map