'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Link = function Link(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children,
      node = _ref.node;
  var data = node.data;

  var href = data.get('href');

  return _react2.default.createElement(
    'a',
    Object.assign({}, attributes, { href: href }),
    children
  );
};

exports.default = Link;
//# sourceMappingURL=node.js.map