import React, { Component } from 'react';
import { InputText, InputCalendar } from '../templates/InputForm';

export class AddDeviceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmitAdmin = this.handleSubmitAdmin.bind(this);
        this.handleSubmitUser = this.handleSubmitUser.bind(this);
    }

    handleSubmitAdmin(e) {
        e.preventDefault();
        var getDate = new Date(this.props.inputDate);
        var month = (getDate.getMonth() + 1 < 10) ? "0" + (getDate.getMonth() + 1) : getDate.getMonth();
        var day = (getDate.getDate() < 10) ? "0" + getDate.getDate() : getDate.getDate();
        var year = getDate.getFullYear();
        var date = year + "-" + month + "-" + day;
        if (this.props.object.title == 'ADD DEVICE') {
            this.props.submitFormAdmin(this.props.inputName, date, this.props.inputCode);
        }else {
            var object = {
                name: this.props.inputName,
                code: this.props.inputCode,
                manufacturing_date: date
            } 
            this.props.updateFormAdmin(this.props.id, object);
        }
    }

    handleSubmitUser(e) {
        e.preventDefault();
        if (this.props.object.title == 'ADD DEVICE') {
            this.props.submitFormUser(this.props.inputCode);
        }else {
            this.props.updateFormUser(this.props.id, this.props.inputCode);
        }
    }

    render() {
        return (
            this.props.object.property.length > 1 ?
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
                    <form onSubmit={this.handleSubmitAdmin}>
                            <InputText
                                element={this.props.object.property[0]}
                                name={'DEVICE_NAME'}
                                inputValue={this.props.inputName}
                                saveInput={this.props.saveInput} />
                            <InputText
                                element={this.props.object.property[1]}
                                name={'DEVICE_CODE'}
                                inputValue={this.props.inputCode}
                                saveInput={this.props.saveInput} />
                            <InputCalendar
                                element={this.props.object.property[2]}
                                name={'DEVICE_DATE'}
                                inputDate={this.props.inputDate}
                                saveInput={this.props.saveInput} />
                        <input type="submit" className="btn btn-success col-md-2" 
                               value={this.props.object.title == 'ADD DEVICE' ? 'Add' : 'Update'} style={{ marginRight: 10 }}/>
                        <input type="button" onClick={() => this.props.closeModal()} className="btn btn-default col-md-2" value="Cancel" />
                    </form>
                </div>
                :
                <div>
                    {
                        this.props.messageSuccess ?
                            <div className="alert alert-success alert-dismissible fade in">
                                <a href="#" onClick={() => this.props.closeMessage()} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                                <strong>Success!</strong> The new device has just added!
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
                    <form onSubmit={this.handleSubmitUser}>
                        <div>
                            <InputText
                                element={this.props.object.property[0]}
                                name={'DEVICE_CODE'}
                                inputValue={this.props.inputCode}
                                saveInput={this.props.saveInput} />
                        </div>
                        <input type="submit" className="btn btn-success col-md-2" 
                               value={this.props.object.title == 'ADD DEVICE' ? 'Add' : 'Update'} style={{ marginRight: 10 }}/>
                        <input type="button" onClick={() => this.props.closeModal()} className="btn btn-default col-md-2" value="Cancel" />
                    </form>
                </div>
        )
    }
}
