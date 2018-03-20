import React, { Component } from 'react';
import { InputText, InputCalendar } from '../templates/InputForm';

export class AddDeviceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var getDate = new Date(this.props.inputDate);
        var month = (getDate.getMonth() + 1 < 10) ? "0" + (getDate.getMonth() + 1) : getDate.getMonth();
        var day = (getDate.getDate() < 10) ? "0" + getDate.getDate() : getDate.getDate();
        var year = getDate.getFullYear();
        var date = year + "-" + month + "-" + day;
        this.props.submitForm(this.props.inputName, date, this.props.inputCode);
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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
        )
    }
}

