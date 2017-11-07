function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable prefer-reflect, default-case, react/display-name */
import FormatClearIcon from 'material-ui-icons/FormatClear';
import React from 'react';

import { makeTagNode, ToolbarButton } from '../helpers';
import Plugin from './Plugin';

var ClearPlugin = function (_Plugin) {
    _inherits(ClearPlugin, _Plugin);

    function ClearPlugin(props) {
        _classCallCheck(this, ClearPlugin);

        var _this = _possibleConstructorReturn(this, (ClearPlugin.__proto__ || Object.getPrototypeOf(ClearPlugin)).call(this, props));

        _this.Button = function (_ref) {
            var editorState = _ref.editorState,
                onChange = _ref.onChange;

            var onClick = function onClick(e) {
                e.preventDefault();

                var transform = editorState.transform();
                transform = transform.setBlock(_this.DEFAULT_NODE);
                onChange(transform.apply());

                editorState.marks.forEach(function (mark) {
                    transform = transform.toggleMark(mark.type);
                    onChange(transform.apply());
                });

                editorState.blocks.forEach(function (block) {
                    transform = transform.unwrapBlock(block.type);
                    onChange(transform.apply());
                });

                editorState.inlines.forEach(function (inline) {
                    transform = transform.unwrapInline(inline.type);
                    onChange(transform.apply());
                });
            };

            return React.createElement(ToolbarButton, {
                onClick: onClick,
                icon: React.createElement(FormatClearIcon, null)
            });
        };

        _this.hoverButtons = [_this.Button];


        _this.DEFAULT_NODE = props.DEFAULT_NODE;
        return _this;
    }

    // eslint-disable-next-line react/display-name


    return ClearPlugin;
}(Plugin);

export default ClearPlugin;
//# sourceMappingURL=clearformatting.js.map