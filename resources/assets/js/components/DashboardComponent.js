import React, { Component } from 'react';

export default class DashboardComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={style.body}>
                <div className="col-md-12">
                    <div className="col-sm-6 col-md-3">
                        <div style={{backgroundColor: '#00c0ef'}}>
                            <div style={{padding: 10, color: 'white'}}>
                                <h3 style={{fontSize: 38, fontWeight: 'bold', margin: '0px 0px 10px 20px', whiteSpace: 'nowrap', zIndex: 5}}>27</h3>
                                <p style={{fontSize: 15, margin: '0px 0px 10px 20px'}}>Humidity</p>
                            </div>
                            <div style={{transition: 'all .3s linear', position: 'absolute', top: -10, right: 30, zIndex: 0, fontSize: 90, color: 'rgba(0,0,0,0.15)'}}>
                                <i className="fa fa-tint" style={{display: 'inline-block', fontSize: 'inherit', textRendering: 'auto', fontSmoothing: 'antialiased'}}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6 col-md-3">Temperature</div>
                    <div className="col-sm-6 col-md-3">Latitude</div>
                    <div className="col-sm-6 col-md-3">Longitude</div>
                </div>
                <div className="col-md-12" style={{padding: 10}}>
                    <div className="col-md-6" style={{backgroundColor: 'red'}}>Real-Chart</div>
                    <div className="col-md-6" style={{backgroundColor: 'yellow'}}>Map</div>
                </div>
            </div>
        )
    }
}

const style = {
    body: {
        position: 'absolute', 
        top: 50, 
        right: 0, 
        left: 0, 
    }
}