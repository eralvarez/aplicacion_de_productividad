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

        this.changeDialogState = this.changeDialogState.bind(this);
    }

    changeDialogState(isOpen) {
        this.setState({
            openTaskDialog: isOpen,
        });
    }

    render() {
        return (
            <Card className="NewTaskCard">
                <CardContent className="card-content">
                    <h2 className="new-task-label">New task</h2>
                    <IconButton color="primary" onClick={() => this.changeDialogState(true)}>
                        <AddIcon fontSize="large" />
                    </IconButton>

                    <CreateNewTaskDialog onClose={() => this.changeDialogState(false)} open={this.state.openTaskDialog} />
                </CardContent>
            </Card>
        );
    }
}

export default NewTaskCard;
