import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';

export default class Element extends React.Component {
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
        this.props.chooseOption(this.props.link);
        this.setState({
            choose: false,
            font: true
        });
    }

    render() {
        return (
            <Link to={"/"+this.props.link} onClick={this.onclick.bind(this)} style={this.state.font ? style.font_true : style.font_false}>
                <div style={!this.props.choose ? style.div_li_true : style.div_li_false}
                    onMouseOver={!this.props.choose ? this.onmouseover.bind(this) : null}
                    onMouseOut={this.onmouseout.bind(this)}>
                    <i  className={this.props.icon} 
                        style={this.props.sideBar?style.icon_true:style.icon_false} />
                        {this.props.sideBar ? this.props.name : null}
                </div>
            </Link>
        )
    }
}

const style = {
    div_li_true: {
        marginLeft: 20,
        cursor: 'pointer',
        padding: 10,
        // fontSize: 24
    },
    div_li_false: {
        marginLeft: 20,
        cursor: 'pointer',
        padding: 10,
        backgroundColor: '#2ab27b',
    },
    icon_true: {
        marginRight: 25,
    },
    icon_false: {
        marginRight: 25,
        fontSize: 24
    },
    font_true: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: 'white',
        // fontSize: 24
    },
    font_false: {
        fontWeight: 'bold',
        textDecoration: 'none',
        color: '#2ab27b'
    }
}