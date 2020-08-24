import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Logout = props => {


    function handleLogout() {
        // url
        const url = 'http://localhost:4000/logout'
        // headers
        const headers = {
            "Content-Type": "application/json"
        }
        // data
        const data = {
            "refreshToken": props.refreshToken,
        }

        if (props.refreshToken.length < 1) return console.log('You are not authenticated right now.')
        // call logout 
        axios.post(url, data, headers)
            .then(res => {
                if (res.status === 204) {
                    console.log("Logout success.")
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        refreshToken: state.auth.refreshToken,
    }
}

export default connect(mapStateToProps)(Logout);