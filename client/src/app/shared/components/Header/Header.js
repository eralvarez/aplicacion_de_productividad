import React from 'react';
import { Box } from '@material-ui/core';
// import {
//     AppBar,
//     Toolbar,
//     IconButton,
//     Typography,
//     Button,
// } from '@material-ui/core';
// import MenuIcon from '@material-ui/icons/Menu';
// import { useTheme } from '@material-ui/core/styles';
// import { withTheme } from '@material-ui/styles';

import './Header.scss';

class Header extends React.Component {

    static defaultProps = {
        title: 'Here is a title',
        className: '',
    }

    constructor(props) {
        super(props);
    }
    
    componentDidMount() {
        console.log(':)!');
    }

    render() {
        const mainBoxClassName = `Header ${this.props.className}`;
        return (
            <Box bgcolor="primary.main" color="white" className={mainBoxClassName}>
                <span className="title">{this.props.title}</span>
            </Box>
        );
    }
}

export default Header;
