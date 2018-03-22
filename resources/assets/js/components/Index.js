import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../containers/TopBarContainer';
import SideBar from '../containers/SideBarContainer';
import Content from '../components/Content';

import { HashRouter } from 'react-router-dom';
import Modal from '../templates/Modal';
import { Alert } from '../templates/Alert';

const profile = JSON.parse(sessionStorage.getItem('profile'));

export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDevicesOfUser();
    }

    render() {
        return (
            <HashRouter>
                <div className="container-fluid">
                    <img src="/images/farmintro.jpg" style={style.img} />
                    <TopBar />
                    <SideBar profile={profile} />
                    <Content sideBar={this.props.sideBar} 
                             profile={profile} />
                    {
                        this.props.modal ?
                            <Modal closeModal={this.props.closeModal}
                                object={this.props.object} />
                            : null
                    }
                    {
                        this.props.alert ?
                            <Alert closeAlert={this.props.closeAlert} 
                                   title={this.props.title} />
                            : null
                    }
                </div>
            </HashRouter>
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
        filter: 'blur(3px)',
        // maxWidth:'100%',
    }
}
