import React, { Component } from 'react';
import List from '../templates/List';

export default class SolutionComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getDataSolutions();
    }

    render() {
        return (
            // this.props.dataSet.length>0? 
            //     <Table dataSet={this.props.dataSet} 
            //             object={objectSolution}
            //             openModal={this.props.openModal}
            //             columns={columns} sideBar={this.props.sideBar} 
            //             name={"Solution"}/> 
            //     : null
            <List
                // openUpdate={this.props.openUpdate}
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
        { name: "Temperature", placeholder: 'Please input temperature' },
        { name: "Humidity", placeholder: 'Please input humidity' },
        { name: "Solution", placeholder: 'Please input solution' }
    ]
};

var objectUpdateSolution = {
    title: "UPDATE SOLUTION",
    property: [
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