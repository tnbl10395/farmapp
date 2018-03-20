import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={this.props.sideBar ? style.overview_true : style.overview_false}>
                {/* <div style={this.props.sideBar?style.avatar_true:style.avatar_false}> */}
                <i className="fa fa-user-circle" style={this.props.sideBar ? style.avatar_true : style.avatar_false} />
                {/* <img src="/images/avatar.jpg" style={this.props.sideBar?style.avatar_true:style.avatar_false}/> */}
                {/* </div> */}
            </div>
        );
    }
}

const style = {
    overview_true: {
        height: 170,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    overview_false: {
        height: 70,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5,
    },
    avatar_true: {
        color: 'green',
        fontSize: '8vw'
    },
    avatar_false: {
        color: 'green',
        fontSize: 30
    }
}