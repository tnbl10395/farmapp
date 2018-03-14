import React, { Component } from 'react';
import Datetime from 'react-datetime';

var today = Datetime.moment();
var valid = function (current) {
    return current.isBefore(today);
};

export class InputText extends React.Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.element.name}</label>
                <input type="text" placeholder={this.props.element.placeholder} 
                        onChange={(text)=>this.props.saveInputText(this.props.name, text.target.value)} 
                        className="form-control" />
            </div>
        );
    }
}

export class InputCalendar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.element.name}</label>
                <Datetime
                    isValidDate={valid}
                    timeFormat={false}
                    defaultValue={new Date()}
                />
            </div>
        );
    }
}

export class InputPassword extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.element.name}</label>
                <input type="passowrd" placeholder={this.props.element.placeholder} className="form-control" />
            </div>
        );
    }
}

export class SelectBox extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="form-group">
                <label>{this.props.element.name}</label>
                <select className="form-control">
                    {
                        this.props.element.role.map((option) => {
                            return <option key={option.id} value={option.id}>{option.name}</option>
                        })
                    }
                </select>
            </div>
        );
    }
}