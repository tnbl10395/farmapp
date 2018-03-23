import React, { Component } from 'react';
import { Table } from "../templates/Table";
import List from '../templates/List';

export default class DevicesComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDataDevices();
    }

    render() {
        return (
            // this.props.dataSet.length>0? 
            //     <Table dataSet={this.props.dataSet} 
            //             columns={columns} 
            //             sideBar={this.props.sideBar} 
            //             name={'Device'}
            //             openModal={this.props.openModal}
            //             object={profile.role == "1" ? objectDeviceAdmin : objectDeviceUser}
            //             /> 
            //     : null
            this.props.dataSet.length>0? 
            <List
                dataSet={this.props.dataSet}
                sideBar={this.props.sideBar}
                name={'Device'}
                openModal={this.props.openModal}
                object={profile.role == "1" ? objectDeviceAdmin : objectDeviceUser}
                openAlert={this.props.openAlert}
            />
            : null
        );
    }
}

const profile = JSON.parse(sessionStorage.getItem('profile'));

var objectDeviceAdmin = {
    title: "ADD DEVICE",
    property: [
        { name: "Name", placeholder: 'Please input name' },
        { name: "Code", placeholder: 'Please input code' },
        { name: "Manufacturing Date", placeholder: 'Please input Manufacturing Date' }
    ]
};

var objectDeviceUser = {
    title: "ADD DEVICE",
    property: [
        { name: "Code", placeholder: 'Please input code' },
    ]
};

// var columns = [
//     { title: "Code" },
//     { title: "Name" },
//     { title: "Manufacturing Date" },
//     { title: "Status" },
//     { title: "Updated Date" },
//     { title: "Action" }
// ];

