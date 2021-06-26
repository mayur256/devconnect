import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {getCurrentProfile, addExperience} from "../../actions/profile_actions";
class AddExperience extends Component{
    constructor(props){
        super(props);
        this.state = {
            company: '',
            title: '',
            location: '',
            from: '',
            to: '',
            current: false,
            description: '',
            errors: {},
            disabled: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onChecked = this.onChecked.bind(this);
    }

    handleSubmit(e){
        e.preventDefault();
        const experience = {
            company: this.state.company,
            title: this.state.title,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.addExperience(experience, this.props.history);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    onChecked(){
        this.setState({
            disabled: !this.state.disabled,
            current: !this.state.current            
        });
    }

    static getDerivedStateFromProps(newProps){
        return{
            errors: newProps.errors,
            profile: newProps.profile
        }
    }

    componentDidUpdate(){}

    componentDidMount(){
    }
    render(){
        const {errors} = this.state;
        return (
            <div className="add-experience">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="form-container">
                                <Link to="/dashboard" className="mt-2 btn btn-light">
                                    Go Back
                                </Link>
                                <h2 className="display-4 text-center">Add Experience</h2>
                                <p className="lead text-center">Specify the roles that you've had or are currently working at</p>
                                <small className="d-block pb-3">Fields Marked as * are required</small>

                                <form onSubmit={this.handleSubmit}>
                                    {/*Company where Developer has worked or is current Working */}
                                    <TextFieldGroup placeholder="* Company" name="company"
                                        value={this.state.company} onChange={this.handleChange}
                                        error={errors.company}
                                    /><br/>
                                    {/* Job Title */}
                                    <TextFieldGroup placeholder="* Job Title" name="title"
                                        value={this.state.title} onChange={this.handleChange}
                                        error={errors.title}
                                    /><br/>
                                    {/* Location of the job */}
                                    <TextFieldGroup placeholder="* Job Location" name="location"
                                        value={this.state.location} onChange={this.handleChange}
                                        error={errors.location}
                                    /><br/>
                                    {/* Joining Date */}
                                    <h6>From Date</h6>
                                    <TextFieldGroup name="from" type="date"
                                        value={this.state.from} onChange={this.handleChange}
                                        error={errors.from}
                                    /><br/>

                                    {/* Resign Date */}
                                    <h6>To Date</h6>
                                    <TextFieldGroup name="to" type="date"
                                        value={this.state.to} onChange={this.handleChange}
                                        error={errors.to} disabled={this.state.disabled ? 'disabled' : ''}
                                    /><br />

                                    <div className="form-check mb-4">
                                        <input type="checkbox" className="form-check-input"
                                            name="current" id="current" value={this.state.current}
                                            checked={this.state.current} onChange={this.onChecked}
                                        />
                                        <label htmlFor="current" className="form-check-label">Current Job</label>
                                    </div>
                                    
                                    <TextAreaFieldGroup placeholder="Job Description" name="description"
                                        value={this.state.description} onChange={this.handleChange}
                                        error={errors.description} info="Please give short description about your job"
                                    /><br />

                                    <input type="submit" className="btn btn-info btn-block" /> <br/>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

AddExperience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    getCurrentProfile: PropTypes.func.isRequired,
    addExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors 
});

export default connect(mapStateToProps, {getCurrentProfile, addExperience})(withRouter(AddExperience));