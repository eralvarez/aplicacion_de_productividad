import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
} from '@material-ui/icons';

import tasksService from '../../../../shared/services/tasks/tasks.service';
import './TasksTable.scss';
import EditTaskDialog from './components/EditTaskDialog/EditTaskDialog';

class TasksTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            openTaskDialog: false,
            taskIdToEdit: null,
        };

        this.changeDialogState = this.changeDialogState.bind(this);
    }

    componentDidMount() {
        tasksService.getCreateTaskSubject().subscribe((task) => {
            const tasks = this.state.tasks || [];
            tasks.splice(0, 0, task);
            this.setState({
                ...this.state,
                tasks,
            });
        });

        tasksService.getEditTaskSubject().subscribe((form) => {
            const tasks = this.state.tasks.map((task) => {
                if (this.state.taskIdToEdit === task.id) {
                    task = {
                        ...task,
                        ...form,
                    };
                }
                return task;
            });
            this.setState({
                ...this.state,
                tasks,
            });
        });

        tasksService.getFinishTaskSubject().subscribe((completedTaskId) => {
            const tasks = this.state.tasks;
            const taskIndex = tasks.findIndex((task) => task.id === completedTaskId);
            tasks.splice(taskIndex, 1);
            this.setState({
                ...this.state,
                tasks,
            });
        });

        tasksService.getAll().then((tasks) => {
            this.setState({
                ...this.state,
                tasks
            });
        })
    }

    componentWillUnmount() {
        tasksService.getSelectTaskSubject().complete();
        tasksService.getCreateTaskSubject().complete();
        tasksService.getEditTaskSubject().complete();
        tasksService.getFinishTaskSubject().complete();
    }

    handleSelectTask(task) {
        const tasks = this.state.tasks.map((_task) => {
            if (task.id === _task.id) {
                _task.disableActions = true;
            } else {
                _task.disableActions = false;
            }
            return _task;
        });

        this.setState({ tasks });

        tasksService.getSelectTaskSubject().next(task);
    }

    handleDelete(taskId) {
        tasksService.delete(taskId).then(() => {
            const tasks = this.state.tasks;
            const taskToRemove = tasks.findIndex((task) => task.id === taskId);
            tasks.splice(taskToRemove, 1);

            this.setState({
                ...this.state,
                tasks,
            })
        })
    }

    changeDialogState(isOpen, taskId) {
        this.setState({
            openTaskDialog: isOpen,
            taskIdToEdit: taskId,
        });
    }

    render() {
        return (
            <>
                {this.state.tasks.length > 0 &&
                    <>
                    <EditTaskDialog
                        onClose={() => this.changeDialogState(false)}
                        open={this.state.openTaskDialog}
                        taskIdToEdit={this.state.taskIdToEdit} />
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Duration</TableCell>
                                    <TableCell align="right">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell component="th" scope="row">{task.title}</TableCell>
                                        <TableCell align="right">{task.description}</TableCell>
                                        <TableCell align="right">{task.duration}</TableCell>
                                        <TableCell align="right">
                                            <Button variant="contained" disabled={task.disableActions} color="primary" onClick={() => this.handleSelectTask(task)}>
                                                Select task
                                        </Button>
                                            <IconButton
                                                color="primary"
                                                disabled={task.disableActions}
                                                onClick={() => this.changeDialogState(true, task.id)}>
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                color="secondary"
                                                disabled={task.disableActions}
                                                onClick={() => this.handleDelete(task.id)}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    </>
                }
            </>
        );
    }
}

export default TasksTable;
