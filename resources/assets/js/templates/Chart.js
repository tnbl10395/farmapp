import React, { Component } from 'react';
var LineChart = require('react-chartjs').Line;

export class Chart extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={this.props.sideBar ? style.main_content_true : style.main_content_false}>
                <div className="col-sx-2 col-sm-2 col-md-2">
                    <div className="form-group">
                        <h4 for="sel1">Devices</h4>
                        <select className="form-control" id="sel1">
                            {
                                array.map(element => {
                                    return <option id={element.id}>{element.name}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="col-sx-10 col-sm-10 col-md-10">
                    <LineChart data={chartData} options={chartOptions} style={style.chart} redraw height="150" width="400"/>
                </div>
            </div>
        )
    }
}

var array = [
    { id: 1, name: "device_1" },
    { id: 2, name: "device_2" },
    { id: 3, name: "device_3" },
    { id: 4, name: "device_4" },
]

var chartData = {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(39, 174, 96,0.2)",
            strokeColor: "green",
            pointColor: "green",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "green",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(52, 152, 219,0.2)",
            strokeColor: "blue",
            pointColor: "blue",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "blue",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
    ]
};

var chartOptions = {
    scaleFontColor: "black",
    scaleShowGridLines: true,
    scaleGridLineColor: "#9E9E9E",
    scaleGridLineWidth: 1,
    scaleShowHorizontalLines: true,
    scaleShowVerticalLines: true,
    bezierCurve: true,
    bezierCurveTension: 0.4,
    pointDot: true,
    pointDotRadius: 4,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    offsetGridLines: false,
    responsive: true,
    // maintainAspectRatio: true,
};

const style = {
    main_content_true: {
        color: 'black',
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        padding: 10,
        left: '16%',
        top: 120,
        width: '83%',
        fontSize: 12,
        opacity: 0.8,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "1px 7px 3px black"
    },
    main_content_false: {
        color: 'black',
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        padding: 10,
        left: '4%',
        top: 120,
        width: '95%',
        fontSize: 12,
        opacity: 0.8,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "1px 7px 3px black"
    },
    chart: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 2,
    }
}