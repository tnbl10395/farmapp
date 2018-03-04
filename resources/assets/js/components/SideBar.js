import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import { Element } from "../templates/Element";
import { Link } from 'react-router-dom';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div style={style.sideBar} className="row">
                <div style={style.div_ul}>
                    <Link to="/devices"><Element icon={'fa fa-home'} name={"Manage Devices"}/></Link>
                    <Link to="/user"><Element  icon={'fa fa-rocket'} name={"Manage User"}/></Link>
                    <Link to="/data"><Element icon={'fa fa-coffee'} name={"Manage Data"}/></Link>
                    <Link to="/solution"><Element  icon={'fa fa-rocket'} name={"Manage Solution"}/></Link>
                </div>
            </div>
        )
    }
}

var style = {
    sideBar: {
        position: 'fixed',
        backgroundColor: 'black',
        top:60,
        left:0,
        width: 220,
        height: '100%',
        float:'left',
        opacity:0.8,
        zIndex: 1,
    },
    div_ul: {
        listStyle: 'none',
    },
}