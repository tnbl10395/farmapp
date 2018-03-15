import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Devices from '../containers/DevicesContainer';
import User from '../containers/UserContainer';
import Data from '../containers/DataContainer';
import Solution from '../containers/SolutionContainer';
import { HashRouter } from 'react-router-dom';


export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
                <div>
                    <div style={this.props.sideBar ? style.content_true : style.content_false}>
                    </div>
                    <div style={style.breadcrumb}>
                        {/* <a style={style.tag_a}>Home</a> > Table */}
                    </div>
                    <Switch>
                        <Route exact path="/" component={Devices} />
                        <Route exact path="/device" component={Devices} />
                        <Route exact path="/user" component={User} />
                        <Route exact path="/data" component={Data} />
                        <Route exact path="/solution" component={Solution} />
                    </Switch>
                </div>

        )
    }
}

var style = {
    content_true: {
        position: 'fixed',
        left: 200,
        width: '100%',
        height: '100%',
        top: 60,
        opacity: 0.7
    },
    content_false: {
        position: 'fixed',
        left: 40,
        width: '100%',
        height: '100%',
        top: 60,
        opacity: 0.7
    },
    breadcrumb: {
        position: 'absolute',
        // right: '100%',
        right: 40,
        top: 80,
        color: 'white',
        fontSize: 20,
    },
    tag_a: {
        cursor: 'pointer',
        fontSize: 20,
        color: 'green',
        textDecoration: 'none',
        fontWeight: 800

    },
    sideBar: {
        position: 'fixed',
        backgroundColor: 'black',
        top: 60,
        left: 0,
        width: 220,
        height: '100%',
        float: 'left',
        opacity: 0.8,
        zIndex: 1,
    },
    div_ul: {
        listStyle: 'none',
    },
}