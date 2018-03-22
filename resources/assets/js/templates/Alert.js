import React, { Component } from 'react';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

export class Alert extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        var url = window.location.toString();
        var id = url.slice(url.indexOf('/#/') + 17);    
        var name = url.slice(url.indexOf('/#/') + 3, url.indexOf(id) - 1);
    }

    render() {

        return (
            <div>
                <div style={style.overview}></div>
                <StyleRoot>
                    <div style={style.alert} className="col-xs-6 col-xs-offset-3 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                        {bodyAlert(this.props.title, this.props.closeAlert)}
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

const bodyAlert = (title, closeAlert) => {
    switch (title) {
        case 'LOGOUT':
            return confirmLogout(closeAlert);
    }
};

const confirmLogout = (closeAlert) => (
    <div>
        <h3>Are you sure logout?</h3>
        <hr />
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-md-3 col-md-offset-5" style={{ marginRight: 10 }}>Cancel</button>
            <button onClick={() => confirm()} className="btn btn-success col-md-3">Yes</button>
        </div>
    </div>
);

export class AlertDelete extends React.Component {
        constructor(props) {
        super(props)
    }

    render() {

        var url = window.location.toString();
        var id = url.slice(url.indexOf('/#/') + 17);    
        var name = url.slice(url.indexOf('/#/') + 3, url.indexOf(id) - 1);

        return (
            <div>
                <div style={style.overview}></div>
                <StyleRoot>
                    <div style={style.alert} className="col-xs-6 col-xs-offset-3 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                        {bodyAlertDelete(name, id)}
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

const bodyAlertDelete = (name, id) => {
    switch (name) {
        case 'device/delete':
            return confirmDeleteDevice(id);
    }
};

const confirmDeleteDevice = () => (
    <div>
        <div style={{textAlign: 'center'}}>
            <i className="fa fa-exclamation-circle" style={style.iconAlert}/> 
            <h3 style={style.title}>Are you sure you want to deleve this device?</h3>
            <p style={style.content}>You can lose all data when you delete this device</p>
            <hr />
        </div>
        <div className="row">
            <button onClick={() => closeAlert()} className="btn btn-default col-md-3 col-md-offset-5" style={{ marginRight: 10 }}>Cancel</button>
            <button onClick={() => confirm()} className="btn btn-success col-md-3">Yes</button>
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
    iconAlert: {
        fontSize: 100,
        color: '#E7505A',
    },
    title: {
        fontWeight: 'bold'
    },
    content: {
        fontSize: 15
    }
}
