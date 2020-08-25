import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

const Logout = props => {
    function handleLogout() {
        // url
        const url = props.url + '/logout';
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
                    props.logout();
                    console.log("Logout success.")
                }
            })
            .catch(err => console.log(err))
    }



    return (
        props.hide === 'true' ?
            null :
            <li>
                <a href='/' onClick={handleLogout}>Logout</a>
            </li>

    )
}

const mapStateToProps = state => {
    return {
        url: state.apiURL.url,
        refreshToken: state.auth.refreshToken,
    }
}
const mapDispatchToProps = dispatch => {
    return {
        logout: dispatch({ type: 'LOGOUT' })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Logout);