import React from 'react';
import {
    Card,
    CardContent,
    IconButton,
} from '@material-ui/core';
import {
    Add as AddIcon
} from '@material-ui/icons';

import './NewTaskCard.scss';
import CreateNewTaskDialog from './components/CreateNewTaskDialog/CreateNewTaskDialog';

class NewTaskCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            openTaskDialog: false,
        };

        this.handleOpenTaskDialog = this.handleOpenTaskDialog.bind(this);
        this.handleOnCloseTaskDialog = this.handleOnCloseTaskDialog.bind(this);
    }

    handleOpenTaskDialog() {
        this.setState({
            openTaskDialog: true,
        });
    }

    handleOnCloseTaskDialog(value) {
        this.setState({
            openTaskDialog: false,
        });
        console.log(value);
    }

    render() {
        return (
            <Card className="NewTaskCard">
                <CardContent className="card-content">
                    <h2 className="new-task-label">New task</h2>
                    <IconButton color="primary" onClick={this.handleOpenTaskDialog}>
                        <AddIcon fontSize="large" />
                    </IconButton>

                    <CreateNewTaskDialog onClose={this.handleOnCloseTaskDialog} open={this.state.openTaskDialog} />
                </CardContent>
            </Card>
        );
    }
}

export default NewTaskCard;
