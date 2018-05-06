import React, { Component } from 'react';
import { InputText, InputPassword, SelectBox } from '../templates/InputForm';

export default class AddUserComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.object.title == "ADD USER") {
            this.props.submitForm(
                this.props.inputUsername,
                this.props.inputPassword,
                this.props.inputFullname,
                this.props.inputAddress,
                this.props.inputPhone,
                this.props.inputRole
            );
        }else {
            var object = {
                fullname: this.props.inputFullname,
                address: this.props.inputAddress,
                phone: this.props.inputPhone,
                role: this.props.inputRole
            }
            this.props.updateForm(this.props.id, object);
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
                            <strong>Fail!</strong> Username has been registered!
                            </div>
                        : null
                }
                <form onSubmit={this.handleSubmit}>
                    {
                        this.props.object.title == "ADD USER"
                            ?
                            <div className="col-md-6">
                                <InputText
                                    element={this.props.object.property[0]}
                                    name={'USER_USERNAME'}
                                    inputValue={this.props.inputUsername}
                                    saveInput={this.props.saveInput} />
                                <InputPassword
                                    element={this.props.object.property[1]}
                                    name={'USER_PASSWORD'}
                                    saveValue={this.props.inputPassword}
                                    saveInput={this.props.saveInput} />
                            </div>
                            : null
                    }
                    <div className={this.props.object.title == "ADD USER" ? "col-md-6" : "col-md-12"}>
                        <InputText
                            element={this.props.object.property[2]}
                            name={'USER_FULLNAME'}
                            inputValue={this.props.inputFullname}
                            saveInput={this.props.saveInput} />
                        <InputText
                            element={this.props.object.property[3]}
                            name={'USER_ADDRESS'}
                            inputValue={this.props.inputAddress}
                            saveInput={this.props.saveInput} />
                        <InputText
                            element={this.props.object.property[4]}
                            name={'USER_PHONE'}
                            inputValue={this.props.inputPhone}
                            saveInput={this.props.saveInput} />
                        <SelectBox
                            element={this.props.object.property[5]}
                            name={'USER_ROLE'}
                            inputValue={this.props.inputRole}
                            saveInput={this.props.saveInput} />
                    </div>
                    <input type="submit" className="btn btn-success col-md-2" value="Add" 
                           value={this.props.object.title == 'ADD USER' ? 'Add' : 'Update'} style={{ marginRight: 10 }} />
                    <input type="button" onClick={() => this.props.closeModal()} className="btn btn-default col-md-2" value="Cancel" />
                </form>
            </div>
        );
    }
}