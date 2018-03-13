import React, { Component } from 'react';
import { InputText } from '../templates/InputForm';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <div style={style.overview}
                    onClick={() => this.props.closeModal()}>
                </div>
                <div style={style.form} className="col-md-6 col-md-offset-3">
                    <h3 style={style.title}>{this.props.object.title} FORM</h3>
                    <form>
                        <hr />
                        {
                            this.props.object.property.map(element => (<InputText element={element}/>))
                        }
                    </form>
                </div>
            </div>
        );
    }
}

const style = {
    overview: {
        position: 'absolute',
        backgroundColor: 'black',
        opacity: 0.4,
        top: 0,
        right: 0,
        left: 0,
        bottom: 0,
        zIndex: 99999
    },
    form: {
        position: 'absolute',
        top: '15%',
        padding: 20,
        borderRadius: 5,
        backgroundColor: 'white',
        zIndex: 99999
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#5e8000',
    }
}