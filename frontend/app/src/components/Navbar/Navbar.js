

import React, { Component, Fragment } from 'react';
import { Route, Link } from 'react-router-dom';
import Logout from '../auth/Logout/Logout';
import { connect } from 'react-redux';



class Navbar extends Component {
    state = {
        logout: Logout,
    }

    componentDidMount() {

    }

    handleLogin() {
        this.setState({ isAuth: true });
    }

    render() {
        return (
            <Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    {/* <a className="navbar-brand" href="#">Login App</a> */}
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor03" aria-controls="navbarColor03" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarColor03">
                        <ul className="navbar-nav mr-auto">
                            {/* <li className="nav-item active">
                                <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                            </li> */}
                            {
                                this.props.accessToken ?
                                    <li className="nav-item">
                                        <a href="" className="nav-link"><Route component={Logout} /> </a>
                                    </li>
                                    :
                                    <Fragment>
                                        <li className="nav-item">
                                            <Link to='/auth/signup' className="nav-link">Signup</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link to='/auth/login' className="nav-link">Login</Link>
                                        </li>
                                    </Fragment>
                            }

                            <li className="nav-item">
                                <Link to='/restricted' className="nav-link">Restricted</Link>
                            </li>

                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" data-toggle="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
                                <div className="dropdown-menu">
                                    <a className="dropdown-item" href="#">Action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Separated link</a>
                                </div>
                            </li>
                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            <button className="btn btn-secondary my-2 my-sm-0" type="submit">Search</button>
                        </form>
                    </div>
                </nav>
            </Fragment >
        )
    }
}

const mapStateToProps = state => {
    return {
        accessToken: state.auth.accessToken,
    }
}

export default connect(mapStateToProps)(Navbar);