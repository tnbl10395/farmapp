import React from 'react';
import 'font-awesome/css/font-awesome.css';

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div style={style.topBar} className="row">
                    <div style={style.divTitle} className="col-md-3 col-sm-3 col-3">
                        <p style={style.title}>LP<a href="/" style={style.a}>Farm</a></p>
                        <a onClick={() => this.props.openSidebar()} style={style.a_bar}><i className="fa fa-bars" /></a>
                    </div>
                    <a onClick={() => this.props.openAlert()} style={style.a_out}><i className="fa fa-sign-out" /></a>
                </div>
            </div>
        );
    }
}

var style = {
    topBar: {
        position: 'fixed',
        backgroundColor: 'black',
        width: '100%',
        height: 60,
        zIndex: 99999,
        boxShadow: "1px 7px 3px black",
        // opacity: 0.7,
    },
    divTitle: {
        position: 'fixed',
        height: 60,
    },
    title: {
        position: 'relative',
        fontWeight: 'bold',
        left: 20,
        color: 'green',
        fontSize: 35,
        float: 'left'
    },
    a: {
        color: 'white',
        textDecoration: 'none',
        fontWeight: 500,
    },
    a_bar: {
        cursor: 'pointer',
        position: 'relative',
        top: 5,
        left: 65,
        fontSize: 30,
        color: 'white'
    },
    a_out: {
        cursor: 'pointer',
        position: 'absolute',
        top: 15,
        right: 40,
        fontSize: 20,
        color: 'white'
    }

}