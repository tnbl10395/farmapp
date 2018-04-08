import React, { Component } from 'react';
import { bounceInLeft, bounce, fadeIn } from 'react-animations';
import Radium, { StyleRoot } from 'radium';
import Loader from "../templates/Loader";

const width = window.innerWidth;

export default class LoginComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // X: 0,
            username: '',
            password: '',
            loading: true,
            message_username: false,
            message_password: false,
            showImageChart: false,
            showImageLocation: false,
            showImageSolution: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.username == '' && this.state.password == '') {
            this.setState({
                message_username: true,
                message_password: true,
            });
        } else if (this.state.username == '' && this.state.password != '') {
            this.setState({
                message_username: true,
                message_password: false,
            });
        } else if (this.state.username != '' && this.state.password == '') {
            this.setState({
                message_username: false,
                message_password: true,
            });
        } else {
            this.setState({
                message_username: false,
                message_password: false,
            });
            this.props.login(this.state.username, this.state.password);
        }
    }

    componentWillMount() {
        setTimeout(() => this.setState({ loading: false }), 1500); // simulates an async action, and hides the spinner
        setTimeout(() => this.setState({ showImageChart: true }), 4000);
        setTimeout(() => this.setState({ showImageLocation: true }), 4500);
        setTimeout(() => this.setState({ showImageSolution: true }), 5000);
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
        const { loading } = this.state;
        if (loading) {
            return <div style={{ backgroundColor: 'black', position: 'absolute', top: 0, bottom: 0, right: 0, left: 0 }}><Loader /></div>
        }
        return (
            <div style={{ backgroundColor: 'black' }} >
                {/* <img src="/images/farmintro.jpg" style={style.img} /> */}
                <div style={style.overview}></div>
                {
                    width > 414 ?
                        <div
                            // onMouseMove={(e) => this.moveMouse(e)}
                            className="col-md-8" style={style.intro} >
                            <StyleRoot>
                                {this.state.showImageLocation ? <img src="/images/location2.jpg" className="col-md-offset-3" style={style.img_location2} /> : null}
                                {this.state.showImageChart ? <img src="/images/chart.png" style={style.img_chart} /> : null}
                                {this.state.showImageSolution ? <img src="/images/solution.jpg" className="col-md-offset-3" style={style.img_solution} /> : null}
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
                        : null
                }
                <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-8" style={style.frame}></div>
                <div className="col-xs-10 col-xs-offset-1 col-sm-6 col-sm-offset-3 col-md-3 col-md-offset-8" style={style.formBlock}>
                    <LogoComponent />
                    <div style={{ backgroundColor: 'white' }}><i className="fa fa-user-circle" style={style.icon} /></div>
                    <div style={{ marginTop: 130 }}>
                        <h3 style={style.title}>Sign In</h3>
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
                                <input type="text" placeholder="Username"
                                    className="form-control"
                                    style={style.input}
                                    onChange={(username) => this.setState({ username: username.target.value })} value={this.state.username} />
                                {this.state.message_username ? <h4 style={{ textAlign: 'center' }} className="text-danger">Please input username!</h4> : null}
                            </div>
                            <div className="form-group col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
                                <input type="password" placeholder="Password"
                                    style={style.input}
                                    className="form-control"
                                    onChange={(password) => this.setState({ password: password.target.value })} value={this.state.password} />
                                {this.state.message_password ? <h4 style={{ textAlign: 'center' }} className="text-danger">Please input password!</h4> : null}
                            </div>
                            {this.props.message && !this.state.message_username && !this.state.message_password ? <h4 style={{ textAlign: 'center' }} className="text-danger">Username or Password is invalid</h4> : null}
                            <div className="form-group col-xs-12 col-sm-10 col-sm-offset-1 col-md-10 col-md-offset-1">
                                <button className="btn" style={{ width: '100%', height: 55, fontSize: 20, backgroundColor: '#007991', color: 'white' }}>Login</button>
                            </div>
                        </form>
                    </div>
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
            <img src="/images/logo4.png" style={style.logo} />
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
        this.timeout = setTimeout(() => {
            this.setState({ location: true });
            this.interval = setInterval(() => {
                this.setState({ location: !this.state.location });
            }, 700)
        }, 1900);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        clearTimeout(this.timeout)
    }

    render() {
        return (
            this.state.location ? <img src="/images/location.png" style={style.img_location} /> : null
        );
    }
}

const style = {
    overview: {
        background: 'linear-gradient(to bottom, #007991, #78ffd6)',
        position: 'fixed',
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
    img_chart: {
        position: 'absolute',
        zIndex: 99999,
        width: '20%',
        height: '25%',
        bottom: '45%',
        left: '5%',
        borderRadius: '100%',
        objectFit: 'cover',
        animation: '2s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    img_location2: {
        position: 'absolute',
        zIndex: 99999,
        width: '20%',
        height: '25%',
        bottom: '65%',
        left: '10%',
        borderRadius: '100%',
        objectFit: 'cover',
        animation: '2s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn'),
    },
    img_solution: {
        position: 'absolute',
        zIndex: 99999,
        width: '20%',
        height: '25%',
        bottom: '45%',
        left: '40%',
        borderRadius: '100%',
        objectFit: 'cover',
        animation: '2s',
        animationName: Radium.keyframes(fadeIn, 'fadeIn'),
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
        backgroundColor: 'rgb(192,192,192,0.3)',
        position: 'absolute',
        zIndex: 99999,
        borderRadius: 20,
        padding: 20,
        top: '25%',
        height: 450
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        color: 'white',
        marginBottom: 10,
    },
    input: {
        marginBottom: 10,
        height: 55
    },
    icon: {
        fontSize: 100,
        color: '#007991',
        position: 'absolute',
        top: 20,
        left: 0,
        right: 0,
        textAlign: 'center',
    },
    logo: {
        opacity: 0.9,
        position: 'absolute',
        top: -150,
        width: '75%',
        marginLeft: '8%'
    }
}