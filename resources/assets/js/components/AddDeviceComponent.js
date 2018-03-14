import React, { Component } from 'react';
import { InputText, InputCalendar } from '../templates/InputForm';

export class AddDeviceComponent extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <form>
                <div>
                    <InputText 
                        element={this.props.property[0]} 
                        name={'device'}
                        saveInputText={this.props.saveInputText}/>
                    <InputCalendar element={this.props.property[1]} />
                </div>
                <input type="submit" className="btn btn-success col-md-2" value="Add" />
            </form>
        )
    }
}

