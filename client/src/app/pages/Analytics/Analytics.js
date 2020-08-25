import React from 'react';

import './Analytics.scss';
import Header from '../../shared/components/Header/Header';
// import CurrentTaskCard from './components/CurrentTaskCard/CurrentTaskCard';
// import NewTaskCard from './components/NewTaskCard/NewTaskCard';
// import TasksTable from './components/TasksTable/TasksTable';
import ProductivityChart from './components/ProductivityChart/ProductivityChart';

class Analytics extends React.Component {

    render() {
        return (
            <div className="Analytics">
                <Header title="Analytics" />
                <section className="card-section">
                    <ProductivityChart />
                </section>
            </div>
        );
    }
}

export default Analytics;
