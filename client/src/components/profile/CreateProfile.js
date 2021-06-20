import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import SelectFieldGroup from "../common/SelectFieldGroup";
import InputGroup from "../common/InputGroup";
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
    }
    render(){
        const errors = this.state.errors;
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
                            <div className="form-container">
                                <h2 className="display-4 text-centre">Create Your Profile</h2>
                                <p>Let's get some information to make you profile stand out.</p>
                                <small className="d-block pb-3">* = required field</small>

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
                                    <TextFieldGroup placeholder="Skills" name="skills"
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
                                        <button className="btn btn-light" onClick={() => {
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
    errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(null)(CreateProfile);