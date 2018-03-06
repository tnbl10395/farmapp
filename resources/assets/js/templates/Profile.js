import React, { Component } from 'react';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.sideBar?style.overview_true:style.overview_false}>
                <div style={this.props.sideBar?style.avatar_true:style.avatar_false}>
                    <img src="/images/avatar.jpg" style={this.props.sideBar?style.avatar_true:style.avatar_false}/>
                </div>
            </div>
        );
    }
}

const style = {
    overview_true: {
        height: 170,
        width: '100%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:5,
    },
    overview_false: {
        height: 70,
        width: '100%',
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:5,
    },
    avatar_true: {        
        height:120,
        width:120,
        borderRadius: 100,
    },
    avatar_false: {        
        height:30,
        width:30,
        borderRadius: 100,
    }
}