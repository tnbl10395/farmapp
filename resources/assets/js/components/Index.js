import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { TopBar } from '../components/TopBar';
import SideBar from '../components/SideBar';
import Content from '../components/Content';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Route, Link, HashRouter } from 'react-router-dom';
import Reducer from '../providers/rootReducer';

const store = createStore(Reducer);

export default class Index extends Component {

    render() {
        return (
            <Provider store={store}>
                <HashRouter>
                    <div className="container-fluid">
                        <img src="/images/background-farm.jpg" style={style.img} />
                        <TopBar />
                        <SideBar />
                        <Content />
                    </div>
                </HashRouter>
            </Provider >
        );
    }
}

var style = {
    img: {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        filter: 'blur(3px)'
    }
}
