import React, { Component } from 'react';
import { LineChartComponent } from '../templates/Chart';
import { MapWithAMarker } from '../templates/Map';
import Loader from '../templates/Loader';

export default class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            height: 0,
        }
    }

    componentDidMount() {
        // this.props.getRealDataOnChart(this.props.device, this.props.inverval);
        this.timeoutRealTime = setTimeout(() => {
            this.props.getRealDataOnChart(this.props.device, this.props.interval);
        }, 1500);
        this.timeoutGetDevice = setTimeout(() => {
            this.props.getOneDevice(this.props.device)
        }, 1500);
        this.timeoutGetCurrentData = setTimeout(() => {
            this.props.getCurrentData(this.props.device);
        }, 1500);
        this.timeoutGetLocation = setTimeout(() => {
            this.props.getOneLocation(this.props.device);
        }, 1500);
    }

    componentWillUnmount() {
        clearTimeout(this.timeoutRealTime);
        clearTimeout(this.timeoutGetDevice);
        clearTimeout(this.timeoutGetCurrentData);
        clearTimeout(this.timeoutGetLocation);
    }

    render() {
        return (
            this.props.device != null && this.props.name != null && this.props.code != null && this.props.latitude != null && this.props.longitude != null
                ?
                <div style={style.body}>
                    <div className="col-md-12">
                        <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                            <InforDeviceComponent listDevice={this.props.all_devices}
                                getCurrentData={this.props.getCurrentData}
                                getOneLocation={this.props.getOneLocation}
                                device={this.props.device}
                                interval={this.props.interval}
                                getOneDevice={this.props.getOneDevice}
                                getRealDataOnChart={this.props.getRealDataOnChart}
                                name={this.props.name}
                                code={this.props.code}
                                icon={"fa fa-cogs"}
                                bgColor={"#e74c3c"} />
                        </div>
                        <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                            <CurrentValueComponent value={this.props.currentHumidity}
                                device={this.props.device}
                                interval={this.props.interval}
                                intervalTime={this.props.intervalTime}
                                getCurrentData={this.props.getCurrentData}
                                name={"Humidity"}
                                icon={"fa fa-tint"}
                                bgColor={"#00c0ef"} />
                        </div>
                        <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                            <CurrentValueComponent value={this.props.currentTemperature}
                                device={this.props.device}
                                interval={this.props.interval}
                                intervalTime={this.props.intervalTime}
                                getCurrentData={this.props.getCurrentData}
                                name={"Temperature"}
                                icon={"fa fa-thermometer-empty"}
                                bgColor={"#5cb85c"} />
                        </div>
                        <div className="col-md-3" style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                            <ClockComponent
                                bgColor={"#f6b93b"}
                                changeInterval={this.props.changeInterval}
                                getRealDataOnChart={this.props.getRealDataOnChart}
                                interval={this.props.interval}
                                device={this.props.device} />
                        </div>
                    </div>
                    {
                        this.props.latitude == 0 && this.props.longitude == 0
                            ? <div className="col-md-12">
                                <div style={{ paddingTop: 5, paddingLeft: 5, paddingRight: 5 }}>
                                    <div style={styleBox.alert}>
                                        <h4><i className="icon fa fa-warning" /> Your device has problem!</h4>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    <div className="col-md-12">
                        <div className="col-md-9" style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                            <ChartComponent humidity={this.props.humidity}
                                temperature={this.props.temperature}
                                intervalTime={this.props.intervalTime}
                                interval={this.props.interval}
                                getRealDataOnChart={this.props.getRealDataOnChart}
                                device={this.props.device} />
                        </div>
                        <div className="col-md-3" style={{ padding: 5 }}>
                            <MapWithAMarker
                                latitude={this.props.latitude}
                                longitude={this.props.longitude}
                                getOneLocation={this.props.getOneLocation}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_aFLX1tVABBgvwYQ1mZzr3ApJVU5_YwA&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `400px`, paddingTop: 5 }} />}
                                mapElement={<div style={{ height: `100%` }} />}
                            />
                        </div>
                    </div>
                </div >
                :
                <div style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Loader />
                </div>
        )
    }
}

class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            humidity: true,
            temperature: true
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.getRealDataOnChart(this.props.device, this.props.interval);
        }, this.props.intervalTime)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <LineChartComponent stateHumidity={this.state.humidity}
                stateTemperature={this.state.temperature}
                propsHumidity={this.props.humidity}
                propsTemperature={this.props.temperature}
                checkInterval={this.props.interval}
                width={"600px"} height={"280px"} />
        )
    }
}

class ClockComponent extends React.Component {
    constructor(props) {
        super(props);
        var time = new Date();
        this.state = {
            date: (time.getDate() < 10 ? "0" : "") + time.getDate(),
            month: getMonth(time.getMonth()),
            year: time.getFullYear(),
            hour: (time.getHours() < 10 ? "0" : "") + time.getHours(),
            minute: (time.getMinutes() < 10 ? "0" : "") + time.getMinutes(),
            second: (time.getSeconds() < 10 ? "0" : "") + time.getSeconds(),
        }
    }

    componentDidMount() {
        this.intervalDate = setInterval(() => {
            var time = new Date();
            this.setState({
                date: (time.getDate() < 10 ? "0" : "") + time.getDate(),
                month: getMonth(time.getMonth()),
                year: time.getFullYear(),
                hour: (time.getHours() < 10 ? "0" : "") + time.getHours(),
                minute: (time.getMinutes() < 10 ? "0" : "") + time.getMinutes(),
                second: (time.getSeconds() < 10 ? "0" : "") + time.getSeconds(),
            });
        }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.intervalDate);
    }

    changeInterval() {
        this.props.changeInterval(!this.props.interval, this.props.device);
    }

    render() {
        return (
            <div style={{ backgroundColor: this.props.bgColor, cursor: 'pointer' }} onClick={() => this.changeInterval()}>
                <div style={styleBox.box}>
                    <h3 style={styleBox.value}>
                        {
                            !this.props.interval
                                ? this.state.hour + ':' + this.state.minute + ':' + this.state.second
                                : this.state.year + '-' + this.state.month + '-' + this.state.date
                        }
                    </h3>
                    <p style={styleBox.textName}>
                        {
                            !this.props.interval
                                ? this.state.year + '-' + this.state.month + '-' + this.state.date
                                : this.state.hour + ':' + this.state.minute + ':' + this.state.second
                        }
                    </p>
                </div>
                <div style={styleBox.boxIcon}>
                    <i className={!this.props.interval ? "fa fa-clock-o" : "fa fa-calendar"} style={styleBox.icon} />
                </div>
            </div>
        )
    }
}

class InforDeviceComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    chooseDevice(id) {
        this.props.getOneDevice(id);
        this.props.getRealDataOnChart(id, this.props.interval);
        this.props.getCurrentData(id);
        this.props.getOneLocation(id);
    }

    render() {
        return (
            this.props.name != null && this.props.code
                ? <div className="dropdown" style={{ backgroundColor: this.props.bgColor }}>
                    <div style={styleBox.box}>
                        <h3 style={styleBox.value}>{this.props.name}</h3>
                        <p style={styleBox.textName}>{this.props.code}</p>
                    </div>
                    <div style={styleBox.boxIcon}>
                        <i className={this.props.icon} style={styleBox.icon} />
                    </div>
                    <a href="#" style={styleBox.boxFooter} data-toggle="dropdown">Choose devices <i className="fa fa-arrow-circle-right" /></a>
                    <ul className="dropdown-menu" style={{ backgroundColor: this.props.bgColor, right: 0 }}>
                        {
                            this.props.listDevice.map(element => {
                                return <li key={element.id}><a onClick={() => this.chooseDevice(element.id)} style={{ cursor: 'pointer' }}>{element.name}</a></li>
                            })
                        }
                    </ul>
                </div>
                : null
        )
    }
}

class CurrentValueComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.props.getCurrentData(this.props.device);
        }, this.props.intervalTime)
    }

    componentWillUnmount() {
        clearInterval(this.interval)
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

const getMonth = (month) => {
    let array = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
    return array[month];
}

const style = {
    body: {
        position: 'absolute',
        top: 50,
        right: 10,
        left: 10,
        backgroundColor: '#fff',
        borderTop: '4px #5cb85c solid',
        borderRadius: 5,
    },
}

const styleBox = {
    box: {
        padding: 10,
        color: 'white',
    },
    value: {
        fontSize: 28,
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
    },
    alert: {
        borderRadius: 3,
        margin: '5px 0px 0px 0px',
        padding: '15px 30px 15px 15px',
        borderLeft: '10px solid #eee',
        // borderRight: '2px solid #c23321',
        // borderTop: '2px solid #c23321',
        // borderBottom: '2px solid #c23321',
        borderColor: '#c23321',
        backgroundColor: '#ff7675',
        color: '#fff',
    }
}