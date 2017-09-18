var _jsxFileName = 'src/plugins/alignment.js';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable prefer-reflect */
import React from 'react';
import FormatAlignLeftIcon from 'material-ui-icons/FormatAlignLeft';
import FormatAlignCenterIcon from 'material-ui-icons/FormatAlignCenter';
import FormatAlignRightIcon from 'material-ui-icons/FormatAlignRight';
import FormatAlignJustifyIcon from 'material-ui-icons/FormatAlignJustify';

import { ToolbarButton } from '../helpers';
import Plugin from './Plugin';

var AlignmentPlugin = function (_Plugin) {
  _inherits(AlignmentPlugin, _Plugin);

  function AlignmentPlugin() {
    var _ref,
        _this2 = this;

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

          var isActive = editorState.blocks.some(function (block) {
            return block.data.get('align') === align;
          });

          onChange(editorState.transform().setBlock({ data: { align: isActive ? null : align } }).apply());
        };

        var isActive = editorState.blocks.some(function (block) {
          return block.data.get('align') === align;
        });

        return React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon, __source: {
            fileName: _jsxFileName,
            lineNumber: 36
          },
          __self: _this2
        });
      };
    }, _this.name = 'alignment', _this.toolbarButtons = [_this.createButton('left', React.createElement(FormatAlignLeftIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 42
      },
      __self: this
    })), _this.createButton('center', React.createElement(FormatAlignCenterIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 43
      },
      __self: this
    })), _this.createButton('right', React.createElement(FormatAlignRightIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 44
      },
      __self: this
    })), _this.createButton('justify', React.createElement(FormatAlignJustifyIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 45
      },
      __self: this
    }))], _temp), _possibleConstructorReturn(_this, _ret);
  }

  // eslint-disable-next-line react/display-name


  return AlignmentPlugin;
}(Plugin);

export default AlignmentPlugin;
//# sourceMappingURL=alignment.js.map