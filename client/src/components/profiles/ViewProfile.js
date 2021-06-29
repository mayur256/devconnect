import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link} from "react-router-dom";
import {getProfileByHandle} from "../../actions/profile_actions";
import ProfileHeader from "./profile-sections/ProfileHeader";
import ProfileAbout from "./profile-sections/ProfileAbout";
import ProfileCreds from "./profile-sections/ProfileCreds";
import ProfileGithub from "./profile-sections/ProfileGithub";
import Spinner from "../common/Spinner";
import isEmpty from "../../utility/is_empty";
class ViewProfile extends Component{

    componentDidMount(){
        const {handle} = this.props.match.params;
        this.props.getProfileByHandle(handle);
    }

    render(){
        const {profile, loading} = this.props.profile;
        let profileContent;
        if(profile === null || loading){
            profileContent = <Spinner />
        }
        else{
            profileContent = (
                <div className="form-container">
                    <div className="row">
                        <div className="col-md-6">
                            <Link to="/developers" className="btn btn-light mb-3 mt-3 float-left">
                                Back to Profiles
                            </Link>
                        </div>
                        <div className="col-md-6"></div>
                    </div>
                    <ProfileHeader profile={profile} />
                    <ProfileAbout profile={profile} />
                    <ProfileCreds experience={profile.experience} education={profile.education} />
                    {!isEmpty(profile.gitHubUserName) ? (<ProfileGithub githubusername={profile.gitHubUserName}/>) : null}
                    
                    <br />
                </div>
            );
        }
        return (
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            {profileContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ViewProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    getProfileByHandle: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {getProfileByHandle})(ViewProfile);