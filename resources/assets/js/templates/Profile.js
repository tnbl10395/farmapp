import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';

export default class Profile extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const user = JSON.parse(sessionStorage.getItem('profile'));
        return (
            <div style={this.props.sideBar ? style.overview_true : style.overview_false}>
                {/* <div style={this.props.sideBar?style.avatar_true:style.avatar_false}> */}
                <i className="fa fa-user-circle" style={this.props.sideBar ? style.avatar_true : style.avatar_false} />
                {
                    this.props.sideBar ?
                        <div>
                            <h4 style={style.textName}>{user.username}</h4>
                            <i className="fa fa-circle" style={style.dot} /><span style={style.text}>Online</span>
                        </div>
                        : null
                }
                {/* <img src="/images/avatar.jpg" style={this.props.sideBar?style.avatar_true:style.avatar_false}/> */}
                {/* </div> */}
            </div>
        );
    }
}

const style = {
    overview_true: {
        height: 80,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: 30,
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
        color: 'linear-gradient(to bottom, #007991, #78ffd6)',
        fontSize: 55
    },
    avatar_false: {
        color: 'linear-gradient(to bottom, #007991, #78ffd6)',
        fontSize: 30
    },
    dot: {
        color: '#5cb85c',
        marginRight: 5,
        marginLeft: 20
    },
    text: {
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold'
    },
    textName: {
        marginLeft: 20,
        color: 'white',
        fontWeight: 'bold'
    }
}