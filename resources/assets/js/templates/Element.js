import React, { Component } from 'react';
import 'font-awesome/css/font-awesome.css';
import { Link } from 'react-router-dom';

export class Element extends React.Component {
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
            <Link to={"/" + this.props.link} onClick={this.onclick.bind(this)} style={this.state.font ? style.font_true : style.font_false}>
                <div style={!this.props.choose ? style.div_li_true : style.div_li_false}
                    onMouseOver={!this.props.choose ? this.onmouseover.bind(this) : null}
                    onMouseOut={this.onmouseout.bind(this)}>
                    <i className={this.props.icon} style={style.icon} />{this.props.name}
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
    },
    div_li_false: {
        marginLeft: 20,
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