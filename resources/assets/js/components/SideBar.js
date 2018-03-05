import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import { Element } from "../templates/Element";

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        var url = window.location.toString();
        var str = url.indexOf('/#/');
        this.props.loadContent(url.slice(str+3));
    }

    render() {
        return (
            <div style={style.sideBar} className="row">
                <div style={style.div_ul}>
                    <Element icon={'fa fa-home'}
                        name={"Manage Devices"}
                        choose={this.props.admin_device_component}
                        chooseOption={this.props.chooseOption}
                        link={"device"} />
                    <Element icon={'fa fa-home'}
                        name={"Manage User"}
                        choose={this.props.admin_user_component}
                        chooseOption={this.props.chooseOption}
                        link={"user"} />
                    <Element icon={'fa fa-home'}
                        name={"Manage Data"}
                        choose={this.props.admin_data_component}
                        chooseOption={this.props.chooseOption}
                        link={"data"} />
                    <Element icon={'fa fa-home'}
                        name={"Manage Solution"}
                        choose={this.props.admin_solution_component}
                        chooseOption={this.props.chooseOption}
                        link={"solution"} />

                </div>
            </div>
        )
    }
}

var style = {
    sideBar: {
        position: 'fixed',
        backgroundColor: 'black',
        top: 60,
        left: 0,
        width: 220,
        height: '100%',
        float: 'left',
        opacity: 0.8,
        zIndex: 1,
    },
    div_ul: {
        listStyle: 'none',
    },
}