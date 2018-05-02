import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../containers/TopBarContainer';
import SideBar from '../containers/SideBarContainer';
import Content from '../components/Content';

import { HashRouter } from 'react-router-dom';
import Modal from '../templates/Modal';
import { Alert } from '../templates/Alert';
import FinalForm from '../containers/FinalFormContainer';

const profile = JSON.parse(sessionStorage.getItem('profile'));

export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getDevicesOfUser();
        this.props.getPlantsOfUser();
        this.props.getAllDevicesActive();
    }

    render() {
        return (
            <HashRouter>
                <div className="container-fluid">
                    <TopBar />
                    <div className="row">
                        <SideBar profile={profile} />
                        <Content sideBar={this.props.sideBar}
                                 profile={profile}
                                 breadcrumb={this.props.breadcrumb} />
                    </div>
                    {
                        this.props.modal ?
                            <Modal closeModal={this.props.closeModal}
                                   object={this.props.object} />
                            : null
                    }
                    {
                        this.props.alert ?
                            <Alert closeAlert={this.props.closeAlert}
                                   title={this.props.title}
                                   delete={this.props.delete}
                                   id={this.props.id} />
                            : null
                    }
                    <FinalForm />
                    {/* <div style={{borderTop: '1px #777 solid', position: 'fixed', bottom: 0, left: 210, right: 0, height: 50, zIndex: 3, alignItems: 'center'}}>
                        <h6>Enc © 2018 - Lewis</h6>
                    </div> */}
                </div>
            </HashRouter>
        );
    }
}

var style = {
    background: {
        background: '#ecf0f5',
        // opacity: 0.7,
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        // filter: 'contrast(200%)',
        // maxWidth:'100%',
    }
}
