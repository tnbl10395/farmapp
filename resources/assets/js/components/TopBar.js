import React from 'react';
import 'font-awesome/css/font-awesome.css';

const width = window.innerWidth;

export default class TopBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        // if (width <= 414) this.props.hideSideBar();
        // else this.props.showSideBar();
    }

    render() {
        return (
                <div style={style.topBar} className="row">
                    <div style={style.divTitle} className="col-md-3 col-sm-3 col-3">
                        <a href="/"><img src="/images/logo4.png" style={style.logo}/></a>
                        {/* <p style={style.title}>LP<a href="/" style={style.a}>Farm</a></p> */}
                        {/* <a onClick={() => this.props.openSidebar()} style={style.a_bar}>
                            {this.props.sideBar ? <i className="fa fa-caret-left" /> : <i className="fa fa-caret-right" />}
                        </a> */}
                    </div>
                    <a onClick={() => {
                        this.props.openAlert('LOGOUT', '');
                    }} style={style.a_out}><i className="fa fa-sign-out" /></a>
                </div>
        );
    }
}

var style = {
    topBar: {
        position: 'fixed',
        background: 'linear-gradient(to bottom, #007991, #78ffd6)',
        width: '100%',
        height: 50,
        zIndex: 90000,
        boxShadow: "1px 1px 1px black",
        // opacity: 0.8,
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
        fontSize: 20,
        color: 'white'
    },
    a_out: {
        cursor: 'pointer',
        position: 'absolute',
        top: 10,
        right: 40,
        fontSize: 20,
        color: 'white'
    },
    logo: {
        width: 100,
        marginLeft: 35,
        marginTop: 5
    }

}