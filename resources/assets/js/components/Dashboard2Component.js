import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
var Datetime = require('react-datetime');
import { MapWithAMarker } from '../templates/Map';
import { LineChartComponent } from '../templates/Chart';
import Loader from '../templates/Loader';
import {Timeline, TimelineEvent} from 'react-event-timeline'

BigCalendar.setLocalizer(BigCalendar.momentLocalizer(moment))
const profile = JSON.parse(sessionStorage.getItem('profile'));
var p = null;

export default class Dashboard2Component extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModal: false,
            codeInModal: '',
            loader: true,
        }
    }

    componentWillMount() {
        this.timeout = setTimeout(() => {
            this.props.getDetailInformationDevice(this.props.deviceFirst);
        }, 1500);
        this.timeoutRealTime = setTimeout(() => {
            this.props.getRealDataOnChart(this.props.device, this.props.interval);
        }, 1500);
        this.getLocation = setTimeout(() => {
            this.props.getListLocationOfDevice();
        }, 1500);
    }

    componentDidMount() {

    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
        clearTimeout(this.timeoutRealTime);
        clearTimeout(this.getLocation);
    }

    openModal(code) {
        this.setState({
            isModal: true,
            codeInModal: code
        });
    }

    closeModal() {
        this.setState({
            isModal: false,
        });
    }

    onFileChange(e, file) {
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('Format invalid');
            return;
        }

        reader.onload = (e) => {
            this.setState({
                picture: reader.result,
                // loaded: true 
            });
        }

        reader.readAsDataURL(file);
    }

    render() {
        return (
            this.state.loader
                ? <div style={style.body}>
                    <div className="col-md-3" style={style.main}>
                        <Block openModal={this.openModal.bind(this)}
                            listDevice={this.props.all_devices}
                            data={this.props.notificationData}
                            getNotification={this.props.getNotification}
                            chooseOptionShowDevices={this.props.chooseOptionShowDevices}
                            showDevicesByGrid={this.props.showDevicesByGrid}
                            showDevicesByList={this.props.showDevicesByList}
                            showDevicesByMap={this.props.showDevicesByMap}
                            dashboardDevicesActive={this.props.dashboardDevicesActive}
                            getListNotification={this.props.getListNotification}
                            notificationList={this.props.notificationList}
                            getDetailInformationDevice={this.props.getDetailInformationDevice}
                            getRealDataOnChart={this.props.getRealDataOnChart}
                            interval={this.props.interval} 
                            listLocation={this.props.dashboardLocations}/>
                    </div>
                    <div className="col-md-6" style={style.main}>
                        <Main phases={this.props.dashboardPhases}
                            totalDaysOfPhase={this.props.dashboardTotalDaysOfPhases}
                            humidity={this.props.humidity}
                            temperature={this.props.temperature}
                            intervalTime={this.props.intervalTime}
                            interval={this.props.interval}
                            getRealDataOnChart={this.props.getRealDataOnChart}
                            device={this.props.device}
                            dashboardDevice={this.props.dashboardDevice}
                            plant={this.props.dashboardPlant}
                            totalDayOfPlant={this.props.dashboardTotalDaysOfPhases}
                            startDate={this.props.dashboardStartDate}
                            endDate={this.props.dashboardEndDate}
                            totalPhases={this.props.dashboardTotalPhases}
                            picture={this.props.dashboardPicture}
                            now={this.props.dashboardNow} 
                            areaName={this.props.dashboardAreaName}/>
                    </div>
                    <div className="col-md-3" style={style.main}>
                        <Notification plant={this.props.dashboardPlant}
                            notificationSolution={this.props.notificationSolution}
                            deviceId={this.props.notificationDeviceId}
                            message={this.props.notificationMessage}
                            datetime={this.props.notificationDatetime}
                            dashboardDevicesActive={this.props.dashboardDevicesActive}
                            notificationList={this.props.notificationList} />
                    </div>
                    {this.state.isModal ? <Form closeModal={this.closeModal.bind(this)}
                        code={this.state.codeInModal}
                        submit={this.props.submitAddNewPlant}
                        plants={this.props.plantsOfUser}
                        addPlantForDevice={this.props.addPlantForDevice} /> : null}
                </div>
                :
                <div style={{ position: 'fixed', top: 0, right: 0, left: 0, bottom: 0 }}>
                    <Loader />
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

    componentDidMount() {
        this.props.getListNotification();
        this.interval = setInterval(() => {
            this.props.getListNotification();
        }, 10000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getDetailInformationDevice(id) {
        this.props.getDetailInformationDevice(id);
        this.props.getRealDataOnChart(id, this.props.interval)
    }

    render() {
        var array = [];
        return (
            <div style={styleBlock.body}>
                <div style={style.title}>
                    <div style={{ padding: '10px 15px', fontSize: 16, fontWeight: 'bold', borderBottom: '1px solid #eef1f5' }}>
                        ALL DEVICES
                        <IconButton name={"map"} class={"fa fa-map"} active={this.props.showDevicesByMap} chooseOptionShowDevices={this.props.chooseOptionShowDevices} />
                        {/* <IconButton name={"list"} class={"fa fa-th-list"} active={this.props.showDevicesByList} chooseOptionShowDevices={this.props.chooseOptionShowDevices} /> */}
                        <IconButton name={"grid"} class={"fa fa-th"} active={this.props.showDevicesByGrid} chooseOptionShowDevices={this.props.chooseOptionShowDevices} />
                    </div>
                </div>
                <div style={styleBlock.content}>
                    {
                        this.props.showDevicesByGrid
                            ? this.props.dashboardDevicesActive.map((element, index) => {
                                return <div className="col-xs-2 col-sm-2 col-md-4" key={element.id} onClick={() => this.getDetailInformationDevice(element.id)}>
                                    <Device
                                        element={element}
                                        data={Object(this.props.notificationList[index]).message == 'OK' ? Object(this.props.notificationList[index]).data : null}
                                        solution={Object(this.props.notificationList[index]).message == 'OK' ? Object(this.props.notificationList[index]).solution : null} />
                                </div>
                            })
                            : null
                    }
                    {
                        this.props.showDevicesByList
                            ? this.props.dashboardDevicesActive.map((element, index) => {
                                return <div className="col-md-12" key={element.deviceId} onClick={() => this.props.getDetailInformationDevice(element.id)}>
                                    <DeviceByList closeModal={this.props.closeModal}
                                        element={element}
                                        data={Object(this.props.notificationList[index]).message == 'OK' ? Object(this.props.notificationList[index]).data : null}
                                        solution={Object(this.props.notificationList[index]).message == 'OK' ? Object(this.props.notificationList[index]).solution : null} />
                                </div>
                            })
                            : null
                    }
                    {
                        this.props.showDevicesByGrid
                            ? this.props.listDevice.map(element => {
                                if (element.isActive != '1') {
                                    return <div className="col-xs-2 col-sm-2 col-md-4" key={element.id}>
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
                                getDetailInformationDevice={this.props.getDetailInformationDevice}
                                array={this.props.listLocation}
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
        height: '89%',
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
                {/* <h6>{this.props.element.areaName} </h6> */}
                <h6>{this.props.element.name} </h6>
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
        backgroundColor: '#F4D03F',
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

class DeviceByList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        }
    }

    render() {
        return (
            <div style={styleDeviceList.body}>
                {
                    this.props.data != null
                        ? <div>
                            <div style={styleDeviceList.display}>
                                <div style={styleDeviceList.number}></div>
                                <div style={styleDeviceList.icon}></div>
                            </div>
                            <div style={styleDeviceList.progress}>

                            </div>
                            {/* <div style={styleDevice.insideData}>
                                <h4 style={{ fontSize: '1vw' }}><i className="fa fa-tint"></i> {Object(this.props.data).humidity} (%)</h4>
                                <h4 style={{ fontSize: '1vw' }}><i className="fa fa-thermometer-empty"></i> {Object(this.props.data).temperature} (°C)</h4>
                            </div> */}
                        </div>
                        : <div>
                            <div style={styleDeviceList.insideNoData}>
                                <i style={{ fontSize: '2vw' }} className="fa fa-exclamation-triangle"></i>
                            </div>
                        </div>
                }
                {this.props.element.name}
            </div>
        );
    }
}

const styleDeviceList = {
    body: {
        border: '1px solid #e7ecf1',
        background: '#fff',
        padding: '15px 15px 30px',
        marginTop: '20px',
        cursor: 'pointer',
    },
    display: {

    },
    number: {

    },
    icon: {

    },
    progress: {

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
        backgroundColor: '#F4D03F',
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
            <div style={styleNoDevice.body} onClick={() => this.props.openModal(this.props.element.code)}>
                <div style={styleNoDevice.header}>
                    <div style={styleNoDevice.inside}>
                        <h5>No data</h5>
                    </div>
                </div>
                {/* <h6>{this.props.element.areaName} </h6> */}
                <h6>{this.props.element.name} </h6>
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
        display: 'inline-block',
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
                        INFORMATION <span style={style.description}>You know infomation of plant is managed by device</span>
                    </div>
                </div>
                <div className="col-md-12 text-uppercase text-center">
                    <label className="form-label" style={{ marginTop: 10, marginBottom: 0, fontSize: 18, color: '#32c5d2' }}>{profile.role=="1" ? Object(this.props.dashboardDevice).name : this.props.areaName}</label>
                </div>
                <div style={{ overflow: 'auto', width: '100%', height: '80%'}}>
                    <div className="col-md-12" style={styleMain.contentIntro}>
                        <div className="col-md-7">
                            {
                                this.props.picture == null ? <img src="images/leaf.jpg" style={styleMain.image} /> : <img src={this.props.picture} style={styleMain.image} />
                            }
                        </div>
                        <div className="col-md-5" style={styleMain.intro}>
                            {
                                profile.role == '1' ?
                                    null 
                                    : <div style={styleMain.textIntro}>
                                        <label className="form-label text-weight-bold">Device: </label><span> {Object(this.props.dashboardDevice).name}</span>
                                    </div>
                            }
                            <div style={styleMain.textIntro}>
                                <label className="form-label text-weight-bold">Plant: </label><span> {Object(this.props.plant).name}</span>
                            </div>
                            <div style={styleMain.textIntro}>
                                <label className="form-label text-weight-bold">Start Date: </label><span> {this.props.startDate}</span>
                            </div>
                            <div style={styleMain.textIntro}>
                                <label className="form-label text-weight-bold">End Date: </label><span> {this.props.endDate}</span>
                            </div>
                            <div style={styleMain.textIntro}>
                                <label className="form-label text-weight-bold">Total Phases: </label><span> {this.props.totalPhases}</span>
                            </div>
                            <div style={styleMain.textIntro}>
                                <label className="form-label text-weight-bold">Total days of Plant: </label><span> {this.props.totalDayOfPlant} {this.props.totalDayOfPlant == 1 ? "day": "days"}</span>
                            </div>
                            <div style={styleMain.textIntro}>
                                <label className="form-label text-weight-bold">Total days in current: </label><span> {this.props.now > 0 ? this.props.now : 0} {this.props.now == 1 ? "day": "days"}</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12" style={{ borderBottom: '1px solid #eef1f5' }}>
                        <label className="form-label" style={{ marginTop: 10, marginBottom: 0 }}><i className="fa fa-info-circle" style={{ paddingRight: 5 }}></i>Progress</label>
                        <TimeLines phases={this.props.phases}
                            totalDaysOfPhase={this.props.totalDaysOfPhase}
                            now={this.props.now} 
                            startDate={this.props.startDate}/>
                    </div>
                    <div className="col-md-12" style={{ paddingTop: 10, paddingLeft: 5, paddingRight: 5, paddingBottom: 5 }}>
                        <label className="form-label" style={{ marginTop: 10, marginBottom: 20, marginLeft: 10 }}><i className="fa fa-line-chart" style={{ paddingRight: 5 }}></i>Real-time Chart</label>
                        <ChartComponent humidity={this.props.humidity}
                            temperature={this.props.temperature}
                            intervalTime={this.props.intervalTime}
                            interval={this.props.interval}
                            getRealDataOnChart={this.props.getRealDataOnChart}
                            device={Object(this.props.dashboardDevice).id} />
                    </div>
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
    },
    image: {
        objectFit: 'cover',
        width: '100%',
        height: '170px',
        marginTop: 10,
        // borderBottom: '0.5px solid rgb(192,192,192)'
    },
    intro: {
        marginTop: 10,
    },
    namePlant: {
        margin: '10px 10px 0px 0px',
        textAlign: 'center',
        // borderBottom: '0.5px solid rgb(192,192,192)'
    },
    content: {
        padding: 5,
        height: '8vw',
        overflow: 'auto',
    },
    contentIntro: {
        height: '200px',
        borderBottom: '1px solid #eef1f5',
        padding: 0
    },
    textIntro: {
        padding: 0
    }
}

class TimeLines extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.now >= 0) var positionMarker = (this.props.now / this.props.totalDaysOfPhase * 100) + 9;
        else var positionMarker = 1;
        var day = 0;
        return (
            <div className="body">
                {/* <style dangerouslySetInnerHTML={{
                    __html: [
                        'ol {',
                        // '  position: absolute;',
                        '  display: block;',
                        '  width: 100%;',
                        '  margin-top: 60px;',
                        '  top: 100px;',
                        '  left: 20px;',
                        '  right: 20px;',
                        '  height: 4px;',
                        '  background: #32c5d2;',
                        '}',
                        'ol::before,',
                        'ol::after {',
                        '  content: "";',
                        '  position: absolute;',
                        '  top: 84px;',
                        '  display: block;',
                        '  width: 20px;',
                        '  height: 20px;',
                        '  border-radius: 50px;',
                        '  border: 10px solid #32c5d2;',
                        '}',
                        'ol::before {',
                        '  left: 10px;',
                        '  display: none;',
                        '}',
                        'ol::after {',
                        '  right: 5px;',
                        // '  border: 10px solid transparent;',
                        '  border-right: 0;',
                        '  border-left: 20px solid #32c5d2;',
                        '  border-radius: 50px;',
                        '}',
                        'li {',
                        '  position: relative;',
                        '  display: inline-block;',
                        '  float: left;',
                        // '  width: 20%;',
                        '  font: bold 12px arial;',
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
                        '  border: 4px solid #32c5d2;',
                        '  border-radius: 10px;',
                        '  background: #fff;',
                        '  position: absolute;',
                        // '  margin-left: -45px;',
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
                </style> */}
                {/* <ol>
                    <i className="fa fa-map-marker" style={{ color: '#2f353b', position: 'absolute', top: '62px', fontSize: '35px', left: positionMarker + '%' }}></i>
                    {
                        this.props.phases.map((element, index) => {
                            var width = element.days / this.props.totalDaysOfPhase * 100;
                            return <li style={{ width: width + '%' }} key={element.id}>
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
                </ol> */}
                <Timeline>
                        {/* <TimelineEvent // iconStyle={{ marginTop: height + "%" }}
                            bubbleStyle={{ backgroundColor: 'white', border: '1px solid gray', marginTop: positionMarker + "%", zIndex: 1 }}
                            style={{ zIndex: 4 }}
                            icon={<i style={{ color: 'gray'  }}>Now</i>}></TimelineEvent> */}
                    {
                        this.props.phases.map((element, index) => {
                            var height = element.days / this.props.totalDaysOfPhase * 100;
                            p = day;
                            day = day + Object(element).days;
                            let value = checkCurrentPhase(index, day, this.props.now, Object(element).days);
                            return <TimelineEvent key={index} title={Object(element).name}
                                                // createdAt="2016-09-12 10:06 PM"
                                                // iconStyle={{ marginTop: height + "%" }}
                                                contentStyle={!value ? { fontSize: '16px' } : { fontSize: '16px', fontWeight: 'bold', color: 'gray', border: '2px solid rgb(50, 197, 210)' }}
                                                bubbleStyle={!value ? { backgroundColor: 'white' } : { backgroundColor: 'white',  border: '2px solid rgb(50, 197, 210)' }}
                                                titleStyle={!value ? { fontSize: '18px', fontWeight: 'bold' } : { fontSize: '18px', fontWeight: 'bold', color: 'rgb(50, 197, 210)' }}
                                                style={{backgroundColor: 'white'}}
                                                icon={<i className="fa fa-leaf" style={!value ? { color: 'rgb(111, 186, 28)' } : {color: 'rgb(50, 197, 210)'}}></i>}
                                    >
                                        <p><span>Days:</span> {Object(element).days}</p>
                                        <p><span>Fit Humidity:</span> {Object(element).minHumidity}-{Object(element).maxHumidity} (%)</p>
                                        <p><span>Fit Temperature:</span> {Object(element).minTemperature}-{Object(element).maxTemperature} (°C)</p>
                                    </TimelineEvent>
                        })
                    }
                </Timeline>
            </div >
        );
    }
}

const checkCurrentPhase = (index, day, now, dayPhase) => {
    if (index == 0) {
        if (now < dayPhase) return true;
        else return false;
    }else {
        if (p < now && now < day) return true;
        else return false;
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
            disabledSave: false,
            phases: [],
            plantName: '',
            description: '',
            startDate: new Date(),
            plant: {
                name: '',
                description: ''
            },
            picture: this.props.plants[0].picture,
            isChoosingPlant: false,
            file: '',
            plantId: this.props.plants[0].id
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onSubmitPlant = this.onSubmitPlant.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    componentWillMount() {
        if (this.props.plants.length > 0) {
            this.setState({ isChoosingPlant: true })
        }
    }

    onChangePlantName(plant) {
        this.setState({
            plantName: plant.target.value
        });
        if (plant.target.value != '' && this.state.phaseInput > 0 && this.state.phaseInput < 11) this.setState({ disabledNext: false });
        else this.setState({ disabledNext: true });
    }

    onChangePhaseInput(phase) {
        this.setState({ phaseInput: phase.target.value })
        if (phase.target.value > 0 && phase.target.value < 11 && this.state.plantName != '') {
            this.setState({
                disabledNext: false,
            });
        } else {
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
                name: '',
                days: '',
                minTemperature: '',
                maxTemperature: '',
                minHumidity: '',
                maxHumidity: '',
            });
        }
        this.setState({
            disabledSave: true,
            isNextPage: true,
            phases: array,
            plant: {
                name: this.state.plantName,
                description: this.state.description
            },
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
            array[key - 1].name = phaseName.target.value;
            if (phaseName.target.value == '') {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
            this.setState({
                phases: array,
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
            if (days.target.value == '') {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
        }
    }

    onChangeMinTemperature(minTemperature, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].minTemperature = minTemperature.target.value;
            if (minTemperature.target.value >= array[key - 1].maxTemperature) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
            this.setState({
                phases: array
            })
        }
    }

    onChangeMaxTemperature(maxTemperature, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].maxTemperature = maxTemperature.target.value;
            if (maxTemperature.target.value <= array[key - 1].minTemperature) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
            this.setState({
                phases: array
            })
        }
    }

    onChangeMinHumidity(minHumidity, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].minHumidity = minHumidity.target.value;
            if (minHumidity.target.value >= array[key - 1].maxHumidity) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
            this.setState({
                phases: array
            })
        }
    }

    onChangeMaxHumidity(maxHumidity, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].maxHumidity = maxHumidity.target.value;
            if (maxHumidity.target.value <= array[key - 1].minHumidity) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
            this.setState({
                phases: array
            })
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.submit(this.props.code, this.state.plant, this.state.startDate, this.state.file, this.state.phases);
        this.props.closeModal();
    }

    onSubmitPlant(e) {
        e.preventDefault();
        this.props.addPlantForDevice(this.props.code, this.state.plantId, this.state.startDate);
        this.props.closeModal();
    }

    onFileChange(e, file) {
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('Format invalid');
            return;
        }

        reader.onload = (e) => {
            this.setState({
                file: reader.result,
                // loaded: true 
            });
        }

        reader.readAsDataURL(file);
    }

    onSelectPlant(event) {
        this.setState({
            picture: this.props.plants[event.target.value].picture,
            plantId: this.props.plants[event.target.value].id,
        });
    }

    checkNull () {
        for(let i = 0; i < this.state.phaseInput; i++) {
            if (this.state.phases[i].name == '' || this.state.phases[i].days == '' ||
                this.state.phases[i].minTemperature == '' || this.state.phases[i].maxTemperature == '' ||
                this.state.phases[i].minHumidity == '' || this.state.phases[i].maxHumidity == '') {
                    this.setState({disabledSave: true});
                }
        }
    }

    checkGreaterAndLess () {
        for(let i = 0; i < this.state.phaseInput; i++) {
            if (this.state.phases[i].minTemperature >= this.state.phases[i].maxTemperature ||
                this.state.phases[i].minHumidity >= this.state.phases[i].maxHumidity) {
                    this.setState({disabledSave: true});
            }
        }
    }

    checkHumidityLess0Than () {
        for(let i = 0; i < this.state.phaseInput; i++) {
            if (this.state.phases[i].minHumidity < 0 || this.state.phases[i].maxHumidity < 0) {
                this.setState({disabledSave: true});
            }
        }
    }

    checkLess0Than () {
        for(let i = 0; i < this.state.phaseInput; i++) { 
            if (this.state.phases[i].days < 1) {
                this.setState({disabledSave: true});
            }
        }
    }

    render() {
        return (
            <div>
                <div style={styleForm.background}></div>
                <form style={styleForm.body} className="col-md-8 col-md-offset-2">
                    <h3 className="text-uppercase text-center" style={{ borderBottom: '1px solid #eef1f5', paddingBottom: 15 }}>Start Plan For Plant</h3>
                    {
                        this.state.isChoosingPlant
                            ? <div>
                                <div className="col-md-6">
                                    {this.state.picture == '' ? <img src="images/leaf.jpg" style={styleForm.image} /> : <img src={this.state.picture} style={styleForm.image} />}
                                </div>
                                <div className="col-md-6" style={{ marginBottom: 20}}>
                                    <div className="form-group">
                                        <label className="col-md-12" style={{padding: 0}}>Plant</label>
                                        <div className="col-md-8" style={{padding: 0}}>
                                            <select className="form-control" onChange={(event) => this.onSelectPlant(event)}>
                                                {
                                                    this.props.plants.map((element, index) => {
                                                        return <option key={index} value={index}>{element.name}</option>
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <input type="button" className="btn btn-success col-md-3 col-md-offset-1" value="New One" onClick={() => this.setState({ isChoosingPlant: false })} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label className="col-md-12" style={{padding: 0}}>Start Date</label>
                                        <Datetime
                                            timeFormat={false}
                                            isValidDate={valid}
                                            value={this.state.startDate}
                                            onChange={(date) => this.onChangeDate(date)}
                                        />
                                    </div>
                                </div>                                                    
                            </div>
                            : null
                    }
                    {
                        !this.state.isNextPage && !this.state.isChoosingPlant
                            ? <div>
                                <div className="col-md-4" style={{ textAlign: 'center' }}>
                                    <label style={styleForm.image}>
                                        {this.state.file == '' ? null : <img src={this.state.file} style={styleForm.image} />}
                                        {this.state.file != '' ? null : <i className="fa fa-upload" style={{ fontSize: 60, marginTop: 35 }}></i>}
                                        <input type="file" className="form-control" style={{ display: 'none' }} accept="image/*" onChange={this.onFileChange} />
                                    </label>
                                    Click to open the file picker
                                </div>
                                <div className="col-md-8">
                                    <div className="form-group col-md-12">
                                        <label>Plant</label>
                                        <input type="text"
                                            required
                                            className="form-control"
                                            placeholder="Please input name"
                                            value={this.state.plantName}
                                            onChange={(plant) => this.onChangePlantName(plant)} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label>Phase</label>
                                        <input type="number"
                                            min="1" step="1"
                                            required
                                            className="form-control"
                                            placeholder="Please input total phase"
                                            value={this.state.phaseInput}
                                            onChange={(phase) => this.onChangePhaseInput(phase)} />
                                        <span style={style.description}> Phase should be from 1 to 10</span>
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
                                            placeholder="Please input description"
                                            value={this.state.description}
                                            onChange={(description) => this.onChangeDescription(description)} />
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                    {
                        this.state.isNextPage && !this.state.isChoosingPlant
                            ? <div className="col-md-12">
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
                            : null
                    }
                    <div className="col-md-12" style={styleForm.groupBtn}>
                        <hr />
                        {this.state.isChoosingPlant ? <input type="submit" className="btn btn-success pull-right col-md-2" value="Save" style={{ marginRight: 10 }} onClick={this.onSubmitPlant} /> : null}
                        {this.state.isNextPage && !this.state.isChoosingPlant ? <input type="submit" className="btn btn-success pull-right col-md-2" value="Save" style={{ marginRight: 10 }} onClick={this.onSubmit} disabled={this.state.disabledSave ? "disabled" : ""}/> : null}
                        {!this.state.isNextPage && !this.state.isChoosingPlant ? <input type="button" className="btn btn-success pull-right col-md-2" value="Next" style={{ marginRight: 10 }} disabled={this.state.disabledNext ? 'disabled' : ''} onClick={() => this.onClickNextPage()} /> : null}
                        {this.state.isNextPage && !this.state.isChoosingPlant ? <input type="button" className="btn btn-default pull-right col-md-2" value="Previous" style={{ marginRight: 10 }} onClick={() => this.onClickPreviousPage()} /> : null}
                        {!this.state.isNextPage && !this.state.isChoosingPlant ? <input type="button" className="btn btn-default pull-right col-md-2" value="Back" style={{ marginRight: 10 }} onClick={() => this.setState({ isChoosingPlant: true })} /> : null}
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
    },
    image: {
        height: '150px',
        width: '100%',
        objectFit: 'cover',
        border: '2px dashed #e7ecf1',
        borderRadius: '5px',
        cursor: 'pointer',
    }
}

// Chart 
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
                        NOTIFICATIONS
                        {/* <span style={style.description}>Include warning, solutions,...</span> */}
                    </div>
                </div>
                <div style={styleInfo.messageBox}>
                    {
                        this.props.dashboardDevicesActive.map((element, index) => {
                            return <Message key={index}
                                solution={Object(this.props.notificationList[index]).solution}
                                message={Object(this.props.notificationList[index]).message}
                                plantName={Object(this.props.notificationList[index]).plantName}
                                now={Object(this.props.notificationList[index]).now}
                                startDate={Object(this.props.notificationList[index]).startDate}
                                name={element.name}
                                datetime={Object(this.props.notificationList[index]).datetime} />
                            // if ((Object(this.props.notificationList[index]).solution != null && Object(this.props.notificationList[index]).message == 'OK') || Object(this.props.notificationList[index]).message != 'OK' && Object(this.props.notificationList[index]).message != null) {
                            //     this.state.arrayMessageBox.unshift(<Message solution={Object(this.props.notificationList[index]).solution} message={Object(this.props.notificationList[index]).message} name={element.name} datetime={Object(this.props.notificationList[index]).datetime} />);
                            // }
                            // this.state.arrayMessageBox = [...(new Set(this.state.arrayMessageBox))];
                            // if (this.state.arrayMessageBox.length == 20) this.state.arrayMessageBox.pop();
                            // return this.state.arrayMessageBox;
                        })
                    }
                </div>
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
    messageBox: {
        height: '89%',
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
                {
                    this.props.message == 'OK'
                        ? <div style={this.props.solution == null ? styleMessage.bodyGood : styleMessage.bodyWarning}>
                            <h4 style={this.props.solution == null ? styleMessage.titleGood : styleMessage.titleWarning}>{this.props.name} - {this.props.plantName}</h4>
                            <h4 style={{ fontSize: '16px !important', margin: '2px' }}>{this.props.solution != null ? Object(this.props.solution).getSolutionDate : this.props.datetime}</h4>
                            <span>{this.props.solution != null ? Object(this.props.solution).description : "Conditional environment is good for plant"}</span>
                        </div>
                        : <div style={styleMessage.bodyAlert}>
                            <h4 style={styleMessage.titleAlert}>{this.props.name} - {this.props.plantName}</h4>
                            {
                                this.props.now >= 0 ?
                                    <div>
                                        <h4 style={{ fontSize: '16px !important', margin: '2px' }}>{this.props.datetime}</h4>
                                        <span>{this.props.message}</span>
                                    </div>
                                    : <div>
                                        <span>Your device will be started in <span style={{fontWeight: 'bold'}}>{this.props.startDate}</span></span>
                                    </div>
                            }
                        </div>
                }
            </div>
        );
    }
}

const styleMessage = {
    bodyAlert: {
        marginTop: 10,
        padding: '3px 5px 3px 5px',
        // backgroundColor: '#e7505a',
        border: '2px solid #e7505a',
        color: '#2f353b'
    },
    bodyWarning: {
        marginTop: 10,
        padding: '3px 5px 3px 5px',
        // backgroundColor: '#f39c12',
        border: '2px solid #F4D03F',
        color: '#2f353b'
    },
    bodyGood: {
        marginTop: 10,
        padding: '3px 5px 3px 5px',
        border: '2px solid #00a65a',
        color: '#2f353b'
    },
    titleAlert: {
        fontSize: '16px !important',
        margin: '0px -3px',
        paddingLeft: 3,
        backgroundColor: '#e7505a',
        color: 'white',
        // textAlign: 'center'  
    },
    titleWarning: {
        fontSize: '16px !important',
        margin: '0px -3px',
        paddingLeft: 3,
        backgroundColor: '#F4D03F',
        color: 'white',
        // textAlign: 'center' 
    },
    titleGood: {
        fontSize: '16px !important',
        margin: '0px -3px',
        paddingLeft: 3,
        backgroundColor: '#00a65a',
        color: 'white',
        // textAlign: 'center' 
    }

}