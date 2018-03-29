import React, { Component } from 'react';

export default class Loader extends React.Component{
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style.wrapper}>
                <div style={style.loader1}>
                    <div style={style.loader2}>
                        <div style={style.loader3}></div>
                    </div>
                </div>
            </div>
        )
    }
}

const style = {
    wrapper: {
        backgroundColor: 'black',
        position: 'fixed',
        width: '100%',
        height: '100%',
        zIndex: 1
    },
    loader1: {
        position: 'relative',
        left: '50%',
        top: '50%',
        height: '20vw',
        width: '20vw',
        margin: '-10vw 0px 0px -10vw',
        border: '3px solid transparent',
        borderTopColor: '#3498db',
        borderBottomColor: '#3498db',
        borderRadius: '50%',
        zIndex: 2,
        animation: 'spin 2s linear infinite'
    },
    loader2: {
        content: "",
        position: 'absolute',
        bottom: '2%',
        top: '2%',
        left: '2%',
        right: '2%',
        border: '3px solid transparent',
        borderTopColor: '#db213a',
        borderRadius: '50%',
        zIndex: 2,
        animation: 'spin 3s linear infinite'
    },
    loader3: {
        content: "",
        position: 'absolute',
        bottom: '5%',
        top: '5%',
        left: '5%',
        right: '5%',
        border: '3px solid transparent',
        borderTopColor: '#dec52d',
        borderRadius: '50%',
        zIndex: 2,
        animation: 'spin 1.5s linear infinite'
    }
}