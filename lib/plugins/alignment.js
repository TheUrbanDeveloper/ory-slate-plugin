'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormatAlignLeft = require('material-ui-icons/FormatAlignLeft');

var _FormatAlignLeft2 = _interopRequireDefault(_FormatAlignLeft);

var _FormatAlignCenter = require('material-ui-icons/FormatAlignCenter');

var _FormatAlignCenter2 = _interopRequireDefault(_FormatAlignCenter);

var _FormatAlignRight = require('material-ui-icons/FormatAlignRight');

var _FormatAlignRight2 = _interopRequireDefault(_FormatAlignRight);

var _FormatAlignJustify = require('material-ui-icons/FormatAlignJustify');

var _FormatAlignJustify2 = _interopRequireDefault(_FormatAlignJustify);

var _helpers = require('../helpers');

var _Plugin2 = require('./Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable prefer-reflect */


var AlignmentPlugin = function (_Plugin) {
  _inherits(AlignmentPlugin, _Plugin);

  function AlignmentPlugin() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, AlignmentPlugin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = AlignmentPlugin.__proto__ || Object.getPrototypeOf(AlignmentPlugin)).call.apply(_ref, [this].concat(args))), _this), _this.createButton = function (align, icon) {
      return function (_ref2) {
        var editorState = _ref2.editorState,
            onChange = _ref2.onChange;

        var onClick = function onClick(e) {
          e.preventDefault();
          var indent = void 0;
          var isActive = editorState.blocks.some(function (block) {
            indent = block.data.get('indent');
            block.data.get('align') === align;
          });

          onChange(editorState.transform().setBlock({ data: { align: isActive ? null : align, indent: indent } }).apply());
        };

        var isActive = editorState.blocks.some(function (block) {
          return block.data.get('align') === align;
        });

        return _react2.default.createElement(_helpers.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
      };
    }, _this.name = 'alignment', _this.toolbarButtons = [_this.createButton('left', _react2.default.createElement(_FormatAlignLeft2.default, null)), _this.createButton('center', _react2.default.createElement(_FormatAlignCenter2.default, null)), _this.createButton('right', _react2.default.createElement(_FormatAlignRight2.default, null)), _this.createButton('justify', _react2.default.createElement(_FormatAlignJustify2.default, null))], _temp), _possibleConstructorReturn(_this, _ret);
  }

  // eslint-disable-next-line react/display-name


  return AlignmentPlugin;
}(_Plugin3.default);

exports.default = AlignmentPlugin;
//# sourceMappingURL=alignment.js.map