import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
var Datetime = require('react-datetime');
import { MapWithAMarker } from '../templates/Map';
import { LineChartComponent } from '../templates/Chart';

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))

export default class Dashboard2Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
        }
    }

    componentWillMount() {
        this.timeout = setTimeout(() => {
            this.props.getDetailInformationDevice(this.props.deviceFirst);
        }, 1000);
        this.timeoutRealTime = setTimeout(() => {
            this.props.getRealDataOnChart(this.props.device, this.props.interval);
        }, 1500);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    openModal() {
        this.setState({
            isModal: true,
        });
    }

    closeModal() {
        this.setState({
            isModal: false,
        });
    }

    render() {
        return (
            <div style={style.body}>
                <div className="col-md-3" style={style.main}>
                    <Block openModal={this.openModal.bind(this)}
                        listDevice={this.props.all_devices}
                        data={this.props.notificationData}
                        getNotification={this.props.getNotification}
                        chooseOptionShowDevices={this.props.chooseOptionShowDevices}
                        showDevicesByGrid={this.props.showDevicesByGrid}
                        showDevicesByList={this.props.showDevicesByList}
                        showDevicesByMap={this.props.showDevicesByMap} />
                </div>
                <div className="col-md-6" style={style.main}>
                    <Main phases={this.props.dashboardPhases}
                        totalDaysOfPhase={this.props.dashboardTotalDaysOfPhases}
                        humidity={this.props.humidity}
                        temperature={this.props.temperature}
                        intervalTime={this.props.intervalTime}
                        interval={this.props.interval}
                        getRealDataOnChart={this.props.getRealDataOnChart}
                        device={this.props.device} />
                </div>
                <div className="col-md-3" style={style.main}>
                    <Notification plant={this.props.dashboardPlant}
                        notificationSolution={this.props.notificationSolution}
                        deviceId={this.props.notificationDeviceId}
                        message={this.props.notificationMessage}
                        datetime={this.props.notificationDatetime}
                        listDevice={this.props.all_devices} />
                </div>
                {this.state.isModal ? <Form closeModal={this.closeModal.bind(this)} /> : null}
            </div>
        )
    }
}

const style = {
    body: {
        position: 'absolute',
        top: 45,
        right: 0,
        left: 0,
        bottom: 0,
        backgroundColor: '#fff',
        // borderTop: '4px #5cb85c solid',
    },
    main: {
        position: 'relative',
        padding: 5,
        height: '100%',
    },
    title: {
        width: '100%',
        display: 'inline-block',
        // backgroundColor: '#32c5d2',
        color: '#2f353b',
        margin: 0,
    },
    description: {
        padding: 0,
        margin: 0,
        lineHeight: '13px',
        color: '#9eacb4',
        fontSize: '13px',
        fontWeight: 400,
    }
}
// Block------------------------------------------------
class Block extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        var array = [];
        return (
            <div style={styleBlock.body}>
                <div style={style.title}>
                    <div style={{ padding: '10px 15px', fontSize: 16, fontWeight: 'bold', borderBottom: '1px solid #eef1f5' }}>
                        ALL DEVICES
                        <IconButton name={"map"} class={"fa fa-map"} active={this.props.showDevicesByMap} chooseOptionShowDevices={this.props.chooseOptionShowDevices} />
                        <IconButton name={"list"} class={"fa fa-th-list"} active={this.props.showDevicesByList} chooseOptionShowDevices={this.props.chooseOptionShowDevices} />
                        <IconButton name={"grid"} class={"fa fa-th"} active={this.props.showDevicesByGrid} chooseOptionShowDevices={this.props.chooseOptionShowDevices} />
                    </div>
                </div>
                <div style={styleBlock.content}>
                    {
                        this.props.showDevicesByGrid
                            ? this.props.listDevice.map(element => {
                                if (element.isActive == '1') {
                                    return <div className="col-sm-2 col-md-4" key={element.id}>
                                        <Device closeModal={this.props.closeModal}
                                            element={element}
                                            data={this.props.data}
                                            getNotification={this.props.getNotification}
                                            solution={this.props.notificationSolution} />
                                    </div>
                                } else {
                                    return <div className="col-sm-2 col-md-4" key={element.id}>
                                        <NoDevice openModal={this.props.openModal}
                                            element={element} />
                                    </div>
                                }
                            })
                            : null
                    }
                    {
                        this.props.showDevicesByMap
                            ? <MapWithAMarker
                                array={[{ latitude: 16.054690, longitude: 108.231540 }, { latitude: 16.053115, longitude: 108.210358 }]}
                                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_aFLX1tVABBgvwYQ1mZzr3ApJVU5_YwA&v=3.exp&libraries=geometry,drawing,places"
                                loadingElement={<div style={{ height: `100%` }} />}
                                containerElement={<div style={{ height: `100%` }} />}
                                mapElement={<div style={{ height: `100%` }} />} />
                            : null
                    }
                </div>
            </div >
        );
    }
}

const styleBlock = {
    body: {
        position: 'relative',
        width: '100%',
        height: '100%',
        border: '1px solid #e7ecf1',
        backgroundColor: '#fff',
    },
    content: {
        overflow: 'auto',
        height: '91%',
    },
    icon: {
        cursor: 'pointer',
        color: '#666',
        fontSize: 14,
        marginLeft: '6px'
    },
    iconHover: {
        backgroundColor: '#ccc',
        cursor: 'pointer',
        color: '#666',
        fontSize: 14,
        marginLeft: '6px'
    },
    iconActive: {
        backgroundColor: '#ccc',
        cursor: 'pointer',
        color: '#666',
        fontSize: 14,
        marginLeft: '6px'
    },
    btn: {
        height: '27px',
        width: '27px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        float: 'left',
        margin: 2,
        cursor: 'pointer',
    },
    btnHover: {
        backgroundColor: '#ccc',
        height: '27px',
        width: '27px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        float: 'left',
        margin: 2,
        cursor: 'pointer',
    },
    btnActive: {
        backgroundColor: '#ccc',
        height: '27px',
        width: '27px',
        borderRadius: '25px',
        border: '1px solid #ccc',
        float: 'left',
        margin: 2,
        cursor: 'pointer',
    }
}

class IconButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hover: false,

        }
    }

    mouseEnter() {
        this.setState({ hover: true })
    }

    mouseLeave() {
        this.setState({ hover: false })
    }

    click() {
        this.props.chooseOptionShowDevices(this.props.name);
    }

    render() {
        return (
            this.props.active
                ?
                <div style={styleBlock.btnHover} className="pull-right"
                    onMouseOver={this.mouseEnter.bind(this)}
                    onMouseOut={this.mouseLeave.bind(this)}
                    onClick={this.click.bind(this)} >
                    <i className={this.props.class}
                        style={styleBlock.iconActive} />
                </div>
                :
                <div style={!this.state.hover ? styleBlock.btn : styleBlock.btnHover} className="pull-right"
                    onMouseOver={this.mouseEnter.bind(this)}
                    onMouseOut={this.mouseLeave.bind(this)}
                    onClick={this.click.bind(this)} >
                    <i className={this.props.class}
                        style={!this.state.hover ? styleBlock.icon : styleBlock.iconHover} />
                </div>
        );
    }
}

class Device extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    componentDidMount() {
        // this.timeout = setTimeout(() => {
        //     this.props.getNotification(this.props.element.id);
        // }, 1000);
        this.interval = setInterval(() => {
            this.props.getNotification(this.props.element.id);
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        // clearTimeout(this.timeout);
    }

    render() {
        return (
            <div style={styleDevice.body}>
                {
                    this.props.data != null
                        ? <div style={this.props.solution == null ? styleDevice.headerData : styleDevice.headerWarning}>
                            <div style={styleDevice.insideData}>
                                <h4 style={{ fontSize: '1vw' }}><i className="fa fa-tint"></i> {Object(this.props.data).humidity} (%)</h4>
                                <h4 style={{ fontSize: '1vw' }}><i className="fa fa-thermometer-empty"></i> {Object(this.props.data).temperature} (°C)</h4>
                            </div>
                        </div>
                        : <div style={styleDevice.headerNoData}>
                            <div style={styleDevice.insideNoData}>
                                <i style={{ fontSize: '2vw' }} className="fa fa-exclamation-triangle"></i>
                            </div>
                        </div>
                }
                {this.props.element.name}
            </div>
        );
    }

}

const styleDevice = {
    body: {
        marginTop: 10,
        cursor: 'pointer',
        textAlign: 'center'
    },
    headerData: {
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
        width: '100%',
        height: '5vw',
        borderRadius: 20,
        backgroundColor: '#00a65a',
        color: 'white'
    },
    headerWarning: {
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
        width: '100%',
        height: '5vw',
        borderRadius: 20,
        backgroundColor: '#f39c12',
        color: 'white'
    },
    headerNoData: {
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
        width: '100%',
        height: '5vw',
        borderRadius: 20,
        backgroundColor: '#e7505a',
        color: 'white'
    },
    insideData: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '15%',
        textAlign: 'center'
    },
    insideNoData: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: '28%',
        textAlign: 'center'
    }
}

class NoDevice extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styleNoDevice.body} onClick={() => this.props.openModal()}>
                <div style={styleNoDevice.header}>
                    <div style={styleNoDevice.inside}>
                        <h5>No data</h5>
                    </div>
                </div>
                {this.props.element.name}
            </div>
        );
    }

}

const styleNoDevice = {
    body: {
        marginTop: 10,
        textAlign: 'center',
        cursor: 'pointer'
    },
    header: {
        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.12), 0 1px 4px rgba(0, 0, 0, 0.24)',
        width: '100%',
        height: '5vw',
        borderRadius: 20,
        border: '2px solid gray'
        // backgroundColor: '#00a65a' 
    },
    inside: {
        position: 'absolute',
        top: '30%',
        left: 0,
        right: 0,
        color: 'gray',
        borderRadius: 10,
        alignItems: 'center'
    }
}

// Main------------------------------------------------
class Main extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={styleMain.body}>
                <div style={style.title}>
                    <div style={{ padding: '10px 15px', fontSize: 16, fontWeight: 'bold', borderBottom: '1px solid #eef1f5' }}>
                        INFORMATION <span style={style.description}>Include progress, real-time chart, reminder,...</span>
                    </div>
                </div>
                <div className="col-md-12">
                    <TimeLines phases={this.props.phases}
                        totalDaysOfPhase={this.props.totalDaysOfPhase} />
                </div>
                <div className="col-md-12" style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                    <ChartComponent humidity={this.props.humidity}
                        temperature={this.props.temperature}
                        intervalTime={this.props.intervalTime}
                        interval={this.props.interval}
                        getRealDataOnChart={this.props.getRealDataOnChart}
                        device={this.props.device} />
                </div>
            </div>

        );
    }
}

const styleMain = {
    body: {
        position: 'relative',
        backgroundColor: '#fff',
        width: '100%',
        height: '100%',
        border: '1px solid #e7ecf1',
    }
}

class TimeLines extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="body">
                <style dangerouslySetInnerHTML={{
                    __html: [
                        'ol {',
                        // '  position: absolute;',
                        '  display: block;',
                        '  width: 100%;',
                        '  margin-top: 60px;',
                        // '  top: 100px;',
                        // '  left: 20px;',
                        // '  right: 20px;',
                        '  height: 4px;',
                        '  background: #3598dc;',
                        '}',
                        'ol::before,',
                        'ol::after {',
                        '  content: "";',
                        '  position: absolute;',
                        '  top: 52px;',
                        '  display: block;',
                        '  width: 20px;',
                        '  height: 20px;',
                        '  border-radius: 10px;',
                        '  border: 10px solid #3598dc;',
                        '}',
                        'ol::before {',
                        '  left: 10px;',
                        '}',
                        'ol::after {',
                        '  right: 5px;',
                        '  border: 10px solid transparent;',
                        '  border-right: 0;',
                        '  border-left: 20px solid #3598dc;',
                        '  border-radius: 3px;',
                        '}',
                        'li {',
                        '  position: relative;',
                        '  display: inline-block;',
                        '  float: left;',
                        // '  width: 20%;',
                        '  font: bold 14px arial;',
                        '  height: 50px;',
                        '}',
                        'ol li:nth-child(odd) .diplome{',
                        '  position: absolute;',
                        '  top: -47px;',
                        // '  left: 36%;',
                        '  color: #000000;',
                        '}',
                        'ol li:nth-child(even) .diplome{',
                        '  position: absolute;',
                        '  top: 27px;',
                        // '  left: 36%;',
                        '  color: #000000;',
                        '}',
                        'ol li .point {',
                        '  top: -6px;',
                        // '  left: 43%;',
                        '  display: block;',
                        '  width: 15px;',
                        '  height: 15px;',
                        '  border: 4px solid #3598dc;',
                        '  border-radius: 10px;',
                        '  background: #fff;',
                        '  position: absolute;',
                        '}',
                        '.description {',
                        '  display: none;',
                        '  background-color: #fff;',
                        '  padding: 10px;',
                        '  margin-top: 25px;',
                        '  margin-left: -35px;',
                        '  position: relative;',
                        '  font-weight: normal;',
                        '  z-index: 1;',
                        '  width: 220px;',
                        '  opacity: 0;',
                        '  transition: opacity 1s;',
                        '}',
                        '.description p span{',
                        '  font-weight: bold;',
                        '}',
                        '.description::after {',
                        '  content: "";',
                        // '  width: 10px;',
                        // '  height: 10px;',
                        '  border-color: transparent transparent white transparent;',
                        '  border-left: -5px;',
                        '  border-width: 10px;',
                        '  border-style: solid;',
                        // '  border-right: 5px solid transparent;',
                        // '  border-bottom: 5px solid #f4f4f4;',
                        '  position: absolute;',
                        '  bottom: 100%;',
                        '  left: 15%;',
                        '}',
                        'li:hover {',
                        '  cursor: pointer;',
                        // '  color: #48A4D2;',
                        '}',
                        'li:hover .description {',
                        '  display: block;',
                        '  opacity: 1;',
                        '}'
                    ].join('\n')
                }}>
                </style>
                <ol>
                    {
                        this.props.phases.map(element => {
                            var width = element.days / this.props.totalDaysOfPhase * 100;
                            return <li style={{ width: width + '%' }} key={element.id}>
                                <p className="diplome">{Object(element).name}</p>
                                <div className="point"></div>
                                <div className="description">
                                    <p><span>Phase:</span> {Object(element).name}</p>
                                    <p><span>Days:</span> {Object(element).days}</p>
                                    <p><span>Fit Humidity:</span> {Object(element).minHumidity}-{Object(element).maxHumidity} (%)</p>
                                    <p><span>Fit Temperature:</span> {Object(element).minTemperature}-{Object(element).maxTemperature} (°C)</p>
                                </div>
                            </li>
                        })
                    }
                </ol>
            </div >
        );
    }
}

class Canlendar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{ marginTop: 148, height: '1000px' }}>
                <style dangerouslySetInnerHTML={{
                    __html: [
                        '.rbc-today {',
                        'background-color: #F97F51;',
                        '}',
                        '.rbc-off-range-bg {',
                        'background: #778ca3;',
                        '}',
                        '.rbc-off-range {',
                        'color: white;',
                        '}',
                        '.rbc-toolbar button {',
                        '    color: #fff;',
                        '    background-color: #ff6b81;',
                        '    display: inline-block;',
                        '    margin: 0;',
                        '    text-align: center;',
                        '    vertical-align: middle;',
                        '    border: 1px solid #ccc;',
                        '    padding: .375rem 1rem;',
                        '    border-radius: 4px;',
                        '    line-height: normal;',
                        '    white-space: nowrap;',
                        '}',
                    ].join('\n')
                }}>
                </style>
                <BigCalendar
                    events={[]}
                    startAccessor='startDate'
                    endAccessor='endDate'
                    views={['month']}
                    style={{ backgroundColor: 'rgb(60, 139, 188)', color: 'white', padding: 5, borderRadius: '0px 0px 5px' }}
                />
            </div>
        );
    }

}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNextPage: false,
            phaseInput: '',
            disabledNext: true,
            disabledSave: true,
            phases: [],
            plantName: '',
            description: '',
            startDate: new Date(),
            data: null,
        }
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangePlantName(plant) {
        this.setState({
            plantName: plant.target.value
        });
    }

    onChangePhaseInput(phase) {
        this.setState({phaseInput: phase.target.value})
        if (phase.target.value > 0 && phase.target.value < 11)
        {
            this.setState({
                disabledNext: false,
            });
        }else {
            this.setState({
                disabledNext: true,
            });
        }
    }

    onChangeDate(date) {
        this.setState({
            startDate: date._d
        })
    }

    onClickNextPage() {
        var array = [];
        for (var i = 1; i <= this.state.phaseInput; i++) {
            array.push({
                key: i,
                phaseName: '',
                days: '',
                minTemperature: '',
                maxTemperature: '',
                minHumidity: '',
                maxHumidity: '',
            });
        }
        this.setState({
            isNextPage: true,
            phases: array
        });
    }

    onClickPreviousPage() {
        this.setState({
            isNextPage: false
        })
    }

    onChangePhaseName(phaseName, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].phaseName = phaseName.target.value;
            this.setState({
                phases: array
            })
        }
    }

    onChangeDescription(description) {
        this.setState({
            description: description.target.value,
        });
    }

    onChangeDays(days, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].days = days.target.value;
            this.setState({
                phases: array
            })
        }
    }

    onChangeMinTemperature(minTemperature, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].minTemperature = minTemperature.target.value;
            this.setState({
                phases: array
            })
        }
    }

    onChangeMaxTemperature(maxTemperature, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].maxTemperature = maxTemperature.target.value;
            this.setState({
                phases: array
            })
        }
    }

    onChangeMinHumidity(minHumidity, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].minHumidity = minHumidity.target.value;
            this.setState({
                phases: array
            })
        }
    }

    onChangeMaxHumidity(maxHumidity, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].maxHumidity = maxHumidity.target.value;
            this.setState({
                phases: array
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.setState({
            data: {
                code: '111112',
                plant: {
                    name: this.state.plantName,
                    description: this.state.description
                },
                startDate: this.state.startDate,
                phase: this.state.phases
            }
        })
        console.log(this.state.data);
    }

    render() {
        return (
            <div>
                <div style={styleForm.background}></div>
                <form style={styleForm.body} className="col-md-8 col-md-offset-2">
                    {/* <div style={style.title}>
                    <div style={{ padding: '10px 15px', fontSize: 16, fontWeight: 'bold', borderBottom: '1px solid #eef1f5' }} className="text-uppercase text-center">
                        Add New Plant Form
                    </div>
                </div> */}
                    <h3 className="text-uppercase text-center" style={{ borderBottom: '1px solid #eef1f5', paddingBottom: 15 }}>Add New Plant Form</h3>
                    {
                        !this.state.isNextPage
                            ? <div className="col-md-12">
                                <div className="form-group col-md-12">
                                    <label>Plant</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input phase"
                                        value={this.state.plantName}
                                        onChange={(plant) => this.onChangePlantName(plant)} />
                                    {/* <select className="form-control">
                                        <option>Please choose plant</option>
                                        <option>Rice Plant</option>
                                        <option>Potato Plant</option>
                                    </select> */}
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Phase</label>
                                    <input type="number"
                                        min="1" step="1"
                                        required
                                        className="form-control"
                                        placeholder="Please input phase"
                                        value={this.state.phaseInput}
                                        onChange={(phase) => this.onChangePhaseInput(phase)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Start Date</label>
                                    <Datetime
                                        timeFormat={false}
                                        isValidDate={valid}
                                        value={this.state.startDate}
                                        onChange={(date) => this.onChangeDate(date)}
                                    />
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Description</label>
                                    <textarea type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input phase"
                                        value={this.state.description}
                                        onChange={(description) => this.onChangeDescription(description)} />
                                </div>
                            </div>
                            : <div className="col-md-12">
                                <div style={styleForm.bodyNextPage}>
                                    {
                                        this.state.phases.map(phase => {
                                            return <div className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} key={phase.key} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0 }}>
                                                <div className="col-md-12" style={{ backgroundColor: '#3598dc', padding: 0 }}>
                                                    <label style={{ margin: 10, color: 'white' }}>Phase {phase.key}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <label className="form-label">Phase name</label>
                                                    <input type="text" className="form-control" placeholder="Phase name" required value={phase.phaseName} onChange={(phaseName) => this.onChangePhaseName(phaseName, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className="form-label">Days</label>
                                                    <input type="number" className="form-control" min="1" max="10" placeholder="Days" required value={phase.days} onChange={(days) => this.onChangeDays(days, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Min Temperature</label>
                                                    <input type="number" className="form-control" placeholder="Min Temperature" required value={phase.minTemperature} onChange={(minTemperature) => this.onChangeMinTemperature(minTemperature, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Max Temperature</label>
                                                    <input type="number" className="form-control" placeholder="Max Temperature" required value={phase.maxTemperature} onChange={(maxTemperature) => this.onChangeMaxTemperature(maxTemperature, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Min Humidity</label>
                                                    <input type="number" className="form-control" placeholder="Min Humidity" required value={phase.minHumidity} onChange={(minHumidity) => this.onChangeMinHumidity(minHumidity, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Max Humidity</label>
                                                    <input type="number" className="form-control" placeholder="Max Humidity" required value={phase.maxHumidity} onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, phase.key)} />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                    }
                    <div className="col-md-12" style={styleForm.groupBtn}>
                        <hr />
                        {this.state.isNextPage ? <input type="submit" className="btn btn-success pull-right col-md-2" value="Save" style={{ marginRight: 10 }} onClick={this.onSubmit} /> : null}
                        {!this.state.isNextPage ? <input type="button" className="btn btn-success pull-right col-md-2" value="Next" style={{ marginRight: 10 }} disabled={this.state.disabledNext ? 'disabled' : ''} onClick={() => this.onClickNextPage()} /> : null}
                        {this.state.isNextPage ? <input type="button" className="btn btn-default pull-right col-md-2" value="Previous" style={{ marginRight: 10 }} onClick={() => this.onClickPreviousPage()} /> : null}
                        <input type="button" className="btn btn-default pull-right col-md-2" value="Cancel" style={{ marginRight: 10 }} onClick={() => this.props.closeModal()} />
                    </div>
                </form>
            </div>
        );
    }

}

var yesterday = Datetime.moment().subtract(1, 'day');
var valid = function (current) {
    return current.isAfter(yesterday);
};

const styleForm = {
    background: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0,
        backgroundColor: '#000',
        opacity: 0.7,
        zIndex: 4
    },
    body: {
        position: 'fixed',
        top: '10%',
        zIndex: 5,
        backgroundColor: 'white',
        boxShadow: '0 5px 15px rgba(0,0,0,.5)'
    },
    groupBtn: {
        marginBottom: 20
    },
    bodyNextPage: {
        height: 300,
        overflow: 'auto'
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

// Info-----------------------------------------
class Notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            arrayMessageBox: [],
        }
    }

    render() {
        return (
            <div style={styleInfo.body}>
                <div style={style.title}>
                    <div style={{ padding: '10px 15px', fontSize: 16, fontWeight: 'bold', borderBottom: '1px solid #eef1f5' }}>
                        NOTIFICATIONS <span style={style.description}>Include warning, solutions,...</span>
                    </div>
                </div>
                <div style={styleInfo.messageBox}>
                    {/* <div style={styleInfo.contentBox}> */}
                    {
                        this.props.listDevice.map(element => {
                            if (element.id == this.props.deviceId) {
                                if ((this.props.notificationSolution != null && this.props.message == 'OK') || this.props.message != 'OK' && this.props.message != null) {
                                    this.state.arrayMessageBox.unshift(<Message solution={this.props.notificationSolution} message={this.props.message} name={element.name} datetime={this.props.datetime} />);
                                }
                                if (this.state.arrayMessageBox.length == 20) this.state.arrayMessageBox.pop();
                                return this.state.arrayMessageBox;
                            }
                        })
                    }
                    {/* </div> */}
                </div>
                {/* <div className="col-md-5">
                    <img src="images/lua.jpeg" style={styleInfo.image} />
                </div>
                <div className="col-md-7" style={styleInfo.intro}>
                    <h3 style={styleInfo.namePlant}>{Object(this.props.plant).name}</h3>
                    <div style={styleInfo.content}>
                        <p>{Object(this.props.plant).description}</p>
                    </div>
                </div> */}
            </div>
        )
    }
}

const styleInfo = {
    body: {
        width: '100%',
        position: 'relative',
        height: '100%',
        backgroundColor: '#fff',
        border: '1px solid #e7ecf1',
    },
    image: {
        objectFit: 'cover',
        width: '100%',
        height: '10vw',
        marginTop: 10,
        borderBottom: '0.5px solid rgb(192,192,192)'
    },
    intro: {
        padding: 0
    },
    namePlant: {
        margin: '10px 10px 0px 0px',
        textAlign: 'center',
        borderBottom: '0.5px solid rgb(192,192,192)'
    },
    content: {
        padding: 5,
        height: '8vw',
        overflow: 'auto',
    },
    messageBox: {
        height: '91%',
        overflow: 'auto'
    },
    contentBox: {
        backgroundColor: 'white',
        width: '95%',
        margin: 10,
        height: '9vw',
        overflow: 'auto'
    },
}

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="col-md-12">
                <div style={this.props.solution == null ? styleMessage.bodyAlert : styleMessage.bodyWarning}>
                    {
                        this.props.message == 'OK'
                            ? <div>
                                <h4 style={{ fontSize: '16px !important', margin: '2px' }}>[{Object(this.props.solution).getSolutionDate}] {this.props.name}:</h4>
                                <span>{Object(this.props.solution).description}</span>
                            </div>
                            : <div>
                                <h4 style={{ fontSize: '16px !important', margin: '2px' }}>[{this.props.datetime}] {this.props.name}:</h4>
                                <span>{this.props.message}</span>
                            </div>
                    }
                </div>
            </div>
        );
    }
}

const styleMessage = {
    bodyAlert: {
        marginTop: 10,
        padding: '2px 5px 2px 10px',
        // backgroundColor: '#e7505a',
        border: '2px solid #e7505a',
        color: '#2f353b'
    },
    bodyWarning: {
        marginTop: 10,
        padding: '2px',
        // backgroundColor: '#f39c12',
        border: '2px solid #f39c12',
        color: '#2f353b'
    }
}