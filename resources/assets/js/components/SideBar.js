import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';

var h = window.innerHeight;
var w = window.innerWidth;

export default class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div style={style.sideBar} className="row">
                <div style={style.div_ul}>
                    <Element choose={this.state.element_1} icon={'fa fa-home'} name={"Table"} />
                    <Element choose={this.state.element_2} icon={'fa fa-rocket'} name={"Form"} />
                    <Element choose={this.state.element_2} icon={'fa fa-coffee'} name={"Chart"} />
                </div>
            </div>
        )
    }
}

class Element extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            font: true,
            choose: true,
        }
    }

    onmouseover() {
        this.setState({
            font: false
        })
    }

    onmouseout() {
        this.setState({
            font: true
        })
    }

    onclick() {
        this.setState({
            choose: false,
            font: true
        });
    }

    render() {
        return (
            <div style={this.state.choose ? style.div_li_true : style.div_li_false}
                onMouseOver={this.state.choose ? this.onmouseover.bind(this) : null}
                onMouseOut={this.onmouseout.bind(this)}
                onClick={this.onclick.bind(this)}>
                <a href="#" style={this.state.font ? style.font_true : style.font_false}>
                    <i className={this.props.icon} style={style.icon} />{this.props.name}
                </a>
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
        opacity:0.8
    },
    div_ul: {
        listStyle: 'none',
    },
    div_li_true: {
        marginLeft:20,
        cursor: 'pointer',
        padding: 10,
    },
    div_li_false: {
        marginLeft:20,
        cursor: 'pointer',
        padding: 10,
        backgroundColor: 'green',
    },
    icon: {
        marginRight: 25,
    },
    font_true: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'white'
    },
    font_false: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'green'
    }
}