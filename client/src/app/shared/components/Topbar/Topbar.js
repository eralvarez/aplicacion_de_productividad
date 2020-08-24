import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import './Topbar.scss';

class Topbar extends React.Component {

    static defaultProps = {
        position: 'fixed'
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
                        <Button component={NavLink} activeClassName="active-link" color="inherit" exact to="/">my tasks</Button>
                        <Button component={NavLink} activeClassName="active-link" color="inherit" to="/analytics">analytics</Button>
                        <Button component={NavLink} activeClassName="active-link" color="inherit" to="/archive">archive</Button>
                    </nav>
                </Toolbar>
            </AppBar>
        );
    }
}

export default Topbar;
