import React, { Component } from 'react';

export default class FinalFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: ''
        }
    }
        
    render() {
        return (
            <div style={style.body}>
                <div style={style.title}>
                    <h3 className="text-center" style={{ fontWeight:'900' }}>Your Preferences for Plant</h3>
                </div>
                <div style={style.closeBtn}><i className="fa fa-remove"></i></div>
                <div style={style.content} className="col-md-12">
                    <div className="col-md-3  col-md-offset-2">
                        {this.state.picture == '' ?  <img src="images/leaf.jpg" style={style.image}/> : <img src={'data:image/png;base64,' + this.state.picture} style={style.image}/>}
                        <div>
                            <h4 style={{ fontWeight:'900' }}>Description</h4>
                            <p></p>
                        </div>
                    </div>
                    <div className="col-md-5">
                        
                    </div>
                </div>
            </div>
        );
    }
}

const style = {
    body: {
        position: 'fixed',
        top: 0,
        bottom: 0,
        right: 0,
        left: 0, 
        backgroundColor: 'white',
        zIndex: 99999
    },
    title: {
        paddingBottom: 10,
        boxShadow: '0 1px 4px rgba(0,0,0,.15)'
    },
    closeBtn: {
        position: 'absolute',
        right: 35,
        fontSize: 30,
        top: 10,
        cursor: 'pointer'
    },
    content: {
        marginTop: 20,
    },
    image: {
        height: '150px',
        width: '100%',
        objectFit: 'cover',
        border: '2px dashed #e7ecf1',
        borderRadius: '5px'
    }
}