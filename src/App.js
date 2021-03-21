import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import './App.css';

import Cover from './cover';
import Welcome from './welcome';
import Intro from './intro';
import Play from './play';

class App extends Component {
    render() {
        console.log(process.env);
        return (
            <BrowserRouter>
                <div className="App">
                    <Route exact path={`${process.env.PUBLIC_URL}/`} component={Cover} />
                    <Route path={`${process.env.PUBLIC_URL}/welcome`} component={Welcome} />
                    <Route path={`${process.env.PUBLIC_URL}/intro`} component={Intro} />
                    <Route path={`${process.env.PUBLIC_URL}/play/:level`} render={props => <Play match={props.match} />} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
