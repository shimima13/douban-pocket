import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Redirect, browserHistory } from 'react-router';
import Homepage from './comps/HomePage'
import ContentPage from './comps/ContentPage'
import '../less/style.css';
import store from './utils/store'
import PotentialError from './comps/PotentialError'
class App extends Component {
    componentDidMount() {
        const _this = this;
        this.unsbscribe = store.subscribe(() => {
            _this.forceUpdate()
        })
    }
    componentWillUnmount() {
        this.unsbscribe()
    }
    render() {
        return (
            <PotentialError>
                <div className="app">
                    <Route path="/" exact component={Homepage} />
                    <Route path="/home/:category" component={Homepage} />
                    <Route path="/content/:category/:resourceid" component={ContentPage} />
                </div>
            </PotentialError>
        );
    }

}

export default App;


