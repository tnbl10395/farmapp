import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Devices from '../components/DevicesComponent';
import User from './UserComponent';
import { Element } from "../templates/Element";

export default class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div style={style.content}>
                    </div>
                    <div style={style.breadcrumb}>
                        <a style={style.tag_a}>Home</a> > Table
                    </div>
                    <Switch>
                        <Route exact path="/devices" component={Devices} />
                        <Route exact path="/user" component={User} />
                    </Switch>
                </div>
            </div>
        )
    }
}

var style = {
    content: {
        // backgroundColor: 'gray',
        position: 'fixed',
        left: 200,
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