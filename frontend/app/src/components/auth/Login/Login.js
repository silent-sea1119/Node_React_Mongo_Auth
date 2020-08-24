
import React from 'react';
import axios from 'axios';
import * as EmailValidator from "email-validator";



const Login = (props) => {
    function handleLoginSubmit(e) {
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
        const url = 'http://localhost:4000/login';
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
                console.log(res.data)
                console.log(res.status)
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            <h4>Login</h4>
            <form onSubmit={handleLoginSubmit}>
                <input type="text" name="email" id="emailInput" />
                <input type="password" name="password" id="password" />
                <input type="submit" id="handleLoginSubmit"
                    className="submitBtn" value="Login" />
            </form>
        </div>
    )
};


export default Login;