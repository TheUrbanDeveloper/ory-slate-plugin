import React from 'react';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import AppBar from 'material-ui/AppBar';

const UpperToolbar = ({
    open = false,
    children,
    className
}: {
    open?: boolean,
    children?: Object,
    className?: String
}) => (
    <div
        style={{
            display: `${open ? 'block': 'none'}`
        }}
    >
        <MuiThemeProvider theme={createMuiTheme}>
            <AppBar
                position="static"
                style={{
                    backgroundColor: 'lightgrey',
                    boxShadow: 'none',
                    width: 'inherit'
                }}
            >
                {children}
            </AppBar>
        </MuiThemeProvider>
    </div>
)

export default UpperToolbar;
