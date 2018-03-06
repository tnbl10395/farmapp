import React, { Component } from 'react';
import { Chart } from "../templates/Chart";

export default class UserComponent extends React.Component {
    constructor(props){
        super(props);
    }
    render() {
        return (
            <Chart sideBar={this.props.sideBar}/>
        );
    }
}