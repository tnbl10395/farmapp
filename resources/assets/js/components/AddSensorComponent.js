import React, { Component } from 'react';

export class AddSensorComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: '',
            name: '',
            code: '',
            spec: '',
            date: '',
            madeIn: '',
        }
    }
    
    onFileChange(e, file) {
        var file = file || e.target.files[0],
        pattern = /image-*/,
        reader = new FileReader();
        
        if (!file.type.match(pattern)) {
            alert('Format invalid');
            return;
        }
        
        // this.setState({ loaded: false });
        
        reader.onload = (e) => {
            this.setState({ 
                picture: reader.result, 
                // loaded: true 
            }); 
        }
        
        reader.readAsDataURL(file);
    }

    onChangeName(name) {
        this.setState({
            name: name.target.value,
        });
    }

    onChangeCode(code) {
        this.setState({
            code: code.target.value,
        });
    }

    onChangeSpec(spec) {
        this.setState({
            spec: spec.target.value,
        });
    }

    onChangeDate(date) {
        this.setState({
            date: date.target.value,
        });
    }

    onChangeMadeIn(madeIn) {
        this.setState({
            madeIn: madeIn.target.value,
        });
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
                            <strong>Fail!</strong> You should check code!
                            </div>
                        : null
                }
                <form style={styleForm.body}>
                        <div>
                            <div className="col-md-5" style={{ textAlign: 'center' }}>
                                <label style={styleForm.image}>
                                    {this.state.picture == '' ?  null :  <img src={this.state.picture} style={styleForm.image}/>}
                                    {this.state.picture != '' ? null : <i className="fa fa-cogs" style={{ fontSize: 60, marginTop: 35 }}></i>}
                                    <input type="file" className="form-control" style={{ display: 'none' }} accept="image/*" onChange={this.onFileChange}/>
                                </label>
                                Click to open the file picker
                            </div>
                            <div className="col-md-7">
                                <div className="form-group col-md-6">
                                    <label>Name</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input name"
                                        onChange={(name) => this.onChangeName(name)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Code</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input code"
                                        onChange={(code) => this.onChangeCode(code)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Made In</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input where sensor is made"
                                        onChange={(madeIn) => this.onChangeMadeIn(madeIn)} />
                                </div>
                                <div className="form-group col-md-6">
                                    <label>Manufacturing Date</label>
                                    <input type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input manufacturing date"
                                        onChange={(date) => this.onChangeDate(date)} />
                                </div>
                                <div className="form-group col-md-12">
                                    <label>Technical Specification</label>
                                    <textarea type="text"
                                        required
                                        className="form-control"
                                        placeholder="Please input specification"
                                        onChange={(spec) => this. onChangeSpec(spec)} />
                                </div>
                            </div>
                        </div>
                    <div className="col-md-12" style={styleForm.groupBtn}>
                        <hr />
                        <input type="submit" className="btn btn-success pull-right col-md-2" value="Save" style={{ marginRight: 10 }} onClick={this.onSubmit} />
                        <input type="button" className="btn btn-default pull-right col-md-2" value="Cancel" style={{ marginRight: 10 }} onClick={() => this.props.closeModal()} />
                    </div>
                </form>
            </div>
        );
    }
}

const styleForm = {
    body: {
        // position: 'fixed',
        // top: '10%',
        // zIndex: 5,
        // backgroundColor: 'white',
        // boxShadow: '0 5px 15px rgba(0,0,0,.5)'
    },
    groupBtn: {
        marginBottom: 20
    },
    bodyNextPage: {
        height: 300,
        overflow: 'auto'
    },
    description: {
        padding: 0,
        margin: 0,
        lineHeight: '13px',
        color: '#9eacb4',
        fontSize: '13px',
        fontWeight: 400,
    },
    image: {
        height: '150px',
        width: '100%',
        objectFit: 'cover',
        border: '2px dashed #e7ecf1',
        borderRadius: '5px',
        cursor: 'pointer'
    }
}