import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';



class Restricted extends Component {
    // get data from api
    componentDidMount() {
        console.log('yess!')
        const url = this.props.url + '/restricted';
        const headers = {
            headers: {
                'authorization': 'Bearer ' + this.props.accessToken,
            }
        }
        console.log(headers)

        axios.get(url, headers)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    // render
    render() {
        return (
            <div>
                <h4>Restricted</h4>
            </div>
        )
    }
}


const mapStatsToProps = state => {
    return {
        accessToken: state.auth.accessToken,
        headers: state.headers,
        url: state.apiURL.url
    }
}

export default connect(mapStatsToProps)(Restricted);