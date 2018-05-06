import React, { Component } from 'react';
import List from '../templates/List';

const profile = JSON.parse(sessionStorage.getItem('profile'));

export default class PlantComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <List
                // openUpdate={this.props.openUpdate}
                dataSet={this.props.plants}
                sideBar={this.props.sideBar}
                name={'Plant'}
                openModal={this.props.openModal}
                object={profile.role == "1" ? null : objectPlantAdd}
                objectUpdate={profile.role == "1" ? null : objectPlantUpdate}
                openAlert={this.props.openAlert}
                getOnePlant={this.props.getOnePlant}
            />
        );
    }
}

var objectPlantAdd = {
    title: "ADD PLANT",
    property: [
        { name: "Name", placeholder: 'Please input name' },
        { name: "Description", placeholder: 'Please input description' },
    ]
};

var objectPlantUpdate = {
    title: "UPDATE PLANT",
    property: [
        { name: "Name", placeholder: 'Please input name' },
        { name: "Description", placeholder: 'Please input description' },
    ]
};