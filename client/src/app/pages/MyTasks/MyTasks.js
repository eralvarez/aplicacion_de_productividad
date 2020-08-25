import React from 'react';

import './MyTasks.scss';
import Header from '../../shared/components/Header/Header';
import CurrentTaskCard from './components/CurrentTaskCard/CurrentTaskCard';
import NewTaskCard from './components/NewTaskCard/NewTaskCard';
import TasksTable from './components/TasksTable/TasksTable';

class MyTasks extends React.Component {
    // tasks = [];

    constructor() {
        super();
        this.state = {
            tasks: []
        };
    }

    render() {
        return (
            <div className="MyTasks">
                <Header title="My tasks" />
                <section className="card-section">
                    <CurrentTaskCard />
                    <NewTaskCard />
                </section>

                <section className="card-section">
                    <TasksTable />
                </section>
            </div>
        );
    }
}

export default MyTasks;
