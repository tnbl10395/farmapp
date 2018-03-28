import React, { Component } from 'react';
import { InputText, InputCalendar, InputPassword, SelectBox } from '../templates/InputForm';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import AddDevice from '../containers/AddDeviceContainer';
import AddUser from '../containers/AddUserContainer';

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
                    <div style={style.form} className="col-xs-8 col-xs-offset-2 col-md-6 col-md-offset-3">
                        <h3 style={style.title}>{this.props.object.title} FORM</h3>
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
        top: '15%',
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