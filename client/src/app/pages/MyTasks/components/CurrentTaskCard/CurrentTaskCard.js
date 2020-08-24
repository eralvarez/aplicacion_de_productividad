import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Box,
    IconButton,
} from '@material-ui/core';
import {
    Delete as DeleteIcon,
    PlayArrow as PlayArrowIcon,
    Pause as PauseIcon,
    Done as DoneIcon,
    Undo as UndoIcon,
} from '@material-ui/icons';

import './CurrentTaskCard.scss';

class CurrentTaskCard extends React.Component {
    render() {
        return (
            <Card className="CurrentTaskCard">
                <Box bgcolor="primary.main" color="white" className="current-task-box">
                    <span className="title">Current task</span>
                </Box>
                <CardContent className="card-content">
                    <h2 className="task-title">Word of the Day</h2>
                    <p className="task-description">Lorem ipsum lorem ipsum lorem ipsum lorem ipsum</p>
                    <div className="task-timer-container">
                        <span className="timer">00:00</span>
                    </div>
                </CardContent>
                <CardActions className="card-footer">
                    <IconButton color="primary">
                        <UndoIcon />
                    </IconButton>
                    <IconButton color="primary">
                        <PlayArrowIcon />
                    </IconButton>
                    <IconButton color="primary">
                        <PauseIcon />
                    </IconButton>
                    <IconButton color="primary">
                        <DoneIcon />
                    </IconButton>
                    <IconButton color="secondary">
                        <DeleteIcon />
                    </IconButton>
                </CardActions>
            </Card>
        );
    }
}

export default CurrentTaskCard;
