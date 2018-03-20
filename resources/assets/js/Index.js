import React, { Component } from 'react';

import Index from './containers/IndexContainer';
import Login from './containers/LoginContainer';

import { Route, Redirect } from 'react-router-dom';

const token = sessionStorage.getItem('token');

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.checkToken(token);
    }

    render() {
        return (
            <div>
                <Route exact path="/" component={this.props.token_expired? Index : Login} />
            </div>
        );
    }
}