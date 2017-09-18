var _jsxFileName = 'src/index.js',
    _this = this;

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// TODO lint: prefer-reflect doesn't work with slate state #158
/* eslint no-duplicate-imports: ["off"] */
/* eslint prefer-reflect: ["off"] */
import SubjectIcon from 'material-ui-icons/Subject';
import { compose, flatten, map, mergeAll, prop, pathOr } from 'ramda';
import { Html } from 'slate';
import React from 'react';
import { ActionTypes } from 'redux-undo';
import Component from './Component';

import Plugin from './plugins/Plugin';
// import KatexPlugin from './plugins/katex'
import * as hooks from './hooks';
import parse5 from 'parse5';

var createNodes = compose(mergeAll, map(prop('nodes')));
var createMarks = compose(mergeAll, map(prop('marks')));
var createPlugins = compose(flatten, map(prop('plugins')));

export var createInitialState = hooks.createInitialState;

export var html = new Html({
    rules: [].concat(_toConsumableArray(hooks.defaultPlugins), [hooks.lineBreakSerializer]),
    parseHtml: parse5.parseFragment
});

export default (function () {
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
        return React.createElement(
            'div',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 65
                },
                __self: _this
            },
            plugins.map(function (plugin, i) {
                return plugin.hoverButtons.map(function (Button, j) {
                    return React.createElement(Button, {
                        key: i + '-' + j,
                        editorState: editorState,
                        onChange: onChange,
                        focus: focus,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 68
                        },
                        __self: _this
                    });
                });
            })
        );
    };
    props.HoverButtons = HoverButtons;

    var ToolbarButtons = function ToolbarButtons(_ref2) {
        var editorState = _ref2.editorState,
            onChange = _ref2.onChange,
            focus = _ref2.focus;
        return React.createElement(
            'div',
            {
                __source: {
                    fileName: _jsxFileName,
                    lineNumber: 81
                },
                __self: _this
            },
            plugins.map(function (plugin, i) {
                return React.createElement(
                    'span',
                    {
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 83
                        },
                        __self: _this
                    },
                    plugin.toolbarButtons.map(function (Button, j) {
                        if (Button) {
                            return React.createElement(Button, {
                                key: i + '-' + j,
                                editorState: editorState,
                                onChange: onChange,
                                focus: focus,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 86
                                },
                                __self: _this
                            });
                        }
                    }),
                    plugin.toolbarButtons && plugin.toolbarButtons.length > 0 && React.createElement(
                        'span',
                        {
                            __source: {
                                fileName: _jsxFileName,
                                lineNumber: 94
                            },
                            __self: _this
                        },
                        '|'
                    )
                );
            })
        );
    };
    props.ToolbarButtons = ToolbarButtons;

    var Slate = function Slate(cellProps) {
        return React.createElement(Component, Object.assign({}, cellProps, props, {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 102
            },
            __self: _this
        }));
    };
    var StaticComponent = function StaticComponent(_ref3) {
        var _ref3$state = _ref3.state;
        _ref3$state = _ref3$state === undefined ? {} : _ref3$state;
        var editorState = _ref3$state.editorState;
        return React.createElement('div', { dangerouslySetInnerHTML: { __html: html.serialize(editorState) }, __source: {
                fileName: _jsxFileName,
                lineNumber: 104
            },
            __self: _this
        });
    };
    return {
        Component: Slate,
        StaticComponent: StaticComponent,
        name: 'ory/editor/core/content/slate',
        version: '0.0.1',
        IconComponent: React.createElement(SubjectIcon, {
            __source: {
                fileName: _jsxFileName,
                lineNumber: 111
            },
            __self: _this
        }),
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
            if ((action.type === ActionTypes.UNDO || action.type === ActionTypes.REDO) && pathOr(false, ['content', 'state', 'editorState'], state)) {
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
    };
});
//# sourceMappingURL=index.js.map