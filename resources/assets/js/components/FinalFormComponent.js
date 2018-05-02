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
                    <h3 className="text-center text-uppercase" style={{ fontWeight: '900' }}>Edit Information Plant</h3>
                </div>
                <div style={style.closeBtn}><i className="fa fa-remove"></i></div>
                <div style={style.content} className="col-md-12">
                    <div className="col-md-3 col-md-offset-1">
                        {this.state.picture == '' ? <img src="images/leaf.jpg" style={style.image} /> : <img src={'data:image/png;base64,' + this.state.picture} style={style.image} />}
                        <div>
                            <h4 style={{ fontWeight: '900' }}>Description</h4>
                            <p></p>
                        </div>
                    </div>
                    <div className="col-md-3" style={{ overflowY: 'auto'}}>
                        <div className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0 }}>
                            <div className="col-md-12" style={{ backgroundColor: '#3598dc', padding: 0 }}>
                                <label style={{ margin: 10, color: 'white' }}>Phase 1</label>
                            </div>
                            <div className="form-group col-md-8">
                                <label className="form-label">Phase name</label>
                                <input type="text" className="form-control" placeholder="Phase name" required onChange={(phaseName) => this.onChangePhaseName(phaseName, 1)} />
                            </div>
                            <div className="form-group col-md-4">
                                <label className="form-label">Days</label>
                                <input type="number" className="form-control" min="1" max="10" placeholder="Days" required onChange={(days) => this.onChangeDays(days, 1)} />
                            </div>
                            <div className="form-group col-md-3">
                                <label className="form-label">Min Temperature</label>
                                <input type="number" className="form-control" placeholder="Min Temperature" required onChange={(minTemperature) => this.onChangeMinTemperature(minTemperature, 1)} />
                            </div>
                            <div className="form-group col-md-3">
                                <label className="form-label">Max Temperature</label>
                                <input type="number" className="form-control" placeholder="Max Temperature" required onChange={(maxTemperature) => this.onChangeMaxTemperature(maxTemperature, 1)} />
                            </div>
                            <div className="form-group col-md-3">
                                <label className="form-label">Min Humidity</label>
                                <input type="number" className="form-control" placeholder="Min Humidity" required onChange={(minHumidity) => this.onChangeMinHumidity(minHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-3">
                                <label className="form-label">Max Humidity</label>
                                <input type="number" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <input className="btn btn-success col-md-3 pull-right" value="Save" style={{marginLeft: 10}}/>
                                <input className="btn btn-default col-md-4 pull-right" value="Show Solution"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                    <div className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0 }}>
                            <div className="col-md-12" style={{ padding: 0 }}>
                                <label style={{ margin: 10, color: 'black' }}>Solution of Phase 1</label>
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <label className="form-label">Max Humidity</label>
                                <input type="input" className="form-control" placeholder="Max Humidity" required onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                            </div>
                            <div className="form-group col-md-12">
                                <input className="btn btn-success col-md-3 pull-right" value="Save"/>
                            </div>
                        </div>
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
        boxShadow: '0 1px 2px rgba(0,0,0,.15)'
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