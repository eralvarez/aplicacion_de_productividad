import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from 'react-router-dom';

import './App.scss';
import Topbar from './shared/components/Topbar/Topbar';
import Header from './shared/components/Header/Header';

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="toolbar">
                    <Topbar />
                </div>

                <main className="main">
                    <Router>
                        
                    </Router>
                    {/* <Header /> */}
                </main>
            </div>
        );
    }
}

export default App;
