import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from "victory";
import * as moment from 'moment';

import tasksService from '../../../../shared/services/tasks/tasks.service';
import './ProductivityChart.scss';

class ProductivityChart extends React.Component {

    constructor() {
        super();

        this.state = {
            task: [],
            data: [
                { day: 0, taskCount: 0 },
                { day: 1, taskCount: 0 },
                { day: 2, taskCount: 0 },
                { day: 3, taskCount: 0 },
                { day: 4, taskCount: 0 },
                { day: 5, taskCount: 0 },
                { day: 6, taskCount: 0 },
            ]
        };
    }

    componentDidMount() {
        tasksService.getAllFinished().then((tasks) => {
            const data = this.state.data;
            for (let taskIndex = 0; taskIndex < tasks.length; taskIndex++) {
                const task = tasks[taskIndex];
                data[moment(task.finishedAt).day()].taskCount += 1;
            }

            this.setState({
                ...this.state,
                data,
            })
        });
    }

    render() {
        return (
            <div className="ProductivityChart">
                <h1 className="font-light margin-no">Y axis = # Tasks in that day</h1>
                <h1 className="font-light margin-no">X axis = day of week</h1>
                <VictoryChart domainPadding={20}>
                    <VictoryAxis
                        tickValues={[0, 1, 2, 3, 4, 5, 6]}
                        tickFormat={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                    />

                    <VictoryAxis
                        dependentAxis
                        tickFormat={(x) => (`${x}`)}
                    />
                    <VictoryBar
                        data={this.state.data}
                        x="day"
                        y="taskCount" />
                </VictoryChart>
            </div>
        );
    }
}

export default ProductivityChart;
