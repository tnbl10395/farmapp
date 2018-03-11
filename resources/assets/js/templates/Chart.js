import React, { Component } from 'react';
var Datetime = require('react-datetime');
var LineChart = require('react-chartjs').Line;

export class Chart extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // this.props.getRealDataOnChart(this.props.device,this.props.date);
    }

    chooseDevice(option) {
        console.log(option.target.value);
    }

    chooseInterval(option) {
        console.log(option.target.value);
    }

    chooseDate(option) {
        var time = new Date(option._d);
        if (parseInt(time.getDate()) < 10) {
            var dd = '0' + time.getDate();
        } else {
            var dd = time.getDate();
        }
        if (parseInt(time.getMonth()) < 10) {
            var mm = time.getMonth() + 1;
            var mm = "0" + mm;
        } else {
            var mm = time.getMonth() + 1;
        }
        var yyyy = time.getFullYear();
        if (parseInt(time.getHours()) < 10) {
            var HH = '0' + time.getHours();
        } else {
            var HH = time.getHours();
        }
        var date = yyyy + '-' + mm + '-' + dd + ' ' + HH;
        this.props.getOldDataOnChart(this.props.device, date);
    }

    render() {
        var array = this.props.all_devices;
        var chartData = {
            labels: labelHour(),
            datasets: [
                {
                    label: "My First dataset",
                    fillColor: "rgba(39, 174, 96,0.2)",
                    strokeColor: "green",
                    pointColor: "green",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "green",
                    data: this.props.humidity
                },
                {
                    label: "My Second dataset",
                    fillColor: "rgba(52, 152, 219,0.2)",
                    strokeColor: "blue",
                    pointColor: "blue",
                    pointStrokeColor: "#fff",
                    pointHighlightFill: "#fff",
                    pointHighlightStroke: "blue",
                    data: this.props.temperature
                }
            ]
        };
        return (
            <div style={this.props.sideBar ? style.main_content_true : style.main_content_false}>
                <div style={style.button_div}>
                    <button
                        // onClick={() => this.props.change()}
                        className="btn btn-success"
                        style={{ position: 'absolute', right: 80, top: 5, fontSize: 12 }}>Export</button>
                    <button
                        onClick={() => this.props.change()}
                        className="btn btn-success"
                        style={{ position: 'absolute', right: 10, top: 5, fontSize: 12 }}>Table</button>
                </div>
                <hr style={{ opacity: 0.2, marginTop: 0, marginBottom: 0 }} />
                <div>
                    <div className="col-sx-2 col-sm-2 col-md-2">
                        <div className="form-group">
                            <h5 style={{ fontWeight: 'bold' }}>Interval</h5>
                            <select className="form-control"
                                onChange={(option) => this.chooseInterval(option)}>
                                {
                                    interval.map(element => {
                                        return <option key={element.id} value={element.name}>{element.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <h5 style={{ fontWeight: 'bold' }}>Time</h5>
                        <div className="form-group">
                            <Datetime
                                input={false}
                                timeFormat={"HH"}
                                isValidDate={valid}
                                onChange={(option) => this.chooseDate(option)} />
                        </div>
                        <div className="form-group">
                            <h5 style={{ fontWeight: 'bold' }}>Devices</h5>
                            <select className="form-control"
                                value={this.props.device}
                                onChange={(device) => this.props.getOldDataOnChart(device.target.value, this.props.date)}>
                                {
                                    array.map(element => {
                                        return <option key={element.id} value={element.id}>{element.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-sx-10 col-sm-10 col-md-10">
                        <LineChart data={chartData} options={chartOptions} style={style.chart} height="100%" />
                    </div>
                </div>
            </div>
        )
    }
}

var today = Datetime.moment();
var valid = function (current) {
    return current.isBefore(today);
};

var interval = [
    { id: 1, name: "1 Hour" },
    { id: 2, name: "1 Day" },
]

const labelHour = () => {
    var array = [];
    for (var i = 0; i < 60; i++) {
        array.push(i);
    }
    return array;
}

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
    pointDotRadius: 3,
    pointDotStrokeWidth: 1,
    pointHitDetectionRadius: 20,
    datasetStroke: true,
    datasetStrokeWidth: 2,
    datasetFill: true,
    offsetGridLines: false,
    responsive: true,
    animation: false
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
        boxShadow: "1px 7px 3px black",
    },
    main_content_false: {
        color: 'black',
        backgroundColor: '#9E9E9E',
        position: 'absolute',
        padding: 10,
        left: '11%',
        top: 120,
        width: '88%',
        fontSize: 12,
        opacity: 0.8,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "1px 7px 3px black",
    },
    chart: {
        marginTop: 40,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 2,
    },
    button_div: {
        height: 35,
    }
}