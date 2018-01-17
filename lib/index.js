'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.html = exports.createInitialState = undefined;

var _Subject = require('material-ui-icons/Subject');

var _Subject2 = _interopRequireDefault(_Subject);

var _ramda = require('ramda');

var _slate = require('slate');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reduxUndo = require('redux-undo');

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _Plugin = require('./plugins/Plugin');

var _Plugin2 = _interopRequireDefault(_Plugin);

var _hooks = require('./hooks');

var hooks = _interopRequireWildcard(_hooks);

var _parse = require('parse5');

var _parse2 = _interopRequireDefault(_parse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */

// import KatexPlugin from './plugins/katex'


var createNodes = (0, _ramda.compose)(_ramda.mergeAll, (0, _ramda.map)((0, _ramda.prop)('nodes')));
var createMarks = (0, _ramda.compose)(_ramda.mergeAll, (0, _ramda.map)((0, _ramda.prop)('marks')));
var createPlugins = (0, _ramda.compose)(_ramda.flatten, (0, _ramda.map)((0, _ramda.prop)('plugins')));

var createInitialState = exports.createInitialState = hooks.createInitialState;

var html = exports.html = new _slate.Html({
  rules: [].concat(_toConsumableArray(hooks.defaultPlugins), [hooks.lineBreakSerializer]),
  parseHtml: _parse2.default.parseFragment
});

exports.default = function () {
  var plugins = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : hooks.defaultPlugins;

  var props = {};
  props.schema = {
    nodes: createNodes(plugins),
    marks: createMarks(plugins)
  };
  props.plugins = createPlugins(plugins);
  props.onKeyDown = function (e, data, state) {
    // we need to prevent slate from handling undo and redo
    if (data.isMod && (data.key === 'z' || data.key === 'y')) {
      return state;
    }

    if (data.isShift && data.key === 'enter') {
      return state.transform().insertText('\n').apply();
    }

    if (data.key === '-') {
      var doc = state.document.getBlocks().last().getLastText().text;
      if (doc.length > 0) {
        if (doc[doc.length - 1] === '-') {
          // prevent the actual hyphen getting in
          e.preventDefault();
          return state.transform().deleteBackward().insertText('\u2014').apply();
        }
      }
    }

    for (var i = 0; i < plugins.length; i++) {
      var onKeyDown = plugins[i].onKeyDown;

      var newState = onKeyDown && onKeyDown(e, data, state);
      if (newState) {
        return newState;
      }
    }

    return;
  };

  var HoverButtons = function HoverButtons(_ref) {
    var editorState = _ref.editorState,
        onChange = _ref.onChange,
        focus = _ref.focus;
    return _react2.default.createElement(
      'div',
      null,
      plugins.map(function (plugin, i) {
        return plugin.hoverButtons.map(function (Button, j) {
          return _react2.default.createElement(Button, {
            key: i + '-' + j,
            editorState: editorState,
            onChange: onChange,
            focus: focus,
            style: {
              minWidth: '44px'
            }
          });
        });
      })
    );
  };
  props.HoverButtons = HoverButtons;

  var ToolbarButtons = function ToolbarButtons(_ref2) {
    var editorState = _ref2.editorState,
        onChange = _ref2.onChange,
        focus = _ref2.focus,
        id = _ref2.id;
    return _react2.default.createElement(
      'div',
      null,
      plugins.map(function (plugin, i) {
        return plugin.toolbarButtons.map(function (Button, j) {
          return _react2.default.createElement(Button, {
            key: id + '-' + i + '-' + j,
            editorState: editorState,
            onChange: onChange,
            focus: focus
          });
        });
      })
    );
  };
  props.ToolbarButtons = ToolbarButtons;

  var Slate = function Slate(cellProps) {
    return _react2.default.createElement(_Component2.default, Object.assign({}, cellProps, props));
  };
  var StaticComponent = function StaticComponent(_ref3) {
    var _ref3$state = _ref3.state;
    _ref3$state = _ref3$state === undefined ? {} : _ref3$state;
    var editorState = _ref3$state.editorState;
    return _react2.default.createElement('div', { dangerouslySetInnerHTML: { __html: html.serialize(editorState) } });
  };
  return {
    Component: Slate,
    StaticComponent: StaticComponent,

    name: 'ory/editor/core/content/slate',
    version: '0.0.1',
    IconComponent: _react2.default.createElement(_Subject2.default, null),
    text: 'Text',
    description: 'An advanced rich text area.',

    allowInlineNeighbours: true,

    handleFocus: function handleFocus(props, source) {
      if (source === 'onMouseDown') {
        return;
      } else if (props.state.editorState.isFocused) {
        return;
      }

      setTimeout(function () {
        props.onChange({
          editorState: props.state.editorState.transform().focus().apply()
        });
      }, 0);
    },

    handleBlur: function handleBlur(props) {
      if (!props.state.editorState.isFocused) {
        return;
      }

      props.onChange({
        editorState: props.state.editorState.transform().blur().apply()
      });
    },

    reducer: function reducer(state, action) {
      if ((action.type === _reduxUndo.ActionTypes.UNDO || action.type === _reduxUndo.ActionTypes.REDO) && (0, _ramda.pathOr)(false, ['content', 'state', 'editorState'], state)) {
        return Object.assign({}, state, {
          content: Object.assign({}, state.content, {
            state: Object.assign({}, state.content.state, {
              editorState: state.content.state.editorState.merge({
                isNative: false
              })
            })
          })
        });
      }
      return state;
    },

    handleRemoveHotKey: hooks.handleRemoveHotKey,
    handleFocusPreviousHotKey: hooks.handleFocusPreviousHotKey,
    handleFocusNextHotKey: hooks.handleFocusNextHotKey,

    createInitialState: hooks.createInitialState,
    serialize: hooks.serialize,
    unserialize: hooks.unserialize

    // TODO this is disabled because of #207
    // merge = hooks.merge
    // split = hooks.split
  };
};
//# sourceMappingURL=index.js.map