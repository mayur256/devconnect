import React, {Component} from "react";
//import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {getProfiles, setProfileLoading} from "../../actions/profile_actions";
import Spinner from "../common/Spinner";
import ProfileItem from "./ProfileItem";
class Profiles extends Component{
    componentDidMount(){
        this.props.setProfileLoading();
        this.props.getProfiles();
    }

    render(){
        const {profiles, loading} = this.props.profile;
        let profilesList;
        if(profiles === null || loading){
            profilesList = <Spinner />
        }
        else if(!profiles.length){
            profilesList = <h4 className="text-center mt-4">No Profiles found...</h4>
        }
        else if(profiles.length){
            //if Profiles array has elements then call ProfileItems with profile prop
            profilesList = profiles.map((profile,index) => <ProfileItem profile={profile} key={index} />)
        }
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 form-container">
                            <h5 className="text-center display-4">Developer Profiles</h5>
                            <p className="text-center lead">List of Developer Profiles registered on the System</p>
                            {profilesList}<br />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profiles.propTypes = {
    errors: PropTypes.object,
    profile: PropTypes.object.isRequired,
    getProfiles: PropTypes.func.isRequired,
    setProfileLoading: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile
});
export default connect(mapStateToProps, {getProfiles, setProfileLoading})(Profiles);