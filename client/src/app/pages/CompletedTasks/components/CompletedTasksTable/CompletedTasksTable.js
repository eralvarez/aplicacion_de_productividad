import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@material-ui/core';

import tasksService from '../../../../shared/services/tasks/tasks.service';
import './CompletedTasksTable.scss';

class CompletedTasksTable extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
        };
    }

    componentDidMount() {
        tasksService.getAllFinished().then((tasks) => {
            this.setState({
                ...this.state,
                tasks
            });
        })
    }

    render() {
        return (
            <>
                {this.state.tasks.length > 0 &&
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="right">Description</TableCell>
                                    <TableCell align="right">Duration (secs)</TableCell>
                                    <TableCell align="right">Finished at (secs)</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.tasks.map((task) => (
                                    <TableRow key={task.id}>
                                        <TableCell component="th" scope="row">{task.title}</TableCell>
                                        <TableCell align="right">{task.description}</TableCell>
                                        <TableCell align="right">{task.duration}</TableCell>
                                        <TableCell align="right">{task.tookTimeToFinish}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                }
            </>
        );
    }
}

export default CompletedTasksTable;
