import React from 'react';
import {
    Card,
    CardActions,
    CardContent,
    Box,
    IconButton,
} from '@material-ui/core';
import {
    PlayArrow as PlayArrowIcon,
    Pause as PauseIcon,
    Done as DoneIcon,
    Undo as UndoIcon,
} from '@material-ui/icons';

import tasksService from '../../../../shared/services/tasks/tasks.service';
import './CurrentTaskCard.scss';

class CurrentTaskCard extends React.Component {
    coundownApi = null;
    countdownKey = Math.random();
    secondsRemaining;
    intervalHandle;

    constructor() {
        super();

        this.state = {
            task: null,
            isPlaying: false,
            minutes: '00',
            seconds: '00',
        };

        this.handlePlay = this.handlePlay.bind(this);
        this.handlePause = this.handlePause.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleDone = this.handleDone.bind(this);
        this.tick = this.tick.bind(this);
    }

    componentDidMount() {
        tasksService.getSelectTaskSubject().subscribe((task) => {
            const time = this.formatTime(task.duration);
            
            this.setState({
                ...this.state,
                task,
                minutes: time.minutesFormatted,
                seconds: time.secondsFormatted,
            });
            this.secondsRemaining = task.duration;
        });
    }

    componentWillUnmount() {
        tasksService.getSelectTaskSubject().complete();
    }

    formatTime(secondsLeft) {
        const minutes = Math.floor(secondsLeft / 60);
        const seconds = secondsLeft - (minutes * 60);

        let minutesFormatted = minutes;
        let secondsFormatted = seconds;

        if (seconds < 10) {
            secondsFormatted = "0" + seconds;
        }

        if (minutes < 10) {
            minutesFormatted = "0" + minutes;
        }

        return {
            minutes,
            seconds,
            minutesFormatted,
            secondsFormatted,
        };
    }

    tick() {
        const time = this.formatTime(this.secondsRemaining);

        this.setState({
            ...this.state,
            minutes: time.minutesFormatted,
            seconds: time.secondsFormatted,
        });

        if (time.minutes === 0 & time.seconds === 0) {
            this.handleDone();
        }

        this.secondsRemaining--
    }

    handlePlay() {
        this.intervalHandle = setInterval(this.tick, 1000);
        this.setState({
            ...this.state,
            isPlaying: true,
        });
    }

    handlePause() {
        clearInterval(this.intervalHandle);
        this.setState({
            ...this.state,
            isPlaying: false,
        });
    }

    handleReset() {
        clearInterval(this.intervalHandle);
        this.secondsRemaining = this.state.task.duration;
        const time = this.formatTime(this.state.task.duration);
        
        this.setState({
            ...this.state,
            minutes: time.minutesFormatted,
            seconds: time.secondsFormatted,
            isPlaying: false,
        });
    }

    handleDone() {
        clearInterval(this.intervalHandle);
        const task = this.state.task;
        const tookTimeToFinish = task.duration - this.secondsRemaining;

        tasksService.finish(task.id, {
            tookTimeToFinish,
            finished: true,
            finishedAt: new Date(),
        }).then(() => {
            tasksService.getFinishTaskSubject().next(task.id);
            this.setState({
                ...this.state,
                isPlaying: false,
                task: null,
            });
        }).catch((error) => {
            console.error(error);
        })
    }

    render() {
        return (
            <>
                {this.state.task &&
                    <Card className="CurrentTaskCard">
                        <Box bgcolor="primary.main" color="white" className="current-task-box">
                            <span className="title">Current task</span>
                        </Box>
                        <CardContent className="card-content">
                            <h2 className="task-title">{this.state.task.title}</h2>
                            <p className="task-description">{this.state.task.description}</p>
                            <div className="task-timer-container">
                                <span className="timer">{this.state.minutes}:{this.state.seconds}</span>
                            </div>
                        </CardContent>
                        <CardActions className="card-footer">
                            <IconButton color="primary" onClick={this.handleReset}>
                                <UndoIcon />
                            </IconButton>
                            {this.state.isPlaying === true &&
                                <IconButton color="primary" onClick={this.handlePause}>
                                    <PauseIcon />
                                </IconButton>
                            }
                            {this.state.isPlaying === false &&
                                <IconButton color="primary" onClick={this.handlePlay}>
                                    <PlayArrowIcon />
                                </IconButton>
                            }
                            <IconButton color="primary" onClick={this.handleDone}>
                                <DoneIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                }
            </>
        );
    }
}

export default CurrentTaskCard;
