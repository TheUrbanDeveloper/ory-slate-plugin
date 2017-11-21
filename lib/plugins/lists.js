'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LI = exports.OL = exports.UL = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _List = require('material-ui-icons/List');

var _List2 = _interopRequireDefault(_List);

var _FormatListNumbered = require('material-ui-icons/FormatListNumbered');

var _FormatListNumbered2 = _interopRequireDefault(_FormatListNumbered);

var _slateEditList = require('slate-edit-list');

var _slateEditList2 = _interopRequireDefault(_slateEditList);

var _helpers = require('../helpers');

var _Plugin2 = require('./Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable prefer-reflect, default-case, react/display-name */


var UL = exports.UL = 'LISTS/UNORDERED-LIST';
var OL = exports.OL = 'LISTS/ORDERED-LIST';
var LI = exports.LI = 'LISTS/LIST-ITEM';

var ListsPlugin = function (_Plugin) {
  _inherits(ListsPlugin, _Plugin);

  function ListsPlugin(props) {
    var _this$nodes;

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

        return _react2.default.createElement(_helpers.ToolbarButton, {
          onClick: onClick,
          isActive: isList && isType,
          icon: icon
        });
      };
    };

    _this.name = 'lists';
    _this.nodes = (_this$nodes = {}, _defineProperty(_this$nodes, UL, (0, _helpers.makeTagNode)('ul')), _defineProperty(_this$nodes, OL, (0, _helpers.makeTagNode)('ol')), _defineProperty(_this$nodes, LI, (0, _helpers.makeTagNode)('li')), _this$nodes);
    _this.toolbarButtons = [_this.createButton(UL, _react2.default.createElement(_List2.default, null)), _this.createButton(OL, _react2.default.createElement(_FormatListNumbered2.default, null))];

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
          return _react2.default.createElement(
            'ul',
            null,
            children
          );
        case LI:
          return _react2.default.createElement(
            'li',
            null,
            children
          );
        case OL:
          return _react2.default.createElement(
            'ol',
            null,
            children
          );
      }
    };

    _this.plugins = [(0, _slateEditList2.default)({
      types: [UL, OL],
      typeItem: LI,
      typeDefault: props.DEFAULT_NODE
    })];
    return _this;
  }

  // eslint-disable-next-line react/display-name


  return ListsPlugin;
}(_Plugin3.default);

exports.default = ListsPlugin;
//# sourceMappingURL=lists.js.map