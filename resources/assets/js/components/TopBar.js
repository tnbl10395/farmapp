import React from 'react';
import 'font-awesome/css/font-awesome.css';

var w = window.innerWidth;
var h = window.innerHeight;

export const TopBar = () => (
    <div style={style.topBar} className="row">
        <div style={style.divTitle} className="col-md-3 col-sm-3 col-3">
            <p style={style.title}>LP<a href="" style={style.a}>Farm</a></p>
            <a href="" style={style.a_bar}><i className="fa fa-bars" /></a>
        </div>
    </div>
);

var style = {
    topBar: {
        position:'fixed',
        backgroundColor: 'black',
        width:'100%',
        height: 60, 
        // opacity: 0.7,
    },
    divTitle: {
        position:'fixed',
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
        position: 'relative',
        top: 5,
        left: 65,
        fontSize: 30,
        color: 'white'
    }

}