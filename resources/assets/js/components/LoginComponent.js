import React, { Component } from 'react';
import { bounceInLeft, bounce } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ location: true });
            setInterval(() => {
                this.setState({ location: !this.state.location });
            }, 800)
        }, 1900);
    }

    render() {
        return (
            <div style={{ backgroundColor: 'gray' }} 
                // onMouseMoveCapture={()=>console.log('ok')}
                >
                <img src="/images/farmintro.jpg" style={style.img} />
                <div style={style.overview}></div>
                <div className="col-md-8" style={style.intro}>
                    <StyleRoot>
                        <img src="/images/smartphone.png" className="col-md-offset-3" style={style.img_smartphone} />

                    </StyleRoot>
                    {
                        this.state.location ? <img src="/images/location.png" className="col-md-offset-6" style={style.img_location} /> : null
                    }
                </div>
                <div className="col-md-3 col-md-offset-8" style={style.form}>
                    <h3 style={style.title}>LOGIN</h3>
                    <hr />
                    <form>
                        <div className="form-group">
                            <input type="text" placeholder="Username" className="form-control" />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="form-control" />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-success col-md-8 col-md-offset-2">SUBMIT</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const style = {
    overview: {
        // backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // opacity: 0.9,
        zIndex: 99999,

    },
    img: {
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        filter: 'blur(3px)',
        zIndex: 99999,
        // maxWidth:'100%',
        // maxHeight:'100%',
    },
    img_smartphone: {
        position: 'absolute',
        zIndex: 999999,
        bottom: 0,
        // width: '40%',
        animation: '4s',
        animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
    },
    img_location: {
        position: 'absolute',
        zIndex: 99999,
        width: '10%',
        bottom: 300,
        // left: '4%',
        // animation: '1s',
        // animationName: Radium.keyframes(bounce, 'bounce'),
    },
    intro: {
        position: 'absolute',
        left: 0,
        // top: 0,
        bottom: 0,
    },
    form: {
        backgroundColor: 'black',
        position: 'absolute',
        zIndex: 99999,
        borderRadius: 10,
        top: '25%',
        opacity: 0.6,
        padding: 20
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
    },
}