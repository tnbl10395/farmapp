import React, { Component } from 'react';
import { Table } from '../templates/Table';

export default class UserComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getDataUsers();
    }

    render() {
        return (
            this.props.dataSet.length>0? <Table dataSet={this.props.dataSet} columns={columns} sideBar={this.props.sideBar} name={"User"}/> : null
        );
    }
}

var columns = [
    { title: "ID" },
    { title: "Username" },
    { title: "Full Name" },
    { title: "Address" },
    { title: "Phone" },
    { title: "Action" },
];