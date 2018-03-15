import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import Element from "../templates/Element";
import Profile from '../templates/Profile';

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var url = window.location.toString();
        var str = url.indexOf('/#/');
        this.props.loadContent(url.slice(str + 3));
    }

    render() {
        return (
            <div style={ this.props.sideBar ? style.sideBar_true : style.sideBar_false} className="row">
                <div>
                    <Profile sideBar={this.props.sideBar}/>
                    <div style={style.line}></div>
                </div>
                <div style={style.div_ul}>
                    <Element icon={'fa fa-cog'}
                        name={"Manage Devices"}
                        choose={this.props.admin_device_component}
                        chooseOption={this.props.chooseOption}
                        link={"device"} 
                        sideBar={this.props.sideBar}
                        />
                    <Element icon={'fa fa-users'}
                        name={"Manage User"}
                        choose={this.props.admin_user_component}
                        chooseOption={this.props.chooseOption}
                        link={"user"} 
                        sideBar={this.props.sideBar}
                        />
                    <Element icon={'fa fa-database'}
                        name={"Manage Data"}
                        choose={this.props.admin_data_component}
                        chooseOption={this.props.chooseOption}
                        link={"data"} 
                        sideBar={this.props.sideBar}
                        />
                    <Element icon={'fa fa-book'}
                        name={"Manage Solution"}
                        choose={this.props.admin_solution_component}
                        chooseOption={this.props.chooseOption}
                        link={"solution"} 
                        sideBar={this.props.sideBar}
                        />

                </div>
            </div>
        )
    }
}

var style = {
    sideBar_true: {
        position: 'fixed',
        backgroundColor: 'black',
        top: 60,
        left: 0,
        width: 220,
        height: '100%',
        float: 'left',
        opacity: 0.8,
        zIndex: 1,
        boxShadow: "1px 7px 3px black",
    },
    sideBar_false: {
        position: 'fixed',
        backgroundColor: 'black',
        top: 60,
        left: 0,
        width: 60,
        height: '100%',
        float: 'left',
        opacity: 0.8,
        zIndex: 1,
    },
    div_ul: {
        marginLeft: -5,
        listStyle: 'none',
    },
    line: {
        backgroundColor: 'white',
        opacity: 0.3,
        width: '100%',
        height: 0.5
    }
}