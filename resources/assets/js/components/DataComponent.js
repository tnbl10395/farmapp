import React, { Component } from 'react';
import { Table } from '../templates/Table';
import { Chart } from '../templates/Chart';

export default class DataComponent extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getDataValuesonTable();
        setTimeout(() => {
            this.props.getRealDataOnChart(this.props.device, this.props.checkInterval);
        }, 1000);
    }

    render() {
        return (
            this.props.dataSet.length > 0 ?
                <div>
                    {
                        this.props.table ?
                            <Table
                                dataSet={this.props.dataSet}
                                columns={columns}
                                sideBar={this.props.sideBar}
                                name={"Data"}
                                change={this.props.changeDisplayDataScreen} />
                            :
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
                    }
                </div>
                : null
        );
    }
}

var columns = [
    { title: "ID" },
    { title: "Device" },
    { title: "Humidity" },
    { title: "Temperature" },
    { title: "Date" },
    { title: "Status" },
    { title: "Action" },
];