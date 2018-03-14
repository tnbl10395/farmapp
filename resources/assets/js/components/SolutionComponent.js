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
            this.props.dataSet.length>0? 
                <Table dataSet={this.props.dataSet} 
                        object={objectSolution}
                        openModal={this.props.openModal}
                        columns={columns} sideBar={this.props.sideBar} 
                        name={"Solution"}/> 
                : null

        );
    }
}

var objectSolution = {
    title: "ADD SOLUTION",
    property: [
        {name:"Temperature",placeholder:'Please input temperature'},
        {name:"Humidity", placeholder:'Please input humidity'},
        {name:"Solution", placeholder:'Please input solution'}
    ]
};

var columns = [
    { title: "ID" },
    { title: "Temperature" },
    { title: "Humidity" },
    { title: "Solution" },
    { title: "Updated Date" },
];