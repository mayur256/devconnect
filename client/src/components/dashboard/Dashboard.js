import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profile_actions";
import Spinner from "../common/Spinner";
import ProfileActions from "./ProfileActions";
import Experience from "./Experience";
import Education from "./Education";
class Dashboard extends Component{
    constructor(props){
        super(props);
        this.deleteHandler = this.deleteHandler.bind(this);
    }

    componentDidMount(){
        this.props.getCurrentProfile();
    }

    deleteHandler(){
        this.props.deleteAccount();
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
                dashboardContent = (
                    <div>
                        <h5>Welcome, <Link to={`/profile/${profile.handle}`}><strong>{user.name}</strong></Link></h5>
                        <ProfileActions />
                        <Experience experience={profile.experience} />
                        <Education education={profile.education} />
                    </div>
                );
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
                <div className="container form-container">
                    <div className="row">
                        <div className="col-md-12">
                            <h1 className="display-4 inline-block">Dashboard</h1>
                            <button type="button" style={{marginTop: '10px'}} 
                                className="inline-block pull-right btn btn-danger"
                                onClick={this.deleteHandler}
                            >Delete My Account</button>
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
    auth: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    auth: state.auth
});

export default connect(mapStateToProps, {getCurrentProfile, deleteAccount})(Dashboard);