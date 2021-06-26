import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import InputGroup from "../common/InputGroup";
import {createProfile, getCurrentProfile} from "../../actions/profile_actions";
import isEmpty from "../../utility/is_empty";
class CreateProfile extends Component{
    constructor(props){
        super(props);
        this.state = {
            displaySocialInputs: false,
            handle: '',
            company: '',
            website: '',
            location: '',
            status: '',
            skills: '',
            gitHubUserName: '',
            bio: '',
            twitter: '',
            facebook: '',
            linkedin: '',
            youtube: '',
            instagram: '',
            errors: {},

            //options for status
            options: [
                {key: 0, value: '* Select Professional Status'},
                {key: 'developer', value: 'Developer'},
                {key: 'junior_developer', value: 'Junior Developer'},
                {key: 'senior_developer', value: 'Senior Developer'},
                {key: 'manager', value: 'Manager'},
                {key: 'student', value: 'Student'},
                {key: 'instructor', value: 'Instructor'},
                {key: 'intern', value: 'Intern'},
                {key: 'other', value: 'Other'},
            ]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]:e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            gitHubUserName: this.state.gitHubUserName,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
        }

        this.props.createProfile(profileData, this.props.history);
    }
    
    //this function is called when a component recieves new props
    //or its internal state is updated/changed
    /*componentDidUpdate(newProps){
        console.log(newProps);
    }*/
    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({errors: newProps.errors});
        }
        if(newProps.profile.profile){
            this.initializeProfileState(newProps.profile.profile);
        }
    }

    componentDidMount(){
        if(!this.props.profile.profile){
            this.props.getCurrentProfile();
        }
        else{
            this.initializeProfileState(this.props.profile.profile);
        }
    }

    initializeProfileState(profile){
        if(!isEmpty(profile)){
            const skills = !isEmpty(profile.skills) ? profile.skills.join(',') : '';
            this.setState({
                handle: !isEmpty(profile.handle) ? profile.handle : '',
                company: !isEmpty(profile.company) ? profile.company : '',
                website: !isEmpty(profile.website) ? profile.website : '',
                location: !isEmpty(profile.location) ? profile.location : '',
                status: !isEmpty(profile.status) ? profile.status : '',
                skills: skills,
                gitHubUserName: !isEmpty(profile.gitHubUserName) ? profile.gitHubUserName : '',
                bio: !isEmpty(profile.bio) ? profile.bio : '',
                twitter: !isEmpty(profile.social.twitter) ? profile.social.twitter : '',
                facebook: !isEmpty(profile.social.facebook) ? profile.social.facebook : '',
                linkedin: !isEmpty(profile.social.linkedin) ? profile.social.linkedin : '',
                youtube: !isEmpty(profile.social.youtube) ? profile.social.youtube : '',
                instagram: !isEmpty(profile.social.instagram) ? profile.social.instagram : '' 
            });
        }
        
    }

    render(){
        const {errors} = this.state;
        const {profile} = this.props;
        const profileTitle = !isEmpty(profile.profile) ? 'Edit Profile' : 'Create Your Profile';
        let socialInputs = null;
        if(this.state.displaySocialInputs){
            socialInputs = (
                <div>
                    <InputGroup placeholder="Twitter Profile URL" name="twitter" 
                        icon="fab fa-twitter" value={this.state.twitter} 
                        onChange={this.handleChange} error={errors.twitter}
                    />

                    <InputGroup placeholder="Facebook Profile URL" name="facebook" 
                        icon="fab fa-facebook" value={this.state.facebook} 
                        onChange={this.handleChange} error={errors.facebook}
                    />

                    <InputGroup placeholder="Linkedin Profile URL" name="linkedin" 
                        icon="fab fa-linkedin" value={this.state.linkedin} 
                        onChange={this.handleChange} error={errors.linkedin}
                    />

                    <InputGroup placeholder="Youtube Channel URL" name="youtube" 
                        icon="fab fa-youtube" value={this.state.youtube} 
                        onChange={this.handleChange} error={errors.youtube}
                    />

                    <InputGroup placeholder="Instagram Profile URL" name="instagram" 
                        icon="fab fa-instagram" value={this.state.instagram} 
                        onChange={this.handleChange} error={errors.instagram}
                    />
                </div>
            );
        }
        return(
            <div className="create-profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <Link to="/dashboard" className="mt-2 btn btn-light">
                                Go Back
                            </Link>
                            <div className="form-container">
                                <h2 className="display-4 text-centre">{profileTitle}</h2>
                                <p>Let's get some information to make you profile stand out.</p>
                                <small className="d-block pb-3">Fields marked as * are required</small>

                                <form onSubmit={this.handleSubmit}>
                                    {/**Profile Handle Input */}
                                    <TextFieldGroup placeholder="* Profile Handle" name="handle"
                                        value={this.state.handle} onChange={this.handleChange}
                                        error={errors.handle}
                                        info="A unique handle for your profile URL. Your full name, company name, nickname, etc."
                                    /><br/>

                                    {/**Developer Status Input */}
                                    <SelectFieldGroup placeholder="Status" name="status"
                                        value={this.state.status} onChange={this.handleChange}
                                        error={errors.status} options={this.state.options}
                                        info="Your career status"
                                    /><br/>

                                    {/**Company at which Developer is current working */}
                                    <TextFieldGroup placeholder="Company" name="company"
                                        value={this.state.company} onChange={this.handleChange}
                                        error={errors.company}
                                        info="This could be your own company or the one you're working for."
                                    /><br/>

                                    {/**Developer's location */}
                                    <TextFieldGroup placeholder="Location" name="location"
                                        value={this.state.location} onChange={this.handleChange}
                                        error={errors.location}
                                        info="Your location preferably in format City/city & state (eg. Valsad, Gujarat)."
                                    /><br/>

                                    {/**Developer's Website */}
                                    <TextFieldGroup placeholder="Website" name="website"
                                        value={this.state.website} onChange={this.handleChange}
                                        error={errors.website}
                                        info="This could be your own website or the companys'"
                                    /><br/>

                                    {/**Skills of a Developer */}
                                    <TextFieldGroup placeholder="* Skills" name="skills"
                                        value={this.state.skills} onChange={this.handleChange}
                                        error={errors.skills}
                                        info="Please use comma separated values (eg. HTML, CSS, JS, PHP)."
                                    /><br/>

                                    {/**Developer's Github Information */}
                                    <TextFieldGroup placeholder="Github Username" name="gitHubUserName"
                                        value={this.state.gitHubUserName} onChange={this.handleChange}
                                        error={errors.gitHubUserName}
                                        info="If you want to your latest repos and a Github link, please provide your Github Username."
                                    /><br/>

                                    {/**Developer's Bio */}
                                    <TextAreaFieldGroup placeholder="Short Bio" name="bio"
                                        value={this.state.bio} onChange={this.handleChange}
                                        error={errors.bio}
                                        info="Tell us a little about yourself."
                                    /><br/>

                                    <div className="mb-3">
                                        <button type="button" className="btn btn-light" onClick={() => {
                                            this.setState(state => ({
                                                displaySocialInputs: !state.displaySocialInputs
                                            }));
                                        }}>Add Social Network Links</button>
                                        <span className="text-muted">Optional</span>
                                    </div>
                                    <br />

                                    {socialInputs}

                                    <input type="submit" className="btn btn-info btn-block mb-3"/>
                                    <br />
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
CreateProfile.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getCurrentProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, {createProfile, getCurrentProfile})(withRouter(CreateProfile));