import React, { Component } from 'react';
var LineChart = require('react-chartjs').Line;

export class Chart extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div style={style.main_content} className="col-md-12 col-sm-12 col-12">
                <select>
                    {
                        array.forEach(item=>{
                            return <option>{item}</option>
                        })
                    }
                </select>
                <LineChart data={chartData} options={chartOptions} style={style.chart} height="100%" />
            </div>
        )
    }
}

var array = [
    {id:1,name:"device_1"},
    {id:2,name:"device_2"},
    {id:3,name:"device_3"},
    {id:4,name:"device_4"},
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
    scaleShowGridLines: false,
    scaleGridLineColor: "black",
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
    // maintainAspectRatio: false,
};

const style = {
    main_content: {
        color: 'black',
        backgroundColor: 'gray',
        position: 'absolute',
        padding: 10,
        left: '18%',
        top: 120,
        width: '80%',
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