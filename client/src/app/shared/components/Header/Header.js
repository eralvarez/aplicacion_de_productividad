import React from 'react';
import { Box } from '@material-ui/core';

import './Header.scss';

class Header extends React.Component {

    static defaultProps = {
        title: 'Here is a title',
        className: '',
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
