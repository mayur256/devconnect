import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
//import { connect } from "react-redux";
import isEmpty from "../../utility/is_empty";

class ProfileItem extends Component{
    render(){
        const {profile} = this.props;

        return (
            <div className="card car-body bg-light mb-3">
                <div className="row">
                    <div className="col-lg-2 col-md-2">
                        <img src={profile.user.avatar} alt={profile.user.name} className="img-thumbnail rounded-circle" />
                    </div>
                    <div className="col-lg-6 col-md-6 col-8">
                        <h4>{profile.user.name}</h4>
                        <p>{profile.status} {isEmpty(profile.company) ? null : (<span>at {profile.company}</span>)}</p>
                        <p>{isEmpty(profile.location) ? null : (<span>{profile.location}</span>)}</p>
                        <Link to={`profile/${profile.handle}`} className="btn btn-info" >
                            View Profile
                        </Link>
                    </div>
                    <div className="col-lg-4 col-md-4">
                        <h4>Skill Set</h4>
                        <ul className="list-group">
                            {profile.skills.slice(0,4).map((skill, index) => (
                                <li key={index} className="list-group-item">
                                    <i className="fa fa-check pr-1">{skill}</i>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        );

    }
}

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired
};

export default ProfileItem;