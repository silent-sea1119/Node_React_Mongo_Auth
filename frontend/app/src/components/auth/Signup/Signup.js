
import React from 'react';
import axios from 'axios';



const Signup = (props) => {

    function handleSignupSubmit(e) {
        // stop submit
        e.preventDefault();
        const url = 'http://localhost:4000/signup';
        const headers = {
            'Content-Type': 'application/json'
        }

        const inputs = Array.from(e.target.children)
        const email = inputs.find(node => node.name === "email").value
        const password = inputs.find(node => node.name === "password").value
        console.log(email, password)

    };

    return (
        <div>
            <h4>Signup</h4>
            <form onSubmit={handleSignupSubmit}>
                <input type="text" name="email" id="emailInput" />
                <input type="password" name="password" id="password" />
                <input type="submit" id="signupSubmitBtn"
                    className="submitBtn" value="Signup" />
            </form>
        </div>
    )
};


export default Signup;