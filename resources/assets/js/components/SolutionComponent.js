import React, { Component } from 'react';

export default class SolutionComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.props.getDataSolutions();
    }

    render() {
        return (
            this.props.dataSet.length>0? <Table dataSet={this.props.dataSet} columns={columns} sideBar={this.props.sideBar} name={"Solution"}/> : null
        );
    }
}

var columns = [
    { title: "ID" },
    { title: "Temperature" },
    { title: "Humidity" },
    { title: "Solution" },
    { title: "Updated Date" },
];