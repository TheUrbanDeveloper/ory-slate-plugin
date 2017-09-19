var _jsxFileName = 'src/plugins/code/index.js';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react';
import CodeIcon from 'material-ui-icons/Code';
import { Data } from 'slate';
import { makeTagMark, ToolbarButton } from '../../helpers';
import Plugin from '../Plugin';
import Code from './node';


export var CODE = 'CODE/CODE';

var CodePlugin = function (_Plugin) {
  _inherits(CodePlugin, _Plugin);

  function CodePlugin(props) {
    var _this2 = this;

    _classCallCheck(this, CodePlugin);

    var _this = _possibleConstructorReturn(this, (CodePlugin.__proto__ || Object.getPrototypeOf(CodePlugin)).call(this, props));

    _this.createButton = function (type, icon) {
      var Button = function Button(_ref) {
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
            lineNumber: 37
          },
          __self: _this2
        });
      };

      return Button;
    };

    _this.createNodeButton = function (type, icon) {
      var Button = function Button(_ref2) {
        var editorState = _ref2.editorState,
            onChange = _ref2.onChange;

        var onClick = function onClick(e) {
          e.preventDefault();

          var isActive = editorState.blocks.some(function (block) {
            return block.type === type;
          });

          onChange(editorState.transform().setBlock(isActive ? _this.DEFAULT_NODE : type).apply());
        };

        var isActive = editorState.blocks.some(function (block) {
          return block.type === type;
        });

        return React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon, __source: {
            fileName: _jsxFileName,
            lineNumber: 60
          },
          __self: _this2
        });
      };

      return Button;
    };

    _this.name = 'code';
    _this.marks = _defineProperty({}, CODE, makeTagMark('code'));
    _this.nodes = _defineProperty({}, CODE, Code);
    _this.hoverButtons = [_this.createButton(CODE, React.createElement(CodeIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 71
      },
      __self: this
    }))];
    _this.toolbarButtons = [_this.createNodeButton(CODE, React.createElement(CodeIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 72
      },
      __self: this
    }))];

    _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'code':
          return {
            kind: 'mark',
            type: CODE,
            data: Data.create({}),
            nodes: next(el.childNodes)
          };
        case 'pre':
          return {
            kind: 'block',
            type: CODE,
            nodes: next(el.childNodes)
          };
      }
    };

    _this.serialize = function (object, children) {
      if (object.kind === 'mark') {
        switch (object.type) {
          case CODE:
            return React.createElement(
              'code',
              {
                __source: {
                  fileName: _jsxFileName,
                  lineNumber: 99
                },
                __self: _this2
              },
              children
            );
        }
      } else if (object.kind === 'block') {
        switch (object.type) {
          case CODE:
            return React.createElement(
              'pre',
              { style: { overflow: 'scroll' }, __source: {
                  fileName: _jsxFileName,
                  lineNumber: 105
                },
                __self: _this2
              },
              React.createElement(
                'code',
                {
                  __source: {
                    fileName: _jsxFileName,
                    lineNumber: 106
                  },
                  __self: _this2
                },
                children
              )
            );
        }
      }
    };

    _this.DEFAULT_NODE = props.DEFAULT_NODE;
    return _this;
  }

  return CodePlugin;
}(Plugin);

export default CodePlugin;
//# sourceMappingURL=index.js.map