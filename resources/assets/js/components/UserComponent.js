import React, { Component } from 'react';
import { Table } from '../templates/Table';
import List from '../templates/List';

export default class UserComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDataUsers();
    }

    render() {
        return (
            // this.props.dataSet.length > 0 ?
            //     <Table dataSet={this.props.dataSet}
            //         columns={columns}
            //         object={objectUser}
            //         openModal={this.props.openModal}
            //         sideBar={this.props.sideBar} name={"User"} />
            //     : null
            this.props.dataSet.length > 0 ?
            <List 
                dataSet={this.props.dataSet}
                object={objectUser}
                openModal={this.props.openModal}
                sideBar={this.props.sideBar} name={"User"} 
                openAlert={this.props.openAlert} 
                objectUpdate={objectUpdate}/>
            : null
        );
    }
}

var objectUser = {
    title: "ADD USER",
    property: [
        { name: "Username", placeholder: 'Please input username' },
        { name: "Password", placeholder: 'Please input password' },
        { name: "Full name", placeholder: 'Please input full name' },
        { name: "Address", placeholder: 'Please input address' },
        { name: "Phone", placeholder: 'Please input phone' },
        { name: "Role", role: [{ id: '0', name: "Admin" }, { id: '1', name: "User" }] },
    ]
};

var objectUpdate = {
    title: "UPDATE USER",
    property: [
        { name: "Username", placeholder: 'Please input username' },
        { name: "Password", placeholder: 'Please input password' },
        { name: "Full name", placeholder: 'Please input full name' },
        { name: "Address", placeholder: 'Please input address' },
        { name: "Phone", placeholder: 'Please input phone' },
        { name: "Role", role: [{ id: '0', name: "Admin" }, { id: '1', name: "User" }] },
    ]
};
// var columns = [
//     { title: "ID" },
//     { title: "Username" },
//     { title: "Full Name" },
//     { title: "Address" },
//     { title: "Phone" },
//     { title: "Action" },
// ];