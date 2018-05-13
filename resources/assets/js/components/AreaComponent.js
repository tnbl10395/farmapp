import React, { Component } from 'react';
import List from '../templates/List';

export default class AreaComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getListArea();
    }

    render() {
        return (
            <List
                dataSet={this.props.dataSet}
                sideBar={this.props.listArea}
                name={'Area'}
                object={object}
                openModal={this.props.openModal}
                openAlert={this.props.openAlert}
            />
        );
    }
}

var object = {
    title: "ADD AREA",
}