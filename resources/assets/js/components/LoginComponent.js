import React, { Component } from 'react';
import { bounceInLeft, bounce } from 'react-animations';
import Radium, { StyleRoot } from 'radium';

var w = window.innerWidth;

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // X: 0,
            username: '',
            password: '',
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
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
                    <LocationComponent token_expired={this.props.token_expired} />
                </div>
                <div className="col-md-3 col-md-offset-8" style={style.frame}></div>
                <div className="col-md-3 col-md-offset-8" style={style.formBlock}>
                    <h3 style={style.title}>LOGIN</h3>
                    <hr />
                    <form onSubmit={this.handleSubmit}>
                        <div className="form-group">
                            <input type="text" placeholder="Username" className="form-control" onChange={(username) => this.setState({ username: username.target.value })} value={this.state.username} />
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" className="form-control" onChange={(password) => this.setState({ password: password.target.value })} value={this.state.password} />
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

export class LogoComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            logo: false
        }
    }
    render() {
        return (
            <div></div>
        )
    }
}

export class LocationComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: false
        }
    }
    componentDidMount() {
        setTimeout(() => {
            if (this.props.token_expired == true) {
                this.setState({ location: true });
                this.interval = setInterval(() => {
                    this.setState({ location: !this.state.location });
                }, 700)
            } else {
                clearInterval(this.interval);
            }
        }, 1900);
    }
    render() {
        return (
            this.state.location ? <img src="/images/location.png" style={style.img_location} /> : null
        );
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
        width: '30%',
        // left:'30%',
        animation: '4s',
        animationName: Radium.keyframes(bounceInLeft, 'bounceInLeft'),
    },
    img_location: {
        position: 'absolute',
        zIndex: 99999,
        width: '5%',
        bottom: '30%',
        left: '42%',
        // animation: '1s',
        // animationName: Radium.keyframes(bounce, 'bounce'),
    },
    intro: {
        position: 'absolute',
        left: 0,
        height: '100%',
        // top: 0,
        bottom: 0,
    },
    formBlock: {
        position: 'absolute',
        zIndex: 99999,
        borderRadius: 10,
        top: '25%',
        padding: 20,
    },
    form: {
        // position: 'absolute',
        zIndex: 99999,
    },
    frame: {
        backgroundColor: 'black',
        position: 'absolute',
        zIndex: 99999,
        borderRadius: 10,
        opacity: 0.5,
        padding: 20,
        top: '25%',
        height: 280
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white'
    },
}