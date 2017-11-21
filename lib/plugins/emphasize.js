'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SUP = exports.SUB = exports.S = exports.U = exports.EM = exports.STRONG = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormatBold = require('material-ui-icons/FormatBold');

var _FormatBold2 = _interopRequireDefault(_FormatBold);

var _FormatItalic = require('material-ui-icons/FormatItalic');

var _FormatItalic2 = _interopRequireDefault(_FormatItalic);

var _FormatUnderlined = require('material-ui-icons/FormatUnderlined');

var _FormatUnderlined2 = _interopRequireDefault(_FormatUnderlined);

var _FormatStrikethrough = require('material-ui-icons/FormatStrikethrough');

var _FormatStrikethrough2 = _interopRequireDefault(_FormatStrikethrough);

var _FormatSize = require('material-ui-icons/FormatSize');

var _FormatSize2 = _interopRequireDefault(_FormatSize);

var _TextFields = require('material-ui-icons/TextFields');

var _TextFields2 = _interopRequireDefault(_TextFields);

var _helpers = require('../helpers');

var _Plugin2 = require('./Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable prefer-reflect, default-case, react/display-name */


var STRONG = exports.STRONG = 'EMPHASIZE/STRONG';
var EM = exports.EM = 'EMPHASIZE/EM';
var U = exports.U = 'EMPHASIZE/U';
var S = exports.S = 'EMPHASIZE/S';
var SUB = exports.SUB = 'EMPHASIZE/SUB';
var SUP = exports.SUP = 'EMPHASIZE/SUP';

// eslint-disable-next-line react/display-name
var createButton = function createButton(type, icon) {
  return function (_ref) {
    var editorState = _ref.editorState,
        onChange = _ref.onChange;

    var onClick = function onClick(e) {
      e.preventDefault();

      onChange(editorState.transform().toggleMark(type).apply());
    };

    var isActive = editorState && editorState.marks.some(function (mark) {
      return mark.type === type;
    });

    return _react2.default.createElement(_helpers.ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
  };
};

var EmphasizePlugin = function (_Plugin) {
  _inherits(EmphasizePlugin, _Plugin);

  function EmphasizePlugin() {
    var _ref2, _this$marks;

    var _temp, _this, _ret;

    _classCallCheck(this, EmphasizePlugin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref2 = EmphasizePlugin.__proto__ || Object.getPrototypeOf(EmphasizePlugin)).call.apply(_ref2, [this].concat(args))), _this), _this.name = 'emphasize', _this.marks = (_this$marks = {}, _defineProperty(_this$marks, STRONG, (0, _helpers.makeTagMark)('strong')), _defineProperty(_this$marks, EM, (0, _helpers.makeTagMark)('em')), _defineProperty(_this$marks, U, (0, _helpers.makeTagMark)('u')), _defineProperty(_this$marks, S, (0, _helpers.makeTagMark)('s')), _defineProperty(_this$marks, SUB, (0, _helpers.makeTagMark)('sub')), _defineProperty(_this$marks, SUP, (0, _helpers.makeTagMark)('sup')), _this$marks), _this.onKeyDown = function (e, data, state) {
      if (data.isMod) {
        var mark = void 0;

        switch (data.key) {
          case 'b':
            mark = STRONG;
            break;
          case 'i':
            mark = EM;
            break;
          case 'u':
            mark = U;
            break;
          case 'k':
            mark = S;
            break;
          default:
            return;
        }

        return state.transform().toggleMark(mark).apply();
      }
    }, _this.hoverButtons = [createButton(STRONG, _react2.default.createElement(_FormatBold2.default, null)), createButton(EM, _react2.default.createElement(_FormatItalic2.default, null)), createButton(U, _react2.default.createElement(_FormatUnderlined2.default, null)), createButton(S, _react2.default.createElement(_FormatStrikethrough2.default, null)), createButton(SUB, _react2.default.createElement(_TextFields2.default, null)), createButton(SUP, _react2.default.createElement(_FormatSize2.default, null))], _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'strong':
        case 'b':
          return {
            kind: 'mark',
            type: STRONG,
            nodes: next(el.childNodes)
          };
        case 'em':
        case 'i':
          return {
            kind: 'mark',
            type: EM,
            nodes: next(el.childNodes)
          };
        case 'u':
          return {
            kind: 'mark',
            type: U,
            nodes: next(el.childNodes)
          };
        case 's':
          return {
            kind: 'mark',
            type: S,
            nodes: next(el.childNodes)
          };
        case 'sub':
          return {
            kind: 'mark',
            type: SUB,
            nodes: next(el.childNodes)
          };
        case 'sup':
          return {
            kind: 'mark',
            type: SUP,
            nodes: next(el.childNodes)
          };
      }
    }, _this.serialize = function (object, children) {
      var styles = {
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
        return;
      }
      switch (object.type) {
        case STRONG:
          return _react2.default.createElement(
            'strong',
            null,
            children
          );
        case EM:
          return _react2.default.createElement(
            'em',
            null,
            children
          );
        case U:
          return _react2.default.createElement(
            'u',
            null,
            children
          );
        case S:
          return _react2.default.createElement(
            's',
            null,
            children
          );
        case SUB:
          return _react2.default.createElement(
            'span',
            { style: styles.sub },
            children
          );
        case SUP:
          return _react2.default.createElement(
            'span',
            { style: styles.sup },
            children
          );
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  return EmphasizePlugin;
}(_Plugin3.default);

exports.default = EmphasizePlugin;
//# sourceMappingURL=emphasize.js.map