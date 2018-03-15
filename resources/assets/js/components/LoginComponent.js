import React, { Component } from 'react';
import { bounceInLeft, bounce } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

var w = window.innerWidth;

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: false,
            // X: 0
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({ location: true });
            setInterval(() => {
                this.setState({ location: !this.state.location });
            }, 700)
        }, 1900);
    }

    // moveMouse(e) {
    //     if ((e.pageX / w * 100) > 60) {
    //         this.setState({ X: 0 })
    //     }
    //     else {
    //         this.setState({ X: e.pageX - 380 })
    //     }
    // }

    render() {
        return (
            <div style={{ backgroundColor: 'gray' }} >
                <img src="/images/farmintro.jpg" style={style.img} />
                <div style={style.overview}></div>
                <div
                    // onMouseMove={(e) => this.moveMouse(e)}
                    className="col-md-8" style={style.intro} >
                    <StyleRoot>
                        <img src="/images/smartphone.png" className="col-md-offset-3" 
                            style={[
                                style.img_smartphone, 
                                // { left: this.state.X }
                            ]}
                        // onMouseMoveOver={(e) => this.setState({ X: e.pageX })}
                        />

                    </StyleRoot>
                    {
                        this.state.location ? <img src="/images/location.png" style={style.img_location} /> : null
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
        width: 400,
        animation: '4s',
        animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
    },
    img_location: {
        position: 'absolute',
        zIndex: 99999,
        width: '10%',
        bottom: 300,
        left: '45%',
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