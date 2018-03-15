import React, { Component } from 'react';
import { InputText, InputPassword, SelectBox } from '../templates/InputForm';

export default class AddUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.submitForm(
            this.props.inputUsername,
            this.props.inputPassword,
            this.props.inputFullname,
            this.props.inputAddress,
            this.props.inputPhone,
            this.props.inputRole
        );
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="col-md-6">
                    <InputText
                        element={this.props.property[0]}
                        name={'USER_USERNAME'}
                        saveInput={this.props.saveInput} />
                    <InputPassword
                        element={this.props.property[1]}
                        name={'USER_PASSWORD'}
                        saveInput={this.props.saveInput} />
                </div>
                <div className="col-md-6">
                    <InputText
                        element={this.props.property[2]}
                        name={'USER_FULLNAME'}
                        saveInput={this.props.saveInput} />
                    <InputText
                        element={this.props.property[3]}
                        name={'USER_ADDRESS'}
                        saveInput={this.props.saveInput} />
                    <InputText
                        element={this.props.property[4]}
                        name={'USER_PHONE'}
                        saveInput={this.props.saveInput} />
                    <SelectBox
                        element={this.props.property[5]}
                        name={'USER_ROLE'}
                        saveInput={this.props.saveInput} />
                </div>
                <input type="submit" className="btn btn-success col-md-2" value="Add" />
            </form>
        );
    }
}