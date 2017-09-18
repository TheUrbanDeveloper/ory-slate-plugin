var _jsxFileName = 'src/Component/index.js';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable no-alert, prefer-reflect, no-underscore-dangle */
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import React, { Component } from 'react';
import Portal from 'react-portal';
import position from 'selection-position';
import { Editor } from 'slate';
import UpperToolbar from './UpperToolbar';
import { ContentPluginProps } from 'ory-editor-core/lib/service/plugin/classes';

var onBlur = function onBlur(_event, _data, state) {
    return state;
};

var Slate = function (_Component) {
    _inherits(Slate, _Component);

    function Slate() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, Slate);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Slate.__proto__ || Object.getPrototypeOf(Slate)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {
            _this.selection = window.getSelection();
            _this.updateToolbar();
        }, _this.shouldComponentUpdate = function (nextProps) {
            return nextProps.state.editorState !== _this.props.state.editorState || nextProps.state.toolbar !== _this.props.state.toolbar || nextProps.focused !== _this.props.focused || nextProps.readOnly !== _this.props.readOnly;
        }, _this.componentDidUpdate = function () {
            return _this.updateToolbar();
        }, _this.onStateChange = function (editorState) {
            _this.props.onChange({ editorState: editorState });
        }, _this.handleOpen = function (portal) {
            _this.toolbar = portal.firstChild;
        }, _this.updateToolbar = function () {
            var editorState = _this.props.state.editorState;

            var toolbar = _this.toolbar;

            if (!toolbar || editorState.isBlurred || editorState.isCollapsed) {
                return;
            }

            var _position = position(),
                left = _position.left,
                top = _position.top,
                width = _position.width;

            toolbar.style.opacity = 1;
            toolbar.style.top = top + window.scrollY - toolbar.offsetHeight + 'px';
            toolbar.style.left = left + window.scrollX - toolbar.offsetWidth / 2 + width / 2 + 'px';
        }, _temp), _possibleConstructorReturn(_this, _ret);
    }

    _createClass(Slate, [{
        key: 'render',
        value: function render() {
            var _props = this.props,
                focused = _props.focused,
                readOnly = _props.readOnly,
                editorState = _props.state.editorState,
                schema = _props.schema,
                plugins = _props.plugins,
                onKeyDown = _props.onKeyDown,
                HoverButtons = _props.HoverButtons,
                ToolbarButtons = _props.ToolbarButtons,
                focus = _props.focus;

            var isOpened = editorState.isExpanded && editorState.isFocused;

            return React.createElement(
                'div',
                {
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 72
                    },
                    __self: this
                },
                readOnly ? null : React.createElement(
                    UpperToolbar,
                    { open: focused, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 74
                        },
                        __self: this
                    },
                    React.createElement(ToolbarButtons, {
                        editorState: editorState,
                        onChange: this.onStateChange,
                        focus: focus,
                        __source: {
                            fileName: _jsxFileName,
                            lineNumber: 75
                        },
                        __self: this
                    })
                ),
                React.createElement(
                    Portal,
                    { isOpened: isOpened, onOpen: this.handleOpen, __source: {
                            fileName: _jsxFileName,
                            lineNumber: 82
                        },
                        __self: this
                    },
                    React.createElement(
                        MuiThemeProvider,
                        { theme: createMuiTheme(), __source: {
                                fileName: _jsxFileName,
                                lineNumber: 83
                            },
                            __self: this
                        },
                        React.createElement(
                            'div',
                            {
                                className: 'ory-prevent-blur ory-plugins-content-slate-inline-toolbar',
                                style: { padding: 0 },
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 85
                                },
                                __self: this
                            },
                            React.createElement(HoverButtons, {
                                editorState: editorState,
                                onChange: this.onStateChange,
                                focus: focus,
                                __source: {
                                    fileName: _jsxFileName,
                                    lineNumber: 89
                                },
                                __self: this
                            })
                        )
                    )
                ),
                React.createElement(Editor, {
                    onChange: this.onStateChange,
                    onKeyDown: onKeyDown,
                    readOnly: Boolean(readOnly),
                    onBlur: onBlur,
                    schema: schema,
                    state: editorState,
                    plugins: plugins,
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 97
                    },
                    __self: this
                })
            );
        }
    }]);

    return Slate;
}(Component);

export default Slate;
//# sourceMappingURL=index.js.map