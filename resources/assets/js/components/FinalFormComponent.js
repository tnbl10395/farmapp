import React, { Component } from 'react';

const profile = JSON.parse(sessionStorage.getItem('profile'));

export default class FinalFormComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: this.props.plant[0].picture,
            description: this.props.plant[0].description,
            titlePlantName: this.props.plant[0].name,
            plantName: this.props.plant[0].name,
            phases: this.props.phases,
            solutions: this.props.solutions
        }
        this.onFileChange = this.onFileChange.bind(this);
        this.submitPlant = this.submitPlant.bind(this);
    }

    onChangePlantName(plantName) {
        if (plantName.target.value == '') {
            this.setState({ plantName: this.state.titlePlantName });
        }else {
            this.setState({ plantName: plantName.target.value });
        }
    }

    onChangeDescription(description) {
        this.setState({ description: description.target.value });
    }

    onFileChange(e, file) {
        var file = file || e.target.files[0],
            pattern = /image-*/,
            reader = new FileReader();

        if (!file.type.match(pattern)) {
            alert('Format invalid');
            return;
        }

        reader.onload = (e) => {
            this.setState({
                picture: reader.result,
                // loaded: true 
            });
        }

        reader.readAsDataURL(file);
    }

    submitPlant(e) {
        e.preventDefault();
        var data = {
            name: this.state.plantName,
            picture: this.state.picture,
            description: this.state.description,
        }
        this.props.updatePlant(data, this.props.plant[0].id);
        this.setState({titlePlantName: this.state.plantName});
    }

    onClose() {
        this.props.getPlantsOfUser();
        this.props.closeForm();
    }

    render() {
        return (
            <div style={style.body}>
                {
                    this.props.messageAlert ?
                        <Alert closeAlert={this.props.closeMessageAlert}/>
                        : null
                }
                <div style={style.title}>
                    <h3 className="text-center text-uppercase" style={{ fontWeight: '900' }}>{profile.role == "1"? null : "Edit" } Information of Plant: {this.state.titlePlantName}</h3>
                </div>
                <div style={style.closeBtn} onClick={() => this.onClose()}><i className="fa fa-remove"></i></div>
                {
                    this.props.messageSuccess ?
                        <div className="alert alert-success alert-dismissible fade in">
                            <a href="#" onClick={() => this.props.closeMessage()} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Success!</strong> The plant has just updated!
                        </div>
                        : null
                }
                <div style={style.content} className="col-md-12">
                    <div className="col-md-3" style={{ height: '100%' }}>
                        <div style={{ textAlign: 'center' }}>
                            <label style={style.image}>
                                {this.state.picture == null && this.props.plant[0].picture == null ? null : <img src={this.state.picture} style={style.image} />}
                                {this.state.picture != null || this.props.plant[0].picture != null ? null : <i className="fa fa-upload" style={{ fontSize: 60, marginTop: 35 }}></i>}
                                {this.state.picture == null && this.props.plant[0].picture != null ? <img src={this.props.plant[0].picture} style={style.image} /> : null}
                                <input type="file" className="form-control" style={{ display: 'none' }} accept="image/*" onChange={this.onFileChange} disabled={profile.role == "1" ? 'disabled' : ''}/>
                            </label>
                            {profile.role == "1" ? '' : 'Click to open the file picker'}
                        </div>
                        <div style={{ height: '85%', overflow: 'auto' }}>
                            <h4 style={{ fontWeight: '900' }}>Name</h4>
                            <input type="text"
                                required
                                className="form-control"
                                placeholder="Please input plant name"
                                value={this.state.plantName}
                                disabled={profile.role == "1" ? 'disabled' : ''}
                                onChange={(namePlant) => this.onChangePlantName(namePlant)} />
                            <h4 style={{ fontWeight: '900' }}>Description</h4>
                            <textarea type="text"
                                required
                                className="form-control"
                                placeholder="Please input description"
                                value={this.state.description}
                                rows="5"
                                disabled={profile.role == "1" ? 'disabled' : ''}
                                onChange={(description) => this.onChangeDescription(description)} />
                            <div className="form-group" style={{ marginTop: 10 }}>
                                {profile.role == "0" ? <input type="submit" className="btn btn-success col-md-3 pull-right" value="Save" onClick={this.submitPlant} /> : null}
                            </div>
                        </div>
                    </div>
                    <div className="col-md-5" style={{ height: "85%", overflow: 'auto' }}>
                        {
                            this.state.phases.map((element, index) => {
                                return <ItemPhase key={index}  index={index} element={element} updatePhase={this.props.updatePhase} getOneSolution={this.props.getOneSolution}/>
                            })
                        }
                    </div>
                    <div className="col-md-4" style={{ height: "85%" }}>
                        <div className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0, height: '100%' }}>
                            <div className="col-md-12" style={{ padding: 0 }}>
                                <label style={{ margin: 10, color: 'black' }}>Solution of {this.props.phaseName}</label>
                            </div>
                            <div className="col-md-12" style={{ padding: 0, height: "90%", overflow: 'auto' }}>
                                {
                                    this.props.solutions.map((element, index) => {
                                        return <ItemSolution key={index} element={element} updateSolution={this.props.updateSolution} phaseId={this.props.phaseId}/>
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

class ItemPhase extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.element.id,
            name: this.props.element.name,
            days: this.props.element.days,
            minTemperature: this.props.element.minTemperature,
            maxTemperature: this.props.element.maxTemperature,
            minHumidity: this.props.element.minHumidity,
            maxHumidity: this.props.element.maxHumidity,
            disabled: false,
        }
        this.submitPhase = this.submitPhase.bind(this);
        // this.checkNull = this.checkNull.bind(this);
        // this.checkGreaterAndLess =  this.checkGreaterAndLess.bind(this);
        // this.checkHumidityLess0Than = this.checkHumidityLess0Than.bind(this);
        // this.checkLess0Than = this.checkLess0Than.bind(this);
    }

    onChangePhaseName(name) {
        this.setState({name: name.target.value});
        if(name.target.value == '') {
            this.setState({disabled:true})
        }else {
            this.setState({disabled:false})
            this.checkHumidityLess0Than();
            this.checkNull();
            this.checkGreaterAndLess();
            this.checkLess0Than();
        }
    }

    onChangeDays(days) {
        this.setState({days: days.target.value});
        if(days.target.value == '') {
            this.setState({disabled:true})
        }else {
            this.setState({disabled:false})
            this.checkHumidityLess0Than();
            this.checkNull();
            this.checkGreaterAndLess();
            this.checkLess0Than();
        }
    }

    onChangeMinTemperature(minTemperature) {
        this.setState({minTemperature: minTemperature.target.value});
        if (minTemperature.target.value >= this.state.maxTemperature) {
            this.setState({disabled:true})
        }else {
            this.setState({disabled:false})
            this.checkHumidityLess0Than();
            this.checkNull();
            this.checkGreaterAndLess();
            this.checkLess0Than();
        }
    }

    onChangeMaxTemperature(maxTemperature) {
        this.setState({maxTemperature: maxTemperature.target.value});
        if (maxTemperature.target.value <= this.state.minTemperature) {
            this.setState({disabled:true})
        }else {
            this.setState({disabled:false})
            this.checkHumidityLess0Than();
            this.checkNull();
            this.checkGreaterAndLess();
            this.checkLess0Than();
        }
    }

    onChangeMinHumidity(minHumidity) {
        this.setState({minHumidity: minHumidity.target.value});
        if (minHumidity.target.value >= this.state.maxHumidity) {
            this.setState({disabled:true})
        }else {
            this.setState({disabled:false})
            this.checkHumidityLess0Than();
            this.checkNull();
            this.checkGreaterAndLess();
            this.checkLess0Than();
        }
    }

    onChangeMaxHumidity(maxHumidity) {
        this.setState({maxHumidity: maxHumidity.target.value});
        if (maxHumidity.target.value <= this.state.minHumidity) {
            this.setState({disabled:true});
        }else {
            this.setState({disabled:false})
            this.checkHumidityLess0Than();
            this.checkNull();
            this.checkGreaterAndLess();
            this.checkLess0Than();
        }
    }

    checkHumidityLess0Than () {
        if (this.state.maxHumidity < 0 || this.state.minHumidity < 0) this.setState({disabled:true});
    }

    checkNull () {
        if (this.state.name == '' || this.state.days == '' || 
            this.state.minTemperature == '' || this.state.maxTemperature == '' || 
            this.state.maxHumidity == '' || this.state.minHumidity == '') {
                this.setState({disabled: true});
            }
    }

    checkGreaterAndLess () {
        if (this.state.minTemperature >= this.state.maxTemperature || 
            this.state.minHumidity >= this.state.maxHumidity) {
                this.setState({disabled: true});
            }
    }

    checkLess0Than () {
        if (this.state.days < 1) {
            this.setState({disabled: true});
        }
    }

    submitPhase(e) {
        e.preventDefault();
        this.props.updatePhase(
            this.state.name, 
            this.state.days, 
            this.state.minTemperature, 
            this.state.maxTemperature, 
            this.state.minHumidity, 
            this.state.maxHumidity, 
            this.state.id
        );
    }

    render() {
        return (
            <div className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0 }}>
                <div className="col-md-12" style={{ backgroundColor: '#3598dc', padding: 0 }}>
                    <label style={{ margin: 10, color: 'white' }}>Phase {this.props.index + 1}</label>
                </div>
                <div className="form-group col-md-8">
                    <label className="form-label">Phase name</label>
                    <input type="text" className="form-control" placeholder="Phase name" required value={this.state.name} onChange={(phaseName) => this.onChangePhaseName(phaseName)} disabled={profile.role == "1" ? 'disabled' : ''}/>
                </div>
                <div className="form-group col-md-4">
                    <label className="form-label">Days</label>
                    <input type="number" className="form-control" placeholder="Days" value={this.state.days} required onChange={(days) => this.onChangeDays(days)} disabled={profile.role == "1" ? 'disabled' : ''}/>
                </div>
                <div className="form-group col-md-3">
                    <label className="form-label">Min Temperature</label>
                    <input type="number" className="form-control" placeholder="Min Temperature" required value={this.state.minTemperature} onChange={(minTemperature) => this.onChangeMinTemperature(minTemperature)} disabled={profile.role == "1" ? 'disabled' : ''}/>
                </div>
                <div className="form-group col-md-3">
                    <label className="form-label">Max Temperature</label>
                    <input type="number" className="form-control" placeholder="Max Temperature" required value={this.state.maxTemperature} onChange={(maxTemperature) => this.onChangeMaxTemperature(maxTemperature)} disabled={profile.role == "1" ? 'disabled' : ''}/>
                </div>
                <div className="form-group col-md-3">
                    <label className="form-label">Min Humidity</label>
                    <input type="number" className="form-control" placeholder="Min Humidity" required value={this.state.minHumidity} onChange={(minHumidity) => this.onChangeMinHumidity(minHumidity)} disabled={profile.role == "1" ? 'disabled' : ''}/>
                </div>
                <div className="form-group col-md-3">
                    <label className="form-label">Max Humidity</label>
                    <input type="number" className="form-control" placeholder="Max Humidity" required value={this.state.maxHumidity} onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity)} disabled={profile.role == "1" ? 'disabled' : ''} />
                </div>
                <div className="form-group col-md-12">
                    {profile.role == "0" ? <input type="submit" className="btn btn-success col-md-3 pull-right" value="Save" style={{ marginLeft: 10 }} onClick={this.submitPhase} disabled={this.state.disabled ? "disabled" : ""}/> : null}
                    <input type="button" className="btn btn-default col-md-4 pull-right" value="Show Solution" onClick={() => this.props.getOneSolution(this.state.id, this.state.name)} />
                </div>
            </div>
        );
    }
}

class Solution extends React.Component {
    constructor(props) {
        super(props);
        
    }

    render() {
        return (
            <div>
                
            </div>
        );
    }
    
}

class ItemSolution extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            solutionId: this.props.element.id,
            description: this.props.element.description,
        }
        this.submitSolution = this.submitSolution.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps, () => {
            this.setState({
                solutionId: nextProps.element.id,
                description: nextProps.element.description,
            })
        });
    }

    onChangeDescription(solution) {
        this.setState({ description: solution.target.value });
    }

    submitSolution(e) {
        e.preventDefault();
        this.props.updateSolution(this.state.description, this.state.solutionId, this.props.phaseId);
    }

    render() {
        return (
            <div>
                <div className="form-group col-md-12">
                    <label className="form-label">{checkStatus(this.props.element.statusTemperature, this.props.element.statusHumidity)}</label>
                    <textarea className="form-control"
                        placeholder="" required
                        value={this.state.description}
                        onChange={(solution) => this.onChangeDescription(solution)} disabled={profile.role == "1" ? 'disabled' : ''}/>
                </div>
                <div className="form-group col-md-12">
                    {profile.role == "1" ? null : <input type="submit" className="btn btn-success col-md-2 pull-right" value="Save" onClick={this.submitSolution} />}
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
        zIndex: 99995
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

//Alert
class Alert extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <div style={styleAlert.overview}></div>
                <div style={styleAlert.alert} className="col-xs-6 col-xs-offset-3 col-sm-6 col-sm-offset-3 col-md-4 col-md-offset-4">
                        <div style={{textAlign: 'center'}}>
                        <i className="fa fa-check-circle-o" style={styleAlert.icon}/>
                        <h3>Information of Plant is updated.</h3>
                    </div>
                    <hr />
                    <div className="row">
                        <button onClick={() => this.props.closeAlert()} className="btn btn-success col-xs-5 col-sm-5 col-md-4 col-xs-offset-1 col-sm-offset-1 col-md-offset-4">Continue</button>
                    </div>
                </div>
            </div>
        );
    }
    
}

const styleAlert = {
    overview: {
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'black',
        opacity: 0.4,
        zIndex: 99999,
    },
    alert: {
        position: 'fixed',
        top: '15%',
        padding: 20,
        borderRadius: 5,
        zIndex: 99999,
        backgroundColor: 'white',
    },
    icon: {
        fontSize: 100,
        color: '#2ab27b',
    },
    title: {
        fontWeight: 'bold'
    },
    content: {
        fontSize: 15
    }
}