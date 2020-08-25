import React from 'react';

import './CompletedTasks.scss';
import Header from '../../shared/components/Header/Header';
import CompletedTasksTable from './components/CompletedTasksTable/CompletedTasksTable';

class CompletedTasks extends React.Component {
    constructor() {
        super();
        this.state = {
            tasks: []
        };
    }

    render() {
        return (
            <div className="CompletedTasks">
                <Header title="Completed tasks" />

                <section className="card-section">
                    <CompletedTasksTable />
                </section>
            </div>
        );
    }
}

export default CompletedTasks;
