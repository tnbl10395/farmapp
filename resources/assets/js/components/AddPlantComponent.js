import React, { Component } from 'react';
import { InputText, InputCalendar } from '../templates/InputForm';

export class AddPlantComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNextPage: false,
            phaseInput: '',
            disabledNext: true,
            disabledSave: false,
            phases: [],
            plantName: '',
            description: '',
            picture: '',
            plant: {
                name: '',
                description: ''
            },
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
    }

    onChangePlantName(plant) {
        this.setState({
            plantName: plant.target.value
        });
        if (plant.target.value != '' && this.state.phaseInput > 0 && this.state.phaseInput < 11) this.setState({ disabledNext: false });
        else this.setState({ disabledNext: true }); 
    }

    onChangePhaseInput(phase) {
        this.setState({ phaseInput: phase.target.value })
        if (phase.target.value > 0 && phase.target.value < 11 && this.state.plantName != '') {
            this.setState({
                disabledNext: false,
            });
        } else {
            this.setState({
                disabledNext: true,
            });
        }
    }

    onClickNextPage() {
        var array = [];
        for (var i = 1; i <= this.state.phaseInput; i++) {
            array.push({
                key: i,
                name: '',
                days: '',
                minTemperature: '',
                maxTemperature: '',
                minHumidity: '',
                maxHumidity: '',
            });
        }
        this.setState({
            disabledSave: true,
            isNextPage: true,
            phases: array,
            plant: {
                name: this.state.plantName,
                description: this.state.description
            },
        });
    }

    onClickPreviousPage() {
        this.setState({
            isNextPage: false
        })
    }

    onChangePhaseName(phaseName, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].name = phaseName.target.value;
            if (phaseName.target.value == '') {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
            this.setState({
                phases: array,
            })
        }
    }

    onChangeDescription(description) {
        this.setState({
            description: description.target.value,
        });
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

    onChangeDays(days, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].days = days.target.value;
            this.setState({
                phases: array
            });
            if (days.target.value == '') {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
        }
    }

    onChangeMinTemperature(minTemperature, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].minTemperature = minTemperature.target.value;
            this.setState({
                phases: array
            });
            if (minTemperature.target.value >= array[key - 1].maxTemperature) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
        }
    }

    onChangeMaxTemperature(maxTemperature, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].maxTemperature = maxTemperature.target.value;
            this.setState({
                phases: array
            })
            if (maxTemperature.target.value <= array[key - 1].minTemperature) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
        }
    }

    onChangeMinHumidity(minHumidity, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].minHumidity = minHumidity.target.value;
            this.setState({
                phases: array
            });
            if (minHumidity.target.value >= array[key - 1].maxHumidity) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
        }
    }

    onChangeMaxHumidity(maxHumidity, key) {
        var array = this.state.phases;
        if (key == this.state.phases[key - 1].key) {
            array[key - 1].maxHumidity = maxHumidity.target.value;
            this.setState({
                phases: array
            });
            if (maxHumidity.target.value <= array[key - 1].minHumidity) {
                this.setState({disabledSave: true});
            }else {
                this.setState({disabledSave: false});
                this.checkNull();
                this.checkGreaterAndLess();
                this.checkLess0Than();
                this.checkHumidityLess0Than();
            }
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.submit(this.state.plant, this.state.phases, this.state.picture);
        this.props.closeModal();
    }

    checkNull () {
        for(let i = 0; i < this.state.phaseInput; i++) {
            if (this.state.phases[i].name == '' || this.state.phases[i].days == '' ||
                this.state.phases[i].minTemperature == '' || this.state.phases[i].maxTemperature == '' ||
                this.state.phases[i].minHumidity == '' || this.state.phases[i].maxHumidity == '') {
                    this.setState({disabledSave: true});
                }
        }
    }

    checkGreaterAndLess () {
        for(let i = 0; i < this.state.phaseInput; i++) {
            if (this.state.phases[i].minTemperature >= this.state.phases[i].maxTemperature ||
                this.state.phases[i].minHumidity >= this.state.phases[i].maxHumidity) {
                    this.setState({disabledSave: true});
            }
        }
    }

    checkHumidityLess0Than () {
        for(let i = 0; i < this.state.phaseInput; i++) {
            if (this.state.phases[i].minHumidity < 0 || this.state.phases[i].maxHumidity < 0) {
                this.setState({disabledSave: true});
            }
        }
    }

    checkLess0Than () {
        for(let i = 0; i < this.state.phaseInput; i++) { 
            if (this.state.phases[i].days < 1) {
                this.setState({disabledSave: true});
            }
        }
    }

    render() {
        return (
            <div>
                {
                    this.props.messageSuccess ?
                        <div className="alert alert-success alert-dismissible fade in">
                            <a href="#" onClick={() => this.props.closeMessage()} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Success!</strong> The new user has just created!
                            </div>
                        : null
                }
                {
                    this.props.messageFail ?
                        <div className="alert alert-danger alert-dismissible fade in">
                            <a href="#" onClick={() => this.props.closeMessage()} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Fail!</strong> You should check code!
                            </div>
                        : null
                }
                <form style={styleForm.body}>
                    {
                        !this.state.isNextPage
                            ? <div>
                                <div className="col-md-5" style={{ textAlign: 'center' }}>
                                    <label style={styleForm.image}>
                                        {this.state.picture == '' ?  null :  <img src={this.state.picture} style={styleForm.image}/>}
                                        {this.state.picture != '' ? null : <i className="fa fa-upload" style={{ fontSize: 60, marginTop: 35 }}></i>}
                                        <input type="file" className="form-control" style={{ display: 'none' }} accept="image/*" onChange={this.onFileChange}/>
                                    </label>
                                    Click to open the file picker
                                </div>
                                <div className="col-md-7">
                                    <div className="form-group col-md-12">
                                        <label>Plant</label>
                                        <input type="text"
                                            required
                                            className="form-control"
                                            placeholder="Please input name"
                                            value={this.state.plantName}
                                            onChange={(plant) => this.onChangePlantName(plant)} />
                                        {
                                            this.state.plantName == '' 
                                                ? null
                                                : <a className="pull-right" href={"https://en.wikipedia.org/wiki/"+this.state.plantName}>Do you need help?</a>
                                        }
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Phase</label>
                                        <input type="number"
                                            min="1" step="1"
                                            required
                                            className="form-control"
                                            placeholder="Please input total phase"
                                            value={this.state.phaseInput}
                                            onChange={(phase) => this.onChangePhaseInput(phase)} />
                                        <span style={styleForm.description}> Phase should be from 1 to 10</span>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Description</label>
                                        <textarea type="text"
                                            required
                                            className="form-control"
                                            placeholder="Please input description"
                                            value={this.state.description}
                                            onChange={(description) => this.onChangeDescription(description)} />
                                    </div>
                                </div>
                            </div>
                            : <div className="col-md-12">
                                <div style={styleForm.bodyNextPage}>
                                    {
                                        this.state.phases.map(phase => {
                                            return <div className={this.state.phaseInput == 1 ? "col-md-12" : "col-md-12"} key={phase.key} style={{ border: '1px solid #3598dc', marginBottom: 20, padding: 0 }}>
                                                <div className="col-md-12" style={{ backgroundColor: '#3598dc', padding: 0 }}>
                                                    <label style={{ margin: 10, color: 'white' }}>Phase {phase.key}</label>
                                                </div>
                                                <div className="form-group col-md-8">
                                                    <label className="form-label">Phase name</label>
                                                    <input type="text" className="form-control" placeholder="Phase name" required value={phase.phaseName} onChange={(phaseName) => this.onChangePhaseName(phaseName, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className="form-label">Days</label>
                                                    <input type="number" className="form-control" min="1" max="10" placeholder="Days" required value={phase.days} onChange={(days) => this.onChangeDays(days, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Min Temperature</label>
                                                    <input type="number" className="form-control" placeholder="Min Temperature" required value={phase.minTemperature} onChange={(minTemperature) => this.onChangeMinTemperature(minTemperature, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Max Temperature</label>
                                                    <input type="number" className="form-control" placeholder="Max Temperature" required value={phase.maxTemperature} onChange={(maxTemperature) => this.onChangeMaxTemperature(maxTemperature, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Min Humidity</label>
                                                    <input type="number" className="form-control" placeholder="Min Humidity" required value={phase.minHumidity} onChange={(minHumidity) => this.onChangeMinHumidity(minHumidity, phase.key)} />
                                                </div>
                                                <div className="form-group col-md-3">
                                                    <label className="form-label">Max Humidity</label>
                                                    <input type="number" className="form-control" placeholder="Max Humidity" required value={phase.maxHumidity} onChange={(maxHumidity) => this.onChangeMaxHumidity(maxHumidity, phase.key)} />
                                                </div>
                                            </div>
                                        })
                                    }
                                </div>
                            </div>
                    }
                    <div className="col-md-12" style={styleForm.groupBtn}>
                        <hr />
                        {this.state.isNextPage ? <input type="submit" className="btn btn-success pull-right col-md-2" value="Save" style={{ marginRight: 10 }} onClick={this.onSubmit} disabled={this.state.disabledSave ? 'disabled' : ''}/> : null}
                        {!this.state.isNextPage ? <input type="button" className="btn btn-success pull-right col-md-2" value="Next" style={{ marginRight: 10 }} disabled={this.state.disabledNext ? 'disabled' : ''} onClick={() => this.onClickNextPage()} /> : null}
                        {this.state.isNextPage ? <input type="button" className="btn btn-default pull-right col-md-2" value="Previous" style={{ marginRight: 10 }} onClick={() => this.onClickPreviousPage()} /> : null}
                        <input type="button" className="btn btn-default pull-right col-md-2" value="Cancel" style={{ marginRight: 10 }} onClick={() => this.props.closeModal()} />
                    </div>
                </form>
            </div>
        )
    }
}

const styleForm = {
    body: {
        // position: 'fixed',
        // top: '10%',
        // zIndex: 5,
        // backgroundColor: 'white',
        // boxShadow: '0 5px 15px rgba(0,0,0,.5)'
    },
    groupBtn: {
        marginBottom: 20
    },
    bodyNextPage: {
        height: 300,
        overflow: 'auto'
    },
    description: {
        padding: 0,
        margin: 0,
        lineHeight: '13px',
        color: '#9eacb4',
        fontSize: '13px',
        fontWeight: 400,
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