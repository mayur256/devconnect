import React, {Component} from "react";
import isEmpty from "../../../utility/is_empty";
class ProfileHeader extends Component{
    render(){
        const profile = this.props.profile;
        return (
            // Profile Header
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-info text-white mb-3">
                        <div className="row">
                            <div className="col-4 col-md-3 m-auto">
                                <img className="rounded-circle" src={profile.user.avatar} alt={profile.user.name} />
                            </div>
                        </div>

                        <div className="text-center">
                            <h1 className="display-4 text-center">{profile.user.name}</h1>
                            <p className="lead text-center">{profile.status} at {profile.company}</p>
                            {!isEmpty(profile.location) ? (<p>{profile.location}</p>) : null}
                            <p>
                                {!isEmpty(profile.website) ? (<a target="_blank" href={`https://${profile.website}`} rel="noreferrer"><i className="fas fa-globe fa-2x mr-2"></i></a>) : null}
                                {!isEmpty(profile.social.twitter) ? (<a target="_blank" href={`https://${profile.social.twitter}`} rel="noreferrer"><i className="fab fa-twitter fa-2x mr-2"></i></a>) : null}
                                {!isEmpty(profile.social.facebook) ? (<a target="_blank" href={`https://${profile.social.facebook}`} rel="noreferrer"><i className="fab fa-facebook fa-2x mr-2"></i></a>) : null}
                                {!isEmpty(profile.social.linkedin) ? (<a target="_blank" href={`https://${profile.social.linkedin}`} rel="noreferrer"><i className="fab fa-linkedin fa-2x mr-2"></i></a>) : null}
                                {!isEmpty(profile.social.instagram) ? (<a target="_blank" href={`https://${profile.social.instagram}`} rel="noreferrer"><i className="fab fa-instagram fa-2x mr-2"></i></a>) : null}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileHeader;