import React, { Component } from 'react';
import { Table } from '../templates/Table';
import { Chart } from '../templates/Chart';
import List from '../templates/List';

export default class DataComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // this.props.getDataValuesonTable();
        this.timeout = setTimeout(() => {
            this.props.getRealDataOnChart(this.props.device, this.props.checkInterval);
        }, 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    render() {
        return (
            // this.props.dataSet.length > 0 ?
            //     <div>
                    <Chart
                        sideBar={this.props.sideBar}
                        change={this.props.changeDisplayDataScreen}
                        getOldDataOnChart={this.props.getOldDataOnChart}
                        getRealDataOnChart={this.props.getRealDataOnChart}
                        device={this.props.device}
                        date={this.props.date}
                        humidity={this.props.humidity}
                        temperature={this.props.temperature}
                        all_devices={this.props.all_devices}
                        changeInterval={this.props.changeInterval}
                        checkInterval={this.props.checkInterval}
                        interval={this.props.interval}
                        getRealDataOnChart={this.props.getRealDataOnChart}
                    />
                // </div>
                // : null
        );
    }
}

// var columns = [
//     { title: "ID" },
//     { title: "Device" },
//     { title: "Humidity" },
//     { title: "Temperature" },
//     { title: "Date" },
//     { title: "Status" },
//     { title: "Action" },
// ];