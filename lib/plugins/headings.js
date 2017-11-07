function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable prefer-reflect, default-case, react/display-name */
import React from 'react';
import H1Icon from 'material-ui-icons/LooksOne';
import H2Icon from 'material-ui-icons/LooksTwo';
import H3Icon from 'material-ui-icons/Looks3';
import H4Icon from 'material-ui-icons/Looks4';
import H5Icon from 'material-ui-icons/Looks5';
import H6Icon from 'material-ui-icons/Looks6';
// import { Data } from 'slate'
import { makeTagNode, ToolbarButton } from '../helpers';
import Plugin from './Plugin';


export var H1 = 'HEADINGS/HEADING-ONE';
export var H2 = 'HEADINGS/HEADING-TWO';
export var H3 = 'HEADINGS/HEADING-THREE';
export var H4 = 'HEADINGS/HEADING-FOUR';
export var H5 = 'HEADINGS/HEADING-FIVE';
export var H6 = 'HEADINGS/HEADING-SIX';

var createNode = function createNode(type, el, next) {
  return {
    kind: 'block',
    type: type,
    // data: Data.create({ style: el.attribs.style }),
    nodes: next(el.childNodes)
  };
};

var HeadingsPlugin = function (_Plugin) {
  _inherits(HeadingsPlugin, _Plugin);

  function HeadingsPlugin(props) {
    var _this$nodes;

    _classCallCheck(this, HeadingsPlugin);

    var _this = _possibleConstructorReturn(this, (HeadingsPlugin.__proto__ || Object.getPrototypeOf(HeadingsPlugin)).call(this, props));

    _this.createButton = function (type, icon) {
      return function (_ref) {
        var editorState = _ref.editorState,
            onChange = _ref.onChange;

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

        return React.createElement(ToolbarButton, { onClick: onClick, isActive: isActive, icon: icon });
      };
    };

    _this.name = 'headings';
    _this.nodes = (_this$nodes = {}, _defineProperty(_this$nodes, H1, makeTagNode('h1')), _defineProperty(_this$nodes, H2, makeTagNode('h2')), _defineProperty(_this$nodes, H3, makeTagNode('h3')), _defineProperty(_this$nodes, H4, makeTagNode('h4')), _defineProperty(_this$nodes, H5, makeTagNode('h5')), _defineProperty(_this$nodes, H6, makeTagNode('h6')), _this$nodes);
    _this.toolbarButtons = [_this.createButton(H1, React.createElement(H1Icon, null)), _this.createButton(H2, React.createElement(H2Icon, null)), _this.createButton(H3, React.createElement(H3Icon, null)), _this.createButton(H4, React.createElement(H4Icon, null)), _this.createButton(H5, React.createElement(H5Icon, null)), _this.createButton(H6, React.createElement(H6Icon, null))];

    _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'h1':
          return createNode(H1, el, next);
        case 'h2':
          return createNode(H2, el, next);
        case 'h3':
          return createNode(H3, el, next);
        case 'h4':
          return createNode(H4, el, next);
        case 'h5':
          return createNode(H5, el, next);
        case 'h6':
          return createNode(H6, el, next);
      }
    };

    _this.serialize = function (object, children) {
      if (object.kind !== 'block') {
        return;
      }
      var style = { textAlign: object.data.get('align') };

      switch (object.type) {
        case H1:
          return React.createElement(
            'h1',
            { style: style },
            children
          );
        case H2:
          return React.createElement(
            'h2',
            { style: style },
            children
          );
        case H3:
          return React.createElement(
            'h3',
            { style: style },
            children
          );
        case H4:
          return React.createElement(
            'h4',
            { style: style },
            children
          );
        case H5:
          return React.createElement(
            'h5',
            { style: style },
            children
          );
        case H6:
          return React.createElement(
            'h6',
            { style: style },
            children
          );
      }
    };

    _this.DEFAULT_NODE = props.DEFAULT_NODE;
    return _this;
  }

  // eslint-disable-next-line react/display-name


  return HeadingsPlugin;
}(Plugin);

export default HeadingsPlugin;
//# sourceMappingURL=headings.js.map