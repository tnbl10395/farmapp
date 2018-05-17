import React, { Component } from 'react';
var Datetime = require('react-datetime');
import moment from 'moment';

const profile = JSON.parse(sessionStorage.getItem('profile'));

export class UpdateSensorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: this.props.object.element.picture,
            name: this.props.object.element.sensorName,
            code: this.props.object.element.code,
            spec: this.props.object.element.specification,
            date: this.props.object.element.manufacturing_date,
            madeIn: this.props.object.element.madeIn,
            deviceId: this.props.object.element.deviceId,
            id: this.props.object.element.id,
            disabled: false
        }
        this.onSubmit = this.onSubmit.bind(this);
        this.onFileChange = this.onFileChange.bind(this);
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
            }); 
        }
        
        reader.readAsDataURL(file);
    }

    onChangeName(name) {
        this.setState({name: name.target.value});   
        if (name.target.value == '') {
            this.setState({
                disabled: true
            });   
        }else {
            this.setState({
                disabled: false
            });
            this.checkNull();
        }
    }

    onChangeCode(code) {
        this.setState({code: code.target.value});   
        if (code.target.value == '') {
            this.setState({
                disabled: true
            });   
        }else {
            this.setState({
                disabled: false
            });
            this.checkNull();
        }
    }

    onChangeSpec(spec) {
        this.setState({
            spec: spec.target.value,
        });
        this.checkNull();
    }

    onChangeDate(date) {
        this.setState({
            date: date._d
        })
        this.checkNull();
    }

    onChangeMadeIn(madeIn) {
        this.setState({madeIn: madeIn.target.value});   
        if (madeIn.target.value == '') {
            this.setState({
                disabled: true
            });   
        }else {
            this.setState({
                disabled: false
            });
            this.checkNull();
        }
    }

    checkNull() {
        if (this.state.name == '' || this.state.code == '' || this.state.madeIn == '') {
            this.setState({disabled: true});
        }
    }

    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmitSensor(this.state.id, this.state.deviceId, this.state.name, this.state.spec, this.state.date, this.state.madeIn, this.state.picture, this.state.code);
    }

    render() {
        return (
            <div>
                {
                    this.props.messageSuccess ?
                        <div className="alert alert-success alert-dismissible fade in">
                            <a href="#" onClick={() => this.props.closeMessage()} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Success!</strong> The new sensor has just updated!
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
                        <div>
                            <div className="col-md-5" style={{ textAlign: 'center' }}>
                                <label style={styleForm.image}>
                                    {this.state.picture == '' ?  null :  <img src={this.state.picture} style={styleForm.image}/>}
                                    {this.state.picture != '' ? null : <i className="fa fa-cogs" style={{ fontSize: 60, marginTop: 35 }}></i>}
                                    <input type="file" className="form-control" style={{ display: 'none' }} accept="image/*" onChange={this.onFileChange}/>
                                </label>
                                Click to open the file picker
                            </div>
                            <div className="col-md-7">
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input name"
                                        value={this.state.name}
                                        disabled={profile.role == '0' ? 'disabled' : ''}
                                        onChange={(name) => this.onChangeName(name)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Code</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input code"
                                        value={this.state.code}
                                        disabled={profile.role == '0' ? 'disabled' : ''}
                                        onChange={(code) => this.onChangeCode(code)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Made In</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input where sensor is made"
                                        value={this.state.madeIn}
                                        disabled={profile.role == '0' ? 'disabled' : ''}
                                        onChange={(madeIn) => this.onChangeMadeIn(madeIn)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Manufacturing Date</label>
                                    {
                                        profile.role == '1'
                                            ?   <Datetime
                                                    timeFormat={false}
                                                    isValidDate={valid}
                                                    value={this.state.date}
                                                    onChange={(date) => this.onChangeDate(date)}
                                                />
                                            :    <input type="text"
                                                    required
                                                    className="form-control"
                                                    value={this.state.date}
                                                    disabled='disabled'
                                                    onChange={(madeIn) => this.onChangeDate(madeIn)} />
                                    }
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Technical Specification</label>
                                    <textarea type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input specification"
                                        value={this.state.spec}
                                        rows="3"
                                        disabled={profile.role == '0' ? 'disabled' : ''}
                                        onChange={(spec) => this. onChangeSpec(spec)} />
                                </div>
                            </div>
                        </div>
                        {
                            profile.role == '1'
                                ?    <div className="col-md-12" style={styleForm.groupBtn}>
                                        <hr />
                                        <input type="submit" className="btn btn-success pull-right col-md-2" value="Save" style={{ marginRight: 10 }} disabled={this.state.disabled ? "disabled" : null} onClick={this.onSubmit} />
                                        <input type="button" className="btn btn-default pull-right col-md-2" value="Cancel" style={{ marginRight: 10 }} onClick={() => this.props.closeModal()} />
                                    </div>
                                :  <div className="col-md-12" style={styleForm.groupBtn}>
                                        <hr />
                                        <input type="button" className="btn btn-default pull-right col-md-2" value="Cancel" style={{ marginRight: 10 }} onClick={() => this.props.closeModal()} />
                                    </div>
                        }

                </form>
            </div>
        );
    }
}

var today = Datetime.moment();
var valid = function (current) {
    return current.isBefore(today);
};

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