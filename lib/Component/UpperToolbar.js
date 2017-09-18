var _jsxFileName = 'src/Component/UpperToolbar.js',
    _this = this;

import React from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

var UpperToolbar = function UpperToolbar(_ref) {
    var _ref$open = _ref.open,
        open = _ref$open === undefined ? false : _ref$open,
        children = _ref.children,
        className = _ref.className;
    return React.createElement(
        'div',
        {
            style: {
                display: '' + (open ? 'block' : 'none')
            },
            __source: {
                fileName: _jsxFileName,
                lineNumber: 14
            },
            __self: _this
        },
        React.createElement(
            MuiThemeProvider,
            { theme: createMuiTheme, __source: {
                    fileName: _jsxFileName,
                    lineNumber: 19
                },
                __self: _this
            },
            React.createElement(
                AppBar,
                {
                    position: 'static',
                    style: {
                        backgroundColor: '#F7F7F7',
                        boxShadow: 'none',
                        width: 'inherit'
                    },
                    __source: {
                        fileName: _jsxFileName,
                        lineNumber: 20
                    },
                    __self: _this
                },
                children
            )
        )
    );
};

export default UpperToolbar;
//# sourceMappingURL=UpperToolbar.js.map