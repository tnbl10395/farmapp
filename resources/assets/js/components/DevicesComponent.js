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
            <List
                // openUpdate={this.props.openUpdate}
                dataSet={this.props.dataSet}
                sideBar={this.props.sideBar}
                name={'Device'}
                openModal={this.props.openModal}
                object={profile.role == "1" ? objectDeviceAdmin : objectDeviceUser}
                objectUpdate={profile.role == "1" ? objectUpdateDeviceAdmin : objectUpdateDeviceUser}
                openAlert={this.props.openAlert}
            />
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

var objectUpdateDeviceAdmin = {
    title: "UPDATE DEVICE",
    property: [
        { name: "Name", placeholder: 'Please input name' },
        { name: "Code", placeholder: 'Please input code' },
        { name: "Manufacturing Date", placeholder: 'Please input Manufacturing Date' }
    ]
};

var objectUpdateDeviceUser = {
    title: "UPDATE DEVICE",
    property: [
        { name: "Code", placeholder: 'Please input code' },
    ]
};

