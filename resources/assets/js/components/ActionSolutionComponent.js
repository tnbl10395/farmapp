import React, { Component } from 'react';
import { InputText, InputPassword, SelectBox } from '../templates/InputForm';

export default class ActionSolutionComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.props.object.title == "ADD SOLUTION") {
            this.props.submitForm(

            );
        } else {
            var object = {

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
                            <strong>Success!</strong> The new plant has just created!
                            </div>
                        : null
                }
                {
                    this.props.messageFail ?
                        <div className="alert alert-danger alert-dismissible fade in">
                            <a href="#" onClick={() => this.props.closeMessage()} className="close" data-dismiss="alert" aria-label="close">&times;</a>
                            <strong>Fail!</strong> Plant has been created!
                            </div>
                        : null
                }
                <form onSubmit={this.handleSubmit}>
                    {/* <div className="form-group">
                        <label>Plant</label>
                        <select value={this.props.inputValue} className="form-control" onChange={(option) => this.props.saveInput(this.props.name, option.target.value)}>
                            {
                                this.props.element.select.map((option) => {
                                    return <option key={option.id} value={option.id}>{option.name}</option>
                                })
                            }
                        </select>
                    </div> */}
                    <div className="form-group col-md-6" style={{ padding: 0 }}>
                        <div className="col-md-12" style={{ padding: 0 }}>
                            <label>Temperature</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="From" required
                                onChange={(text) => this.props.saveInput(this.props.name, text.target.value)}
                                className="form-control"
                                value={this.props.inputValue} />
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="To" required
                                onChange={(text) => this.props.saveInput(this.props.name, text.target.value)}
                                className="form-control"
                                value={this.props.inputValue} />
                        </div>
                    </div>
                    <div className="form-group col-md-6" style={{ padding: 0 }}>
                        <div className="col-md-12" style={{ padding: 0 }}>
                            <label>Humidity</label>
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="From" required
                                onChange={(text) => this.props.saveInput(this.props.name, text.target.value)}
                                className="form-control"
                                value={this.props.inputValue} />
                        </div>
                        <div className="col-md-6">
                            <input type="text" placeholder="To" required
                                onChange={(text) => this.props.saveInput(this.props.name, text.target.value)}
                                className="form-control"
                                value={this.props.inputValue} />
                        </div>
                    </div>
                    {/* <input type="submit" className="btn btn-success col-md-2" value="Add"
                        value={this.props.object.title == 'ADD SOLUTION' ? 'Add' : 'Update'} style={{ marginRight: 10 }} /> */}
                    <input type="button" className="btn btn-success col-md-2" value="Next" style={{ marginRight: 10 }} />
                    <input type="button" onClick={() => this.props.closeModal()} className="btn btn-default col-md-2" value="Cancel" />
                </form>
            </div>
        );
    }
}