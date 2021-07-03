import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {logoutUser} from "../../actions/auth_actions";
import {clearCurrentProfile} from "../../actions/profile_actions";
class Navbar extends Component{
    onLogoutClick(e){
        e.preventDefault();
        this.props.logoutUser();
    }

    render(){
        const {isAuthenticated, user} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/dashboard">
                        Dashboard <span className="sr-only">(current)</span>
                    </Link>
                    
                </li> 
                <li className="nav-item active">
                    <span style={{cursor: 'pointer'}} className="nav-link" onClick={this.onLogoutClick.bind(this)}>
                        <img src={user.avatar} alt={user.name} title="A Gravatar associated with you email"
                            style={{width:'25px', marginRight: '5px'}} className="rounded-circle"/>
                            Logout
                    </span>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <Link className="nav-link" to="/register">
                        Register <span className="sr-only">(current)</span>
                    </Link>
                    
                </li>
                <li className="nav-item active">
                    <Link className="nav-link" to="/login">
                        Login <span className="sr-only">(current)</span>
                    </Link>
                </li>
            </ul>
        );
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-custom">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
    
                    <div id="navbarsExample07" className="collapse navbar-collapse">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link className="nav-link" to="/">
                                    Devclave <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/developers">
                                    Developers <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                            <li className="nav-item active">
                                <Link className="nav-link" to="/post-feed">
                                    Post Feed <span className="sr-only">(current)</span>
                                </Link>
                            </li>
                        </ul>
    
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </nav>
        );
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    clearCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}
const mapStateToProps = state => ({
    auth: state.auth
})
export default connect(mapStateToProps, {logoutUser, clearCurrentProfile})(Navbar);