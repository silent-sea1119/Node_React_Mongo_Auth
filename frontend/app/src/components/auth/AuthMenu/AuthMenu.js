import React from 'react';
import {
    Switch,
    Route,
} from 'react-router-dom';

import Login from '../Login/Login';
import Signup from '../Signup/Signup';

const AuthMenu = props => {

    return (
        <div>
            <Switch>
                <Route path={props.match.url + "/login"} exact component={Login} />
                <Route path={props.match.url + "/signup"} exact component={Signup} />
            </Switch>
        </div>
    )
}





export default AuthMenu;