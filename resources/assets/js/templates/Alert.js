import React, { Component } from 'react';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import { deletePlant, deleteDeviceUser } from '../actions/Action';

export class Alert extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {

        return (
            <div>
                <div style={style.overview}></div>
                <StyleRoot>
                    <div style={style.alert} className="col-xs-6 col-xs-offset-3 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                        {bodyAlert(this.props.title, this.props.closeAlert, this.props.id, this.props.delete)}
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

const confirm = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('profile');
    window.location.href = "/";
}

const bodyAlert = (title, closeAlert, id, del) => {
    switch (title) {
        case 'LOGOUT':
            return confirmLogout(closeAlert);
        case 'DELETE_DEVICE':
            return deleteDevice(closeAlert, id, del, title);
        case 'DELETE_USER':
            return deleteUser(closeAlert, id, del, title);
        case 'DELETE_DATA':
            return deleteUser(closeAlert, id, del, title);
        case 'DELETE_SENSOR':
            return deleteSensor(closeAlert, id, del, title);
        case 'DELETE_PLANT':
            return deletePlants(closeAlert, id, del, title);
        case 'DELETE_DEVICE_USER':
            return deleteDeviceUsers(closeAlert, id, del, title);
    }
};

const deleteDevice = (closeAlert, id, del, title) => (
    <div>
        <div style={{textAlign: 'center'}}>
            <i className="fa fa-exclamation-triangle" style={style.icon}/>
            <h3>Are you sure you want to delete this device?</h3>
            <p>You can lose all data of this device</p>
        </div>
        <hr />
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-xs-5 col-sm-5 col-md-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-5" style={{ marginRight: 5 }}>Cancel</button>
            <button onClick={() => del(title, id)} className="btn btn-success col-xs-5 col-sm-5 col-md-3">Yes</button>
        </div>
    </div>
);

const deleteDeviceUsers = (closeAlert, id, del, title) => (
    <div>
        <div style={{textAlign: 'center'}}>
            <i className="fa fa-exclamation-triangle" style={style.icon}/>
            <h3>Are you sure you want to delete this device?</h3>
            <p>You can lose all data of this device</p>
        </div>
        <hr />
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-xs-5 col-sm-5 col-md-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-5" style={{ marginRight: 5 }}>Cancel</button>
            <button onClick={() => del(title, id)} className="btn btn-success col-xs-5 col-sm-5 col-md-3">Yes</button>
        </div>
    </div>
);

const deleteUser = (closeAlert, id, del, title) => (
    <div>
        <div style={{textAlign: 'center'}}>
            <i className="fa fa-exclamation-triangle" style={style.icon}/>
            <h3>Are you sure you want to delete this user?</h3>
        </div>
        <hr />
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-xs-5 col-sm-5 col-md-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-5" style={{ marginRight: 5 }}>Cancel</button>
            <button onClick={() => del(title, id)} className="btn btn-success col-xs-5 col-sm-5 col-md-3">Yes</button>
        </div>
    </div>
);

const deleteData = (closeAlert, id, del, title) => (
    <div>
        <div style={{textAlign: 'center'}}>
            <i className="fa fa-exclamation-triangle" style={style.icon}/>
            <h3>Are you sure you want to delete this data?</h3>
        </div>
        <hr />
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-xs-5 col-sm-5 col-md-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-5" style={{ marginRight: 5 }}>Cancel</button>
            <button onClick={() => del(title, id)} className="btn btn-success col-xs-5 col-sm-5 col-md-3">Yes</button>
        </div>
    </div>
);

const deleteSensor = (closeAlert, id, del, title) => (
    <div>
        <div style={{textAlign: 'center'}}>
            <i className="fa fa-exclamation-triangle" style={style.icon}/>
            <h3>Are you sure you want to delete this sensor?</h3>
        </div>
        <hr />
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-xs-5 col-sm-5 col-md-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-5" style={{ marginRight: 5 }}>Cancel</button>
            <button onClick={() => del(title, id)} className="btn btn-success col-xs-5 col-sm-5 col-md-3">Yes</button>
        </div>
    </div>
);

const deletePlants = (closeAlert, id, del, title) => (
    <div>
        <div style={{textAlign: 'center'}}>
            <i className="fa fa-exclamation-triangle" style={style.icon}/>
            <h3>Are you sure you want to delete this plant?</h3>
        </div>
        <hr />
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-xs-5 col-sm-5 col-md-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-5" style={{ marginRight: 5 }}>Cancel</button>
            <button onClick={() => del(title, id)} className="btn btn-success col-xs-5 col-sm-5 col-md-3">Yes</button>
        </div>
    </div>
);

const confirmLogout = (closeAlert) => (
    <div>
        <h3>Do you want to logout?</h3>
        <hr />
        <div className="row">
        <button onClick={() => closeAlert()} className="btn btn-default col-xs-5 col-sm-5 col-md-3 col-xs-offset-1 col-sm-offset-1 col-md-offset-5" style={{ marginRight: 5 }}>Cancel</button>
            <button onClick={() => confirm()} className="btn btn-success col-xs-5 col-sm-5 col-md-3">Yes</button>
        </div>
    </div>
);

const style = {
    overview: {
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 99999,
    },
    alert: {
        position: 'absolute',
        top: '15%',
        padding: 20,
        borderRadius: 5,
        zIndex: 99999,
        backgroundColor: 'white',
        animation: "0.5s",
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
    icon: {
        fontSize: 100,
        color: '#f6e58d',
    },
    title: {
        fontWeight: 'bold'
    },
    content: {
        fontSize: 15
    }
}
