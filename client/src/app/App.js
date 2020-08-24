import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from 'react-router-dom';

import './App.scss';
import Topbar from './shared/components/Topbar/Topbar';
import Header from './shared/components/Header/Header';
import MyTasks from './pages/MyTasks/MyTasks';

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
                                <Header title="analytics" />
                            </Route>
                            <Route path="/archive">
                                <Header title="archive" />
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
