'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.P = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Plugin2 = require('../Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
/* eslint-disable prefer-reflect, default-case, react/display-name */


var P = exports.P = 'PARAGRAPH/PARAGRAPH';

var ParagraphPlugin = function (_Plugin) {
  _inherits(ParagraphPlugin, _Plugin);

  function ParagraphPlugin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, ParagraphPlugin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = ParagraphPlugin.__proto__ || Object.getPrototypeOf(ParagraphPlugin)).call.apply(_ref, [this].concat(args))), _this), _this.name = 'paragraph', _this.nodes = _defineProperty({}, P, _node2.default), _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'p':
          return {
            kind: 'block',
            type: P,
            nodes: next(el.childNodes)
            // data: Data.create({ textAlign: el.attr('styles')['text-align'] })
          };
      }
    }, _this.serialize = function (object, children) {
      if (object.kind !== 'block') {
        return;
      }
      switch (object.type) {
        case P:
          return _react2.default.createElement(
            'p',
            {
              style: {
                textAlign: object.data.get('align'),
                marginLeft: 5 * object.data.get('indent') + '%'
              }
            },
            children
          );
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return ParagraphPlugin;
}(_Plugin3.default);

exports.default = ParagraphPlugin;
//# sourceMappingURL=index.js.map