import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import TopBar from '../containers/TopBarContainer';
import SideBar from '../containers/SideBarContainer';
import Content from '../components/Content';
import { HashRouter } from 'react-router-dom';


export default class Index extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        this.props.getDevicesOfUser();
    }

    render() {
        return (
            <HashRouter>
                <div className="container-fluid">
                    <img src="/images/background-farm.jpg" style={style.img} />
                    <TopBar />
                    <SideBar />
                    <Content sideBar={this.props.sideBar}/>
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
        filter: 'blur(3px)'
    }
}
