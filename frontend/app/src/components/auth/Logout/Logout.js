import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

class Logout extends Component {
    handleLogout() {
        // url
        const url = this.props.url + '/logout';
        // headers
        const headers = {
            "Content-Type": "application/json"
        }
        // data
        const data = {
            "refreshToken": this.props.refreshToken,
        }

        if (this.props.refreshToken.length < 1) return console.log('You are not authenticated right now.')
        // call logout 
        axios.post(url, data, headers)
            .then(res => {
                if (res.status === 204) {
                    this.props.logout();
                    console.log("Logout success.")
                }
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <span onClick={this.handleLogout.bind(this)}>Logout</span>
        )
    }
}

// const mapStateToProps = state => {
//     return {
//         url: state.apiURL.url,
//         refreshToken: state.auth.refreshToken,
//     }
// }
// const mapDispatchToProps = dispatch => {
//     return {
//         logout: dispatch({ type: 'LOGOUT' })
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Logout);

export default Logout;