import React, { Component } from 'react';
import { InputText, InputCalendar, InputPassword, SelectBox } from '../templates/InputForm';
import { fadeInDown } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

import AddDevice from '../containers/AddDeviceContainer';

export default class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.value);
    }

    render() {
        return (
            <div>
                <div style={style.overview}
                    onClick={() => this.props.closeModal()}>
                </div>
                <StyleRoot>
                    <div style={style.form} className="col-md-6 col-md-offset-3">
                        <h3 style={style.title}>{this.props.object.title} FORM</h3>
                        <hr />
                        {
                            bodyModal(this.props.object)
                        }
                    </div>
                </StyleRoot>
            </div>
        );
    }
}

const bodyModal = (object) => {
    switch (object.title) {
        case 'ADD DEVICE':
            return <AddDevice property={object.property}/>;
        case 'ADD USER':
            return addUser(object.property);
    }
}

// const addDevice = (property) => (
//     <form onSubmit={this.handleSubmit}>

//         <div>
//             <InputText element={property[0]} />
//             <InputCalendar element={property[1]} />
//         </div>
//         <input type="submit" className="btn btn-success col-md-2" value="Add" />
//     </form>
// );

const addUser = (property) => (
    <div>
        <InputText element={property[0]} />
        <InputPassword element={property[1]} />
        <hr />
        <InputText element={property[2]} />
        <InputText element={property[3]} />
        <InputText element={property[4]} />
        <SelectBox element={property[5]} />
    </div>
)

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
        zIndex: 99999,
        animation: "0.5s",
        animationName: Radium.keyframes(fadeInDown, 'fadeInDown')
    },
    title: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#5e8000',
    }
}