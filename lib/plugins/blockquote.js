function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable prefer-reflect, default-case, react/display-name */
import BlockquoteIcon from 'material-ui-icons/FormatQuote';
import React from 'react';
import createBlockquotePlugin from 'slate-edit-blockquote';

import { makeTagNode, ToolbarButton } from '../helpers';
import Plugin from './Plugin';


export var BLOCKQUOTE = 'BLOCKQUOTE/BLOCKQUOTE';

var BlockquotePlugin = function (_Plugin) {
  _inherits(BlockquotePlugin, _Plugin);

  function BlockquotePlugin(props) {
    _classCallCheck(this, BlockquotePlugin);

    var _this = _possibleConstructorReturn(this, (BlockquotePlugin.__proto__ || Object.getPrototypeOf(BlockquotePlugin)).call(this, props));

    _this.Button = function (_ref) {
      var editorState = _ref.editorState,
          onChange = _ref.onChange;

      var onClick = function onClick(e) {
        e.preventDefault();

        var isActive = editorState.blocks.some(function (block) {
          return Boolean(editorState.document.getClosest(block.key, function (parent) {
            return parent.type === BLOCKQUOTE;
          }));
        });

        var transform = editorState.transform();

        if (isActive) {
          transform = transform.unwrapBlock(BLOCKQUOTE);
        } else {
          transform = transform.wrapBlock(BLOCKQUOTE);
        }

        onChange(transform.apply());
      };

      var isActive = editorState.blocks.some(function (block) {
        return Boolean(editorState.document.getClosest(block.key, function (parent) {
          return parent.type === BLOCKQUOTE;
        }));
      });

      // In the interests of backwards compatability, this plugin is 'enabled'
      // but the button it uses is hidden. This is so any articles/pages currently
      // using the plugin aren't affected by it being disabled.
      return null;

      /*
      return (
        <ToolbarButton
          onClick={onClick}
          isActive={isActive}
          icon={<BlockquoteIcon />}
        />
      )
      */
    };

    _this.name = 'blockquote';
    _this.nodes = _defineProperty({}, BLOCKQUOTE, makeTagNode('blockquote'));
    _this.plugins = [createBlockquotePlugin({
      type: BLOCKQUOTE,
      typeDefault: _this.DEFAULT_NODE
    })];

    _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'blockquote':
          return {
            kind: 'block',
            type: BLOCKQUOTE,
            nodes: next(el.childNodes)
          };
      }
    };

    _this.serialize = function (object, children) {
      if (object.kind !== 'block') {
        return;
      }
      switch (object.type) {
        case BLOCKQUOTE:
          return React.createElement(
            'blockquote',
            { style: { textAlign: object.data.get('align') } },
            children
          );
      }
    };

    _this.DEFAULT_NODE = props.DEFAULT_NODE;
    return _this;
  }

  // eslint-disable-next-line react/display-name


  //toolbarButtons = [this.Button]

  return BlockquotePlugin;
}(Plugin);

export default BlockquotePlugin;
//# sourceMappingURL=blockquote.js.map