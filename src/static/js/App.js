import React, { Component, Suspense } from 'react';
import { BrowserRouter as Router, Route, HashRouter } from 'react-router-dom';
import Main from './component/Main';
import '../css/App.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        return (
            <HashRouter>
                <Route exact path='/' component={() => <Main/>}/>
            </HashRouter>
        );
    }
}


export default App;