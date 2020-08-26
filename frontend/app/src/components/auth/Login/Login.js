import React, { Component } from 'react';
import axios from 'axios';
import * as EmailValidator from "email-validator";
import { connect } from 'react-redux';

class Login extends Component {
    handleLoginSubmit(e) {
        // stop submit
        e.preventDefault();

        // get values from input
        const inputs = Array.from(e.target.children)
        const email = inputs.find(node => node.name === "email").value
        const password = inputs.find(node => node.name === "password").value

        // validate email
        if (!EmailValidator.validate(email)) return console.log('wrong email');
        // validate password
        if (typeof password !== 'string'
            || password.length < 4) return console.log('password to short')

        // setup data and headers for axios call
        const url = this.props.url + '/login';
        const headers = {
            'Content-Type': 'application/json'
        }
        const data = {
            "email": email,
            "password": password
        }

        // call api
        axios.post(url, data, headers)
            .then(res => {
                this.props.login(res.data.accessToken, res.data.refreshToken)
                console.log('Login Success.')
                this.props.history.push({ pathname: "/" })
            })
            .catch(err => console.log(err))
    };

    render() {
        return (
            <div>
                <h4>Login</h4>
                <form onSubmit={this.handleLoginSubmit.bind(this)}>
                    <input type="text" name="email" id="emailInput" />
                    <input type="password" name="password" id="password" />

                    <input type="submit" id="handleLoginSubmit"
                        className="submitBtn" value="Login" />
                </form>
            </div>
        )
    }
};

const mapStateToProps = state => {
    return {
        url: state.apiURL.url,
        accessToken: state.auth.accessToken,
        refreshToken: state.auth.refreshToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (accessToken, refreshToken) => {
            dispatch({
                type: "LOGIN",
                payload: {
                    refreshToken: refreshToken,
                    accessToken: accessToken
                }
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Login);