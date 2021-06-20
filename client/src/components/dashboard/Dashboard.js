import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile } from "../../actions/profile_actions";
import Spinner from "../common/Spinner";
class Dashboard extends Component{
    componentDidMount(){
        this.props.getCurrentProfile();
    }

    render(){
        const {user} = this.props.auth;
        const {profile, loading} = this.props.profile;
        let dashboardContent;
        if(profile === null || loading){
            dashboardContent = <Spinner />;
        }
        else{
            //check if logged in user has profile data
            if(Object.keys(profile).length){
                dashboardContent = <h4>DISPLAY PROFILE</h4>;
            }
            else{
                dashboardContent = (
                    <div>
                        <h5>Welcome, <strong>{user.name}</strong></h5>
                        <p className="lead text-muted">It seems that you have not created your Profile. Please create one to proceed.</p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
                    </div>    
                );
            }
            
        }
        return(
            <div className="dashboard">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4">Dashboard</h1>
                            {dashboardContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile})(Dashboard);