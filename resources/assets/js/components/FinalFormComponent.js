import React, { Component } from 'react';

export default class FinalFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: '',
            description: this.props.plant[0].description,
            namePlant: this.props.plant[0].name,
            phases: this.props.phases,
            phaseName: this.props.phases[0].name,
            solutions: this.props.solutions,
        }
        this.onFileChange = this.onFileChange.bind(this);
    }

    // componentWillMount() {
    //     this.props.getOneSolution(this.props.phases[0].id);
    // }

    onChangeDescription(description) {

    }

    getOneSolution(id, name) {
        this.props.getOneSolution(id);
        this.setState({ phaseName: name });
    }

    onFileChange(e, file) {
        var file = file || e.target.files[0],
        pattern = /image-*/,
        reader = new FileReader();
        
        if (!file.type.match(pattern)) {
            alert('Format invalid');
            return;
        }
        
        // this.setState({ loaded: false });
        
        reader.onload = (e) => {
            this.setState({ 
                picture: reader.result, 
                // loaded: true 
            }); 
        }
        
        reader.readAsDataURL(file);
    }

    render() {
        return (
            <div style={style.body}>
                <div style={style.title}>
                    <h3 className="text-center text-uppercase" style={{ fontWeight: '900' }}>Edit Information {this.state.namePlant} Plant</h3>
                </div>
                <div style={style.closeBtn} onClick={() => this.props.closeForm()}><i className="fa fa-remove"></i></div>
                <div style={style.content} className="col-md-12">
                    <div className="col-md-3" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <label style={style.image}>
                                {this.state.picture == '' ? null : <img src={this.state.picture} style={style.image}/>}
                                {this.state.picture != '' || this.props.plant[0].picture != null ? null : <i className="fa fa-upload" style={{ fontSize: 60, marginTop: 35 }}></i>}
                                {this.state.picture == '' && this.props.plant[0].picture != null ?  <img src={'data:image/png;base64,'+this.props.plant[0].picture} style={style.image} /> : null}
                                <input type="file" className="form-control" style={{ display: 'none' }} accept="image/*" onChange={this.onFileChange}/>
                            </label>
                            Click to open the file picker
                        </div>
                        <div style={{ height: '85%', overflow: 'auto' }}>
                            <h4 style={{ fontWeight: '900' }}>Description</h4>
                            <textarea type="text"
                                            required
                                            className="form-control"
                                            placeholder="Please input description"
                                            value={this.state.description}
                                            style={{ height: '50%' }}
                                            onChange={(description) => this.onChangeDescription(description)} />
                            <div className="form-group" style={{margin: 10}}>
                                <input type="submit" className="btn btn-success col-md-3 pull-right" value="Save"/>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5" style={{ height: "85%", overflow: 'auto' }}>
                        {
                            this.state.phases.map((element, index) => {
                                return  <div key={index} className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0}}>
                                            <div className="col-md-12" style={{ backgroundColor: '#3598dc', padding: 0 }}>
                                                <label style={{ margin: 10, color: 'white' }}>Phase {index + 1}</label>
                                            </div>
                                            <div className="form-group col-md-8">
                                                <label className="form-label">Phase name</label>
                                                <input type="text" className="form-control" placeholder="Phase name" required value={element.name} onChange={(phaseName) => this.onChangePhaseName(phaseName, 1)} />
                                            </div>
                                            <div className="form-group col-md-4">
                                                <label className="form-label">Days</label>
                                                <input type="number" className="form-control" min="1" max="10" placeholder="Days" value={element.days} required onChange={(days) => this.onChangeDays(days, 1)} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="form-label">Min Temperature</label>
                                                <input type="number" className="form-control" placeholder="Min Temperature" required value={element.minTemperature} onChange={(minTemperature) => this.onChangeMinTemperature(minTemperature, 1)} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="form-label">Max Temperature</label>
                                                <input type="number" className="form-control" placeholder="Max Temperature" required value={element.maxTemperature} onChange={(maxTemperature) => this.onChangeMaxTemperature(maxTemperature, 1)} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="form-label">Min Humidity</label>
                                                <input type="number" className="form-control" placeholder="Min Humidity" required value={element.minHumidity} onChange={(minHumidity) => this.onChangeMinHumidity(minHumidity, 1)} />
                                            </div>
                                            <div className="form-group col-md-3">
                                                <label className="form-label">Max Humidity</label>
                                                <input type="number" className="form-control" placeholder="Max Humidity" required value={element.maxHumidity} onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                                            </div>
                                            <div className="form-group col-md-12">
                                                <input type="submit" className="btn btn-success col-md-3 pull-right" value="Save" style={{marginLeft: 10}}/>
                                                <input type="button" className="btn btn-default col-md-4 pull-right" value="Show Solution" onClick={() => this.getOneSolution(element.id, element.name)}/>
                                            </div>
                                        </div>
                            })
                        }
                    </div>
                    <div className="col-md-4" style={{height: "85%"}}>
                        <div className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0, height: '100%' }}>
                            <div className="col-md-12" style={{ padding: 0 }}>
                                <label style={{ margin: 10, color: 'black' }}>Solution of {this.state.phaseName}</label>
                            </div>
                            <div className="col-md-12" style={{ padding: 0, height: "90%", overflow: 'auto' }}>
                                {
                                    this.props.solutions.map((element, index) => {
                                        return <div key={index}>
                                                    <div className="form-group col-md-12">
                                                        <label className="form-label">{checkStatus(element.statusTemperature, element.statusHumidity)}</label>
                                                        <textarea className="form-control" 
                                                            placeholder="" required
                                                            value={element.description} 
                                                            onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, 1)} />
                                                    </div>
                                                    <div className="form-group col-md-12">
                                                        <input type="submit" className="btn btn-success col-md-2 pull-right" value="Save" onClick={() => getOneSolution(element.id, element.name)}/>
                                                    </div>
                                                </div>
                                    })
                                }
                            </div>
                            {/* <div className="form-group col-md-12">
                                <input className="btn btn-success col-md-3 pull-right" value="Save"/>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const checkStatus = (temp, hum) => {
    if (temp == "-1" && hum == "-1") return "Less than Min Temperature and Less than Min Humidity";
    else if (temp == "-1" && hum == "0") return "Less than Min Temperature";
    else if (temp == "-1" && hum == "1") return "Less than Min Temperature and Greater than Max Humidity";
    else if (temp == "0" && hum == "-1") return "Less than Min Humidity";
    else if (temp == "1" && hum == "-1") return "Greater than Max Temperature and Less than Min Humidity";
    else if (temp == "0" && hum == "1") return "Greater than Max Humidity";
    else if (temp == "1" && hum == "0") return "Greater than Max Temperature";
    else if (temp == "1" && hum == "1") return "Greater than Max Temperature and Greater than Max Humidity";
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
        height: '100%'
    },
    image: {
        height: '150px',
        width: '100%',
        objectFit: 'cover',
        border: '2px dashed #e7ecf1',
        borderRadius: '5px',
        cursor: 'pointer'
    }
}