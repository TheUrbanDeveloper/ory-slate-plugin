var _jsxFileName = 'src/plugins/emphasize.js',
    _this = this;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react';
import BoldIcon from 'material-ui/svg-icons/editor/format-bold';
import ItalicIcon from 'material-ui/svg-icons/editor/format-italic';
import UnderlinedIcon from 'material-ui/svg-icons/editor/format-underlined';
import StrikethroughIcon from 'material-ui/svg-icons/editor/format-strikethrough';
import SizeIcon from 'material-ui/svg-icons/editor/format-size';
import TextFieldsIcon from 'material-ui/svg-icons/editor/text-fields';
import { makeTagMark, ToolbarButton } from '../helpers';
import Plugin from './Plugin';


export var STRONG = 'EMPHASIZE/STRONG';
export var EM = 'EMPHASIZE/EM';
export var U = 'EMPHASIZE/U';
export var S = 'EMPHASIZE/S';
export var SUB = 'EMPHASIZE/SUB';
export var SUP = 'EMPHASIZE/SUP';

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

    return React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon, __source: {
        fileName: _jsxFileName,
        lineNumber: 36
      },
      __self: _this
    });
  };
};

var EmphasizePlugin = function (_Plugin) {
  _inherits(EmphasizePlugin, _Plugin);

  function EmphasizePlugin() {
    var _ref2,
        _this2$marks,
        _this3 = this;

    var _temp, _this2, _ret;

    _classCallCheck(this, EmphasizePlugin);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = _possibleConstructorReturn(this, (_ref2 = EmphasizePlugin.__proto__ || Object.getPrototypeOf(EmphasizePlugin)).call.apply(_ref2, [this].concat(args))), _this2), _this2.name = 'emphasize', _this2.marks = (_this2$marks = {}, _defineProperty(_this2$marks, STRONG, makeTagMark('strong')), _defineProperty(_this2$marks, EM, makeTagMark('em')), _defineProperty(_this2$marks, U, makeTagMark('u')), _defineProperty(_this2$marks, S, makeTagMark('s')), _defineProperty(_this2$marks, SUB, makeTagMark('sub')), _defineProperty(_this2$marks, SUP, makeTagMark('sup')), _this2$marks), _this2.onKeyDown = function (e, data, state) {
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
    }, _this2.hoverButtons = [createButton(STRONG, React.createElement(BoldIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 82
      },
      __self: this
    })), createButton(EM, React.createElement(ItalicIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 83
      },
      __self: this
    })), createButton(U, React.createElement(UnderlinedIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 84
      },
      __self: this
    })), createButton(S, React.createElement(StrikethroughIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 85
      },
      __self: this
    })), createButton(SUB, React.createElement(TextFieldsIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 86
      },
      __self: this
    })), createButton(SUP, React.createElement(SizeIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 87
      },
      __self: this
    }))], _this2.deserialize = function (el, next) {
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
    }, _this2.serialize = function (object, children) {
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
          return React.createElement(
            'strong',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 152
              },
              __self: _this3
            },
            children
          );
        case EM:
          return React.createElement(
            'em',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 154
              },
              __self: _this3
            },
            children
          );
        case U:
          return React.createElement(
            'u',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 156
              },
              __self: _this3
            },
            children
          );
        case S:
          return React.createElement(
            's',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 158
              },
              __self: _this3
            },
            children
          );
        case SUB:
          return React.createElement(
            'span',
            { style: styles.sub, __source: {
                fileName: _jsxFileName,
                lineNumber: 160
              },
              __self: _this3
            },
            children
          );
        case SUP:
          return React.createElement(
            'span',
            { style: styles.sup, __source: {
                fileName: _jsxFileName,
                lineNumber: 162
              },
              __self: _this3
            },
            children
          );
      }
    }, _temp), _possibleConstructorReturn(_this2, _ret);
  }

  return EmphasizePlugin;
}(Plugin);

export default EmphasizePlugin;
//# sourceMappingURL=emphasize.js.map