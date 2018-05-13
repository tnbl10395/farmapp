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
            <div style={this.props.sideBar ? style.sideBar_true : style.sideBar_false} className="row">
                {/* <div>
                    <Profile sideBar={this.props.sideBar} />
                    <div style={style.line}></div>
                </div> */}
                <div style={style.div_ul}>
                    <Element icon={'fa fa-tachometer'}
                             name={"Dashboard"}
                             link={""}
                             choose={this.props.admin_dashboard_component}
                             chooseOption={this.props.chooseOption}
                             sideBar={this.props.sideBar}
                    />
                    {
                        this.props.profile.role == "1" ?
                            <Element icon={'fa fa-users'}
                                     name={"User"}
                                     choose={this.props.admin_user_component}
                                     chooseOption={this.props.chooseOption}
                                     link={"user"}
                                     sideBar={this.props.sideBar}
                            />
                            : null
                    }
                    <Element icon={'fa fa-database'}
                             name={"Data"}
                             choose={this.props.admin_data_component}
                             chooseOption={this.props.chooseOption}
                             link={"data"}
                             sideBar={this.props.sideBar}
                    />
                    {/* {
                        this.props.profile.role == "0" ?
                            <Element icon={'fa fa-th-large'}
                                     name={"Area"}
                                     choose={this.props.admin_area_component}
                                     chooseOption={this.props.chooseOption}
                                     link={"area"}
                                     sideBar={this.props.sideBar}
                            />
                            : null
                    } */}
                    <Element icon={'fa fa-cogs'}
                             name={"Device"}
                             choose={this.props.admin_device_component}
                             chooseOption={this.props.chooseOption}
                             link={"device"}
                             sideBar={this.props.sideBar}
                    />
                    <Element icon={'fa fa-pagelines'}
                             name={"Plant"}
                             choose={this.props.admin_plant_component}
                             chooseOption={this.props.chooseOption}
                             link={"plant"}
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
        backgroundColor: '#222d32',
        top: 50,
        left: 0,
        right: 0,
        height: '100%',
        // opacity: 0.9,
    },
    // sideBar_false: {
    //     position: 'fixed',
    //     backgroundColor: '#222d32',
    //     top: 50,
    //     left: 0,
    //     width: 60,
    //     height: '100%',
    //     // opacity: 0.8,
    //     zIndex: 4,
    // },
    div_ul: {
        marginLeft: 35,
        marginTop: 10,
        listStyle: 'none',
        height: 46,
        width: '100%'
    },
    line: {
        backgroundColor: 'white',
        opacity: 0.3,
        width: '100%',
        height: 0.5
    },

}