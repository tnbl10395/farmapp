import React, { Component } from 'react';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import AddDevice from '../containers/AddDeviceContainer';
import AddUser from '../containers/AddUserContainer';
import AddPlant from '../containers/AddPlantContainer';
import ActionSolution from '../containers/ActionSolutionContainer';
import AddSensor from '../containers/AddSensorContainer';
import UpdateSensor from '../containers/UpdateSensorContainer';
import AddArea from '../containers/AddAreaContainer';
import UpdateArea from '../containers/UpdateAreaContainer';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <div 
                    //  onClick={() => this.props.closeModal()}
                     style={style.overview}>
                </div>
                <StyleRoot>
                    <div style={style.form} className="col-xs-8 col-xs-offset-2 col-md-8 col-md-offset-2">
                        <h4 style={style.title}>{this.props.object.title} FORM</h4>
                        <hr />
                        {
                            bodyModal(this.props.object)
                        }
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

const bodyModal = (object) => {
    switch (object.title) {
        case 'ADD DEVICE':
            return <AddDevice object={object}/>;
        case 'ADD USER':
            return <AddUser object={object}/>;
        case 'UPDATE DEVICE':
            return <AddDevice object={object}/>;
        case 'UPDATE USER':
            return <AddUser object={object}/>;
        case 'ADD PLANT':
            return <AddPlant object={object}/>;
        case 'UPDATE PLANT':
            return <AddPlant object={object}/>;
        case 'ADD SENSOR':
            return <AddSensor object={object}/>;
        case 'UPDATE SENSOR':
            return <UpdateSensor object={object}/>;
        case 'ADD AREA':
            return <AddArea object={object}/>;
        case 'UPDATE AREA':
            return <UpdateArea object={object}/>;
    }
}

const style = {
    overview: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.4,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 99999
    },
    form: {
        position: 'absolute',
        top: '10%',
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        zIndex: 99999,
        animation: "0.5s",
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#5e8000',
    }
}