'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Code = function Code(_ref) {
  var attributes = _ref.attributes,
      children = _ref.children;
  return _react2.default.createElement(
    'pre',
    Object.assign({}, attributes, { style: { overflow: 'scroll' } }),
    _react2.default.createElement(
      'code',
      null,
      children
    )
  );
};

exports.default = Code;
//# sourceMappingURL=node.js.map