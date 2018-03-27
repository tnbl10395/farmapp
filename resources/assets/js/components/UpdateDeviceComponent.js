import React, { Component } from 'react';
import { InputText, InputCalendar } from '../templates/InputForm';

export default class UpdateDeviceComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        var object = {
            name: this.props.inputName,
            code: this.props.inputCode,
            manufacturing_date: this.props.inputDate
        }
        this.props.update(this.props.match.params.number, object)
    }

    componentDidMount() {
        this.props.loadData(this.props.match.params.number);
    }

    render() {
        return (
            <div style={this.props.sideBar ? style.main_content_true : style.main_content_false} className="col-md-6">
                <h3>Update Device</h3>
                <hr />
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
                <form onSubmit={this.handleSubmit}>
                    <InputText
                        element={{ name: "Name", placeholder: 'Please input name' }}
                        name={'DEVICE_NAME'}
                        inputValue={this.props.inputName}
                        saveInput={this.props.saveInput} />
                    <InputText
                        element={{ name: "Code", placeholder: 'Please input code' }}
                        name={'DEVICE_CODE'}
                        inputValue={this.props.inputCode}
                        saveInput={this.props.saveInput} />
                    <InputCalendar
                        element={{ name: "Manufacturing Date", placeholder: 'Please input Manufacturing Date' }}
                        name={'DEVICE_DATE'}
                        inputDate={this.props.inputDate}
                        saveInput={this.props.saveInput} />
                    <input type="submit" className="btn btn-success col-md-2 pull-right" value="Update" style={{ marginBottom: 10 }} />
                </form>
            </div>
        )
    }
}

const style = {
    main_content_true: {
        color: 'black',
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        top: 50,
        right: 10,
        // width: '83%',
        fontSize: 12,
        // opacity: 0.7,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "0.5px 5px 3px grey",
        borderTop: '4px #2ab27b solid'
    },
    main_content_false: {
        color: 'black',
        backgroundColor: 'white',
        position: 'absolute',
        left: 10,
        top: 50,
        right: 10,
        // width: '95%',
        fontSize: 12,
        // opacity: 0.7,
        borderRadius: 5,
        fontWeight: 'bold',
        boxShadow: "0.5px 5px 3px grey",
        borderTop: '4px #2ab27b solid'
    },
}