import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';

import './Topbar.scss';

class Topbar extends React.Component {

    static defaultProps = {
        position: 'fixed'
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <AppBar position={this.props.position} className="AppBar">
                <Toolbar>
                    <Typography variant="h6">
                        Productivity app
                    </Typography>
                    <span className="spacer"></span>
                    <nav>
                        <Button color="inherit">my tasks</Button>
                        <Button color="inherit">analytics</Button>
                        <Button color="inherit">archive</Button>
                    </nav>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Topbar;
