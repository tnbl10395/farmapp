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
        this.props.submitFormAdmin(this.props.inputName, date, this.props.inputCode);
    }

    handleSubmitUser(e) {
        e.preventDefault();
        this.props.submitFormUser(this.props.inputCode);
    }   

    render() {
        return (
            this.props.property.length > 1 ?
                <form onSubmit={this.handleSubmitAdmin}>
                    <div>
                        <InputText
                            element={this.props.property[0]}
                            name={'DEVICE_NAME'}
                            saveInput={this.props.saveInput} />
                        <InputText
                            element={this.props.property[1]}
                            name={'DEVICE_CODE'}
                            saveInput={this.props.saveInput} />
                        <InputCalendar
                            element={this.props.property[2]}
                            name={'DEVICE_DATE'}
                            inputDate={this.props.inputDate}
                            saveInput={this.props.saveInput} />
                    </div>
                    <input type="submit" className="btn btn-success col-md-2" value="Add" />
                </form>
                :
                <form onSubmit={this.handleSubmitUser}>
                    <div>
                        <InputText
                            element={this.props.property[0]}
                            name={'DEVICE_CODE'}
                            saveInput={this.props.saveInput} />
                    </div>
                    <input type="submit" className="btn btn-success col-md-2" value="Add" />
                </form>
        )
    }
}

