import React, { Component } from 'react';
import { Table } from "../templates/Table";

export default class DevicesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDataDevices();
    }

    render() {
        return (
            this.props.dataSet.length>0? 
                <Table dataSet={this.props.dataSet} 
                        columns={columns} 
                        sideBar={this.props.sideBar} 
                        name={'Device'}
                        openModal={this.props.openModal}
                        object={objectDevice}
                        /> 
                : null
        );
    }
}

var objectDevice = {
    title: "ADD DEVICE",
    property: [
        {name:"Name",placeholder:'Please input name'},
        {name:"Manufacturing Date", placeholder:'Please input Manufacturing Date'}
    ]
};

var columns = [
    { title: "ID" },
    { title: "Name" },
    { title: "Manufacturing Date" },
    { title: "Status" },
    { title: "Updated Date" },
    { title: "Action" }
];

