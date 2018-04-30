import React, { Component } from 'react';
import { Route, Switch } from "react-router-dom";
import Dashboard from '../containers/Dashboard2Container';
import Devices from '../containers/DevicesContainer';
import User from '../containers/UserContainer';
import Data from '../containers/DataContainer';
import Plant from '../containers/PlantContainer';
import { HashRouter } from 'react-router-dom';
import List from '../templates/List';

export default class Content extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={!this.props.sideBar ? style.content_true : style.content_false}>
                <div className="row">
                    <div className="row">
                        <div style={style.breadcrumb}>
                            <div className="pull-right">
                                <a style={style.tag_a}><i className="fa fa-tachometer" style={{ marginRight: 10 }} />Home</a><span style={style.go}>></span> {this.props.breadcrumb}
                            </div>
                        </div>
                    </div>
                    <Switch>
                        <Route exact path="/" component={Dashboard} />
                        <Route exact path="/device" component={Devices} />
                        {
                            this.props.profile.role == "1" ?
                                <Route exact path="/user" component={User} />
                                : null
                        }
                        <Route exact path="/data" component={Data} />
                        <Route exact path="/plant" component={Plant} />
                    </Switch>
                </div>
            </div>

        )
    }
}

var style = {
    // content_true: {
    //     position: 'absolute',
    //     left: 185,
    //     top: 50,
    //     right: 0,
    //     bottom: 0,
    //     backgroundColor: '#ecf0f5',
    //     fontFamily: 'Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif',
    //     // opacity: 0.7
    // },
    content_false: {
        position: 'absolute',
        left: 20,
        bottom: 10,
        top: 105,
        right: 20,
        // opacity: 0.7
        backgroundColor: '#ecf0f5',
        fontFamily: 'Source Sans Pro, Helvetica Neue, Helvetica, Arial, sans-serif',
    },
    breadcrumb: {
        position: 'absolute',
        top: 15,
        right: 40,
        left: 10,
        color: '#777',
        fontSize: 12,
    },
    head: {
        fontSize: 25,
        color: '#000',
        fontFamily: 'Source Sans Pro, sans-serif'
    },
    tag_a: {
        cursor: 'pointer',
        fontSize: 12,
        color: '#444',
        textDecoration: 'none',
        fontWeight: 800
    },
    go: {
        margin: '0px 10px 0px 10px',
        color: '#97a0b3'
    }
}