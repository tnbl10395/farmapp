import React, { Component } from 'react';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import { TopBar } from '../components/TopBar';

export default class Example extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid">
                    <img src={require('../background.jpg')} style={style.img}/>
                    <TopBar />
                    <SideBar />
                    <Content />
            </div>
        );
    }
}

var style = {
    img: {
        position: 'fixed',
        // opacity: 0.8,
        left:0,
        top:0,
        bottom:0,
        right:0,
    }
}