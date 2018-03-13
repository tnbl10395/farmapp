import React, { Component } from 'react';

export class InputText extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.element.name}</label>
                <input type="text" placeholder={this.props.element.placeholder} className="form-control" /> 
            </div>
            //alo
        );
    }
}