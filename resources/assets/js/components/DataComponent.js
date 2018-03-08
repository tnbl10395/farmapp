import React, { Component } from 'react';
import { Table } from '../templates/Table';

export default class DataComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getDataValues();
    }

    render() {
        return (
            this.props.dataSet.length>0? <Table dataSet={this.props.dataSet} columns={columns} sideBar={this.props.sideBar} name={"Data"}/> : null
        );
    }
}

var columns = [
    { title: "ID" },
    { title: "Device" },
    { title: "Humidity" },
    { title: "Temperature" },
    { title: "Latitude" },
    { title: "Longitude" },
    { title: "Date" },
    { title: "Status" },
    { title: "Action" },
];