import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from '../components/TopBar';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import { Provider } from 'react-redux';
import { createStore } from 'redux';

export default class Index extends Component {

    render() {
        return (
            <Provider>
                <div className="container-fluid">
                    <img src="/images/background.jpg" style={style.img} />
                    <TopBar />
                    <SideBar />
                    <Content />
                </div>
            </Provider>
        );
    }
}

// const store = createStore({
// });

var style = {
    img: {
        position: 'fixed',
        // opacity: 0.8,
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
    }
}
