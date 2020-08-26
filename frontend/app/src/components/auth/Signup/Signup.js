
import React from 'react';
import axios from 'axios';
import * as EmailValidator from "email-validator";
import { connect } from 'react-redux';


const Signup = (props) => {

    function handleSignupSubmit(e) {
        // stop submit
        e.preventDefault();

        // get values from input
        const inputs = Array.from(e.target.children)
        const email = inputs.find(node => node.name === "email").value
        const password = inputs.find(node => node.name === "password").value
        const passwordConfirm = inputs.find(node => node.name === "passwordConfirm").value

        // validate email
        if (!EmailValidator.validate(email)) return console.log('wrong email');
        // validate password
        if (typeof password !== 'string' || password.length < 4) return console.log('password to short')
        if (password !== passwordConfirm) return console.log("Type the same password twice.")

        // setup data and headers for axios call
        const url = props.url + '/signup';
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
                // console.log(res.data)
                console.log('status : ', res.status)
            })
            .catch(err => console.log(err))
    };

    return (
        <div>
            <h4>Signup</h4>
            <form onSubmit={handleSignupSubmit}>
                <input type="text" name="email" id="emailInput" />
                <input type="password" name="password" id="password" />
                <input type="password" name="passwordConfirm" id="passwordConfirm" />
                <input type="submit" id="signupSubmitBtn"
                    className="submitBtn" value="Signup" />
            </form>
        </div>
    )
};

const mapStateToProps = state => {
    return {
        url: state.apiURL.url,
    }
}

export default connect(mapStateToProps)(Signup);