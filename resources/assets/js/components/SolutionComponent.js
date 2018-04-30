import React, { Component } from 'react';
import List from '../templates/List';

export default class SolutionComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.getDataSolutions();
    }

    render() {
        return (
            <List
                dataSet={this.props.dataSet}
                sideBar={this.props.sideBar}
                name={'Solution'}
                openModal={this.props.openModal}
                object={objectSolution}
                objectUpdate={objectUpdateSolution}
                openAlert={this.props.openAlert}
            />
        );
    }
}

var objectSolution = {
    title: "ADD SOLUTION",
    property: [
        { name: "Plant", select: [{ id: '1', name: "Rice" }, { id: '0', name: "Potato" }]},
        { name: "Temperature", placeholder: 'Please input temperature' },
        { name: "Humidity", placeholder: 'Please input humidity' },
        { name: "Solution", placeholder: 'Please input solution' },
    ]
};

var objectUpdateSolution = {
    title: "UPDATE SOLUTION",
    property: [
        { name: "Plant", placeholder: 'Please choose plant'},
        { name: "Temperature", placeholder: 'Please input temperature' },
        { name: "Humidity", placeholder: 'Please input humidity' },
        { name: "Solution", placeholder: 'Please input solution' }
    ]
};
// var columns = [
//     { title: "ID" },
//     { title: "Temperature" },
//     { title: "Humidity" },
//     { title: "Solution" },
//     { title: "Updated Date" },
// ];