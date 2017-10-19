var _jsxFileName = 'src/plugins/lists.js';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react';
import ListIcon from 'material-ui/svg-icons/action/list';
import OrderedListIcon from 'material-ui/svg-icons/editor/format-list-numbered';
import createListPlugin from 'slate-edit-list';


import { makeTagNode, ToolbarButton } from '../helpers';
import Plugin from './Plugin';

export var UL = 'LISTS/UNORDERED-LIST';
export var OL = 'LISTS/ORDERED-LIST';
export var LI = 'LISTS/LIST-ITEM';

var ListsPlugin = function (_Plugin) {
  _inherits(ListsPlugin, _Plugin);

  function ListsPlugin(props) {
    var _this2 = this,
        _this$nodes;

    _classCallCheck(this, ListsPlugin);

    var _this = _possibleConstructorReturn(this, (ListsPlugin.__proto__ || Object.getPrototypeOf(ListsPlugin)).call(this, props));

    _this.createButton = function (type, icon) {
      return function (_ref) {
        var editorState = _ref.editorState,
            onChange = _ref.onChange;

        var onClick = function onClick(e) {
          e.preventDefault();

          var isList = editorState.blocks.some(function (block) {
            return block.type === LI;
          });
          var isType = editorState.blocks.some(function (block) {
            return Boolean(editorState.document.getClosest(block.key, function (parent) {
              return parent.type === type;
            }));
          });

          var transform = editorState.transform();

          if (isList && isType) {
            transform = transform.setBlock(_this.DEFAULT_NODE).unwrapBlock(UL).unwrapBlock(OL);
          } else if (isList) {
            transform = transform.unwrapBlock(type === UL ? OL : UL).wrapBlock(type);
          } else {
            transform = transform.setBlock(LI).wrapBlock(type);
          }

          onChange(transform.apply());
        };

        var isList = editorState.blocks.some(function (block) {
          return block.type === LI;
        });
        var isType = editorState.blocks.some(function (block) {
          return Boolean(editorState.document.getClosest(block.key, function (parent) {
            return parent.type === type;
          }));
        });

        return React.createElement(ToolbarButton, {
          onClick: onClick,
          isActive: isList && isType,
          icon: icon,
          __source: {
            fileName: _jsxFileName,
            lineNumber: 72
          },
          __self: _this2
        });
      };
    };

    _this.name = 'lists';
    _this.nodes = (_this$nodes = {}, _defineProperty(_this$nodes, UL, makeTagNode('ul')), _defineProperty(_this$nodes, OL, makeTagNode('ol')), _defineProperty(_this$nodes, LI, makeTagNode('li')), _this$nodes);
    _this.toolbarButtons = [_this.createButton(UL, React.createElement(ListIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 89
      },
      __self: this
    })), _this.createButton(OL, React.createElement(OrderedListIcon, {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 90
      },
      __self: this
    }))];

    _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'ul':
          return {
            kind: 'block',
            type: UL,
            nodes: next(el.childNodes)
          };
        case 'li':
          return {
            kind: 'block',
            type: LI,
            nodes: next(el.childNodes)
          };
        case 'ol':
          return {
            kind: 'block',
            type: OL,
            nodes: next(el.childNodes)
          };
      }
    };

    _this.serialize = function (object, children) {
      if (object.kind !== 'block') {
        return;
      }
      switch (object.type) {
        case UL:
          return React.createElement(
            'ul',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 122
              },
              __self: _this2
            },
            children
          );
        case LI:
          return React.createElement(
            'li',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 124
              },
              __self: _this2
            },
            children
          );
        case OL:
          return React.createElement(
            'ol',
            {
              __source: {
                fileName: _jsxFileName,
                lineNumber: 126
              },
              __self: _this2
            },
            children
          );
      }
    };

    _this.plugins = [createListPlugin({
      types: [UL, OL],
      typeItem: LI,
      typeDefault: props.DEFAULT_NODE
    })];
    return _this;
  }

  // eslint-disable-next-line react/display-name


  return ListsPlugin;
}(Plugin);

export default ListsPlugin;
//# sourceMappingURL=lists.js.map