import React, { Component } from 'react';

import Index from './containers/IndexContainer';
import Login from './containers/LoginContainer';

import { Route, Redirect } from 'react-router-dom';

const token = sessionStorage.getItem('token');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {
                    <Route path="/" component={token!=null ? Index : Login} />
                }
                {/* <Route path="/login" component={Login} /> */}
            </div>
        );
    }
}