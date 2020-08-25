import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './App.scss';
import Topbar from './shared/components/Topbar/Topbar';
import MyTasks from './pages/MyTasks/MyTasks';
import CompletedTasks from './pages/CompletedTasks/CompletedTasks';
import Analytics from './pages/Analytics/Analytics';

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="toolbar">
                        <Topbar />
                    </div>

                    <main className="main">
                        <Switch>
                            <Route exact path="/">
                                <MyTasks />
                            </Route>
                            <Route path="/analytics">
                                <Analytics />
                            </Route>
                            <Route path="/completed-tasks">
                                <CompletedTasks />
                            </Route>
                            <Route path="*">
                                <MyTasks />
                            </Route>
                        </Switch>
                    </main>
                </div>
            </Router>
        );
    }
}

export default App;
