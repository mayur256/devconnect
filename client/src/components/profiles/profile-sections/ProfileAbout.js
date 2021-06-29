import React, {Component} from "react";
import isEmpty from "../../../utility/is_empty";
class ProfileAbout extends Component{    
    render(){
        const profile = this.props.profile;
        const bioTitle = profile.user.name.split(' ')[0] + "'s Bio";

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card card-body bg-light mb-3 text-center">
                        <h3 className="text-info">
                            {bioTitle}
                        </h3>
                        {!isEmpty(profile.bio) ? 
                            (<span>{profile.bio}</span>) : (<span>Not available</span>)}
                    </div>
                </div>
            </div>
        );
    }
}

export default ProfileAbout;