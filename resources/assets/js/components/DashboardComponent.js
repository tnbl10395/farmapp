import React, { Component } from 'react';
import { LineChartComponent } from '../templates/Chart';
import { MapWithAMarker } from '../templates/Map';

export default class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            humidity: true,
            temperature: true
        }
    }

    componentDidMount() {
        this.props.getRealDataOnChart(this.props.device, this.props.checkInterval);
        this.interval = setInterval(() => {
            this.props.getRealDataOnChart(this.props.device, this.props.checkInterval);
        }, 3600000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        return (
            <div style={style.body}>
                <div className="col-md-12">
                    {/* <div className="col-md-1" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                        <select className="form-control" style={{ backgroundColor: 'rgb(44, 62, 80)', color: '#fff', borderRadius: 3, height: 53 }}>
                            <option>Device_1</option>
                            <option>Device_2</option>
                        </select>
                        <select className="form-control" style={{ backgroundColor: 'rgb(44, 62, 80)', color: '#fff', borderRadius: 3, height: 53 }}>
                            <option>1 Hour</option>
                            <option>1 Day</option>
                        </select>
                    </div> */}
                    <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                        <InforDeviceComponent value={"Device_1"} name={"100003"} icon={"fa fa-cogs"} bgColor={"#e74c3c"} />
                    </div>
                    <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                        <CurrentValueComponent value={"27"} name={"Humidity"} icon={"fa fa-tint"} bgColor={"#00c0ef"} />
                    </div>
                    <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                        <CurrentValueComponent value={"27"} name={"Temperature"} icon={"fa fa-thermometer-empty"} bgColor={"#5cb85c"} />
                    </div>
                    <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                        <ClockComponent value={"00:00:00"} name={"2018-04-01"} icon={"fa fa-clock-o"} bgColor={"#5cb85c"} />
                    </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-9" style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                        <LineChartComponent stateHumidity={this.state.humidity}
                            stateTemperature={this.state.temperature}
                            propsHumidity={this.props.humidity}
                            propsTemperature={this.props.temperature}
                            checkInterval={this.props.checkInterval}
                            width={"600px"} height={"280px"} />
                    </div>
                    <div className="col-md-3" style={{ padding: 5 }}>
                        <MapWithAMarker
                            googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC4R6AN7SmujjPUIGKdyao2Kqitzr1kiRg&v=3.exp&libraries=geometry,drawing,places"
                            loadingElement={<div style={{ height: `100%` }} />}
                            containerElement={<div style={{ height: `380px`, paddingTop: 5 }} />}
                            mapElement={<div style={{ height: `100%` }} />}
                        />
                    </div>
                </div>
            </div >
        )
    }
}

class ClockComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ backgroundColor: this.props.bgColor, cursor: 'pointer' }}>
                <div style={styleBox.box}>
                    <h3 style={styleBox.value}>{this.props.value}</h3>
                    <p style={styleBox.textName}>{this.props.name}</p>
                </div>
                <div style={styleBox.boxIcon}>
                    <i className={this.props.icon} style={styleBox.icon} />
                </div>
            </div>
        )
    }
}

class InforDeviceComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="dropdown" style={{ backgroundColor: this.props.bgColor }}>
                <div style={styleBox.box}>
                    <h3 style={styleBox.value}>{this.props.value}</h3>
                    <p style={styleBox.textName}>{this.props.name}</p>
                </div>
                <div style={styleBox.boxIcon}>
                    <i className={this.props.icon} style={styleBox.icon} />
                </div>
                <a href="#" style={styleBox.boxFooter} data-toggle="dropdown">Choose devices <i className="fa fa-arrow-circle-right"/></a>
                <ul className="dropdown-menu" style={{ backgroundColor: this.props.bgColor, right: 0 }}>
                    <li ><a href="#">Device_1</a></li>
                    <li><a href="#">Device_2</a></li>
                    <li><a href="#">Device_3</a></li>
                </ul>
            </div>
        )
    }
}

class CurrentValueComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ backgroundColor: this.props.bgColor }}>
                <div style={styleBox.box}>
                    <h3 style={styleBox.value}>{this.props.value}</h3>
                    <p style={styleBox.textName}>{this.props.name}</p>
                </div>
                <div style={styleBox.boxIcon}>
                    <i className={this.props.icon} style={styleBox.icon} />
                </div>
            </div>
        )
    }
}

class RealChartComponent extends React.Component {

}

const style = {
    body: {
        position: 'absolute',
        top: 50,
        right: 10,
        left: 10,
        backgroundColor: '#fff',
        borderTop: '4px #2ab27b solid',
        borderRadius: 5,
    },
}

const styleBox = {
    box: {
        padding: 10,
        color: 'white',
    },
    value: {
        fontSize: 38,
        fontWeight: 'bold',
        margin: '0px 0px 10px 20px',
        whiteSpace: 'nowrap',
        zIndex: 5
    },
    textName: {
        fontSize: 15,
        margin: '0px 0px 15px 20px'
    },
    boxIcon: {
        transition: 'all .3s linear',
        position: 'absolute',
        top: -10,
        right: 30,
        zIndex: 0,
        fontSize: 65,
        color: 'rgba(0,0,0,0.15)'
    },
    icon: {
        display: 'inline-block',
        fontSize: 'inherit',
        textRendering: 'auto',
        fontSmoothing: 'antialiased'
    },
    boxFooter: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        textAlign: 'center',
        padding: '2px 0',
        color: '#fff',
        color: 'rgba(255,255,255,0.8)',
        display: 'block',
        zIndex: 10,
        background: 'rgba(0,0,0,0.1)',
        textDecoration: 'none'
    }
}