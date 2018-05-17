import React, { Component } from 'react';
var Datetime = require('react-datetime');
import moment from 'moment';

export class AddAreaComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deviceId: '',
            name: '',
            disabled: true,

        }
        this.onSubmit = this.onSubmit.bind(this);
    }
    onChangeName(name) {
        this.setState({name: name.target.value});
        if(name.target.value == '') {
            this.setState({disabled: true});
        }else {
            this.setState({disabled: false});
        }
    }

    onSelectDevice(device) {
        this.setState({deviceId: device.target.value});
    }
    
    onSubmit(e) {
        e.preventDefault();
        this.props.onSubmitArea(this.state.deviceId, this.state.name);
    }

    render() {
        return (
            <div>
                {
                    this.props.messageSuccess ?
                        <div className="alert alert-success alert-dismissible fade in">
                            <a href="#" onClick={() => this.props.closeMessage()} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Success!</strong> The new area has just created!
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
                    <div className="col-md-12">
                        <div className="form-group col-md-6">
                            <label>Name</label>
                            <input type="text"
                                required
                                className="form-control"
                                placeholder="Please input name"
                                value={this.state.name}
                                onChange={(name) => this.onChangeName(name)} />
                        </div>
                        <div className="form-group col-md-6">
                            <label>Device</label>
                            <select className="form-control" onChange={(device) => this.onSelectDevice(device)}>
                                <option value={null}>Choose later</option>
                                {
                                    this.props.listDevices.map((element, index) => {
                                            return <option key={index} value={element.id}>{element.name}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                    <div className="col-md-12" style={styleForm.groupBtn}>
                        <hr />
                        <input type="submit" className="btn btn-success pull-right col-md-2" value="Save" style={{ marginRight: 10 }} disabled={this.state.disabled ? "disabled" : null} onClick={this.onSubmit} />
                        <input type="button" className="btn btn-default pull-right col-md-2" value="Cancel" style={{ marginRight: 10 }} onClick={() => this.props.closeModal()} />
                    </div>
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