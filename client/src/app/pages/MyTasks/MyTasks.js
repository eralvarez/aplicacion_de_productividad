import React from 'react';

import './MyTasks.scss';
import Header from '../../shared/components/Header/Header';
import CurrentTaskCard from './components/CurrentTaskCard/CurrentTaskCard';
import NewTaskCard from './components/NewTaskCard/NewTaskCard';

class MyTasks extends React.Component {
    render() {
        return (
            <div className="MyTasks">
                <Header title="My tasks" />
                <section className="card-section">
                    <CurrentTaskCard />
                    <NewTaskCard />
                </section>
            </div>
        );
    }
}

export default MyTasks;
