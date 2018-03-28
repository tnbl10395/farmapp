import React, { Component } from 'react';

export default class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ position: 'absolute', top: 50, right: 0, left: 0, backgroundColor: 'red' }}>
                <div className="col-xs-offset-1 col-sm-offset-1 col-md-offset-1">
                    <div className="col-sm-6 col-md-3">Humidity</div>
                    <div className="col-sm-6 col-md-3">Temperature</div>
                    <div className="col-sm-6 col-md-3">Latitude</div>
                    <div className="col-sm-6 col-md-3">Longitude</div>
                </div>
            </div>
        )
    }
}