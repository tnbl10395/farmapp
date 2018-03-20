import React, { Component } from 'react';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

export class Alert extends React.Component {
    constructor(props) {
        super(props)
    }

    render () {
        return (
            <div>
                <div style={style.overview} onClick={() => this.props.closeAlert()}></div>
                <StyleRoot>
                    <div style={style.alert} className="col-xs-6 col-xs-offset-3 col-sm-6 col-sm-offset-3  col-md-4 col-md-offset-4">
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

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
        cursor: 'pointer'
    },
    alert: {
        position: 'absolute',
        top: '15%',
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        zIndex: 99999,
        animation: "0.5s",
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
}
