import React, { Fragment, useEffect } from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import Login from '../Login/Login';
import Logout from '../Logout/Logout';
import Signup from '../Signup/Signup';
import { connect } from 'react-redux';

function AuthMenu(props) {

    useEffect(() => {
        console.log('token: ', props.accessToken)

        // props.accessToken !== '' ? <li><Logout /></li>
        //     :
        //     <li><Link to="/login">login</Link></li>
    })


    return (
        <div>
            <Router>
                <ul>
                    <Fragment>
                        <li><Link to="/">home</Link></li>
                        <li><Link to="/signup">signup</Link></li>
                        <li><Link to="/login">login</Link></li>
                        <Logout />




                    </Fragment>
                </ul>


                <Switch>
                    <Route path="/login">
                        <Login />
                    </Route>
                    <Route path="/signup">
                        <Signup />
                    </Route>
                </Switch>
            </Router>


        </div>
    )


}

const mapStateToProps = stats => {
    return {
        accessToken: stats.auth.accessToken,
    }
}

export default connect(mapStateToProps)(AuthMenu);