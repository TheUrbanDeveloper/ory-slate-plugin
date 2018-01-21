'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CODE = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Code = require('material-ui-icons/Code');

var _Code2 = _interopRequireDefault(_Code);

var _slate = require('slate');

var _helpers = require('../../helpers');

var _Plugin2 = require('../Plugin');

var _Plugin3 = _interopRequireDefault(_Plugin2);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable prefer-reflect, default-case, react/display-name */


var CODE = exports.CODE = 'CODE/CODE';

var CodePlugin = function (_Plugin) {
  _inherits(CodePlugin, _Plugin);

  function CodePlugin(props) {
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

        return null;
        // see backwards compatability note in blockquote.
        //return <ToolbarButton onClick={onClick} isActive={isActive} icon={icon} />
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

        return null;
        // see backwards compatability note in blockquote.
        //const isActive = editorState.blocks.some(block => block.type === type)
      };

      return Button;
    };

    _this.name = 'code';
    _this.marks = _defineProperty({}, CODE, (0, _helpers.makeTagMark)('code'));
    _this.nodes = _defineProperty({}, CODE, _node2.default);

    _this.deserialize = function (el, next) {
      switch (el.tagName.toLowerCase()) {
        case 'code':
          return {
            kind: 'mark',
            type: CODE,
            data: _slate.Data.create({}),
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
            return _react2.default.createElement(
              'code',
              null,
              children
            );
        }
      } else if (object.kind === 'block') {
        switch (object.type) {
          case CODE:
            return _react2.default.createElement(
              'pre',
              { style: { overflow: 'scroll' } },
              _react2.default.createElement(
                'code',
                null,
                children
              )
            );
        }
      }
    };

    _this.DEFAULT_NODE = props.DEFAULT_NODE;
    return _this;
  }

  //hoverButtons = [this.createButton(CODE, <CodeIcon />)]
  //toolbarButtons = [this.createNodeButton(CODE, <CodeIcon />)]

  return CodePlugin;
}(_Plugin3.default);

exports.default = CodePlugin;
//# sourceMappingURL=index.js.map