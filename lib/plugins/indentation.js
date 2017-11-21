'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormatIndentDecrease = require('material-ui-icons/FormatIndentDecrease');

var _FormatIndentDecrease2 = _interopRequireDefault(_FormatIndentDecrease);

var _FormatIndentIncrease = require('material-ui-icons/FormatIndentIncrease');

var _FormatIndentIncrease2 = _interopRequireDefault(_FormatIndentIncrease);

var _helpers = require('../helpers');

var _Plugin2 = require('./Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable prefer-reflect */


var IndentationPlugin = function (_Plugin) {
  _inherits(IndentationPlugin, _Plugin);

  function IndentationPlugin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, IndentationPlugin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = IndentationPlugin.__proto__ || Object.getPrototypeOf(IndentationPlugin)).call.apply(_ref, [this].concat(args))), _this), _this.createButton = function (action, icon) {
      return function (_ref2) {
        var editorState = _ref2.editorState,
            onChange = _ref2.onChange;

        var onClick = function onClick(e) {
          e.preventDefault();

          var indent = 0;
          var align = void 0;
          editorState.blocks.some(function (block) {
            align = block.data.get('align');
            if (block.data.get('indent')) {
              indent = block.data.get('indent');
              return true;
            }
          });

          if (indent != 0) {
            if (action === 'indent') {
              indent += 1;
            } else if (indent > 0) {
              indent -= 1;
            }
          } else {
            if (action === 'indent') {
              indent = 1;
            }
          }

          onChange(editorState.transform().setBlock({ data: { indent: indent, align: align } }).apply());
        };

        return _react2.default.createElement(_helpers.ToolbarButton, { onClick: onClick, icon: icon });
      };
    }, _this.name = 'indentation', _this.toolbarButtons = [_this.createButton('indent', _react2.default.createElement(_FormatIndentIncrease2.default, null)), _this.createButton('unindent', _react2.default.createElement(_FormatIndentDecrease2.default, null))], _temp), _possibleConstructorReturn(_this, _ret);
  }

  // eslint-disable-next-line react/display-name


  return IndentationPlugin;
}(_Plugin3.default);

exports.default = IndentationPlugin;
//# sourceMappingURL=indentation.js.map