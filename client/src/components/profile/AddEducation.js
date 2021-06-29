import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {Link, withRouter} from "react-router-dom";
import TextFieldGroup from "../common/TextFieldGroup";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import {addEducation} from "../../actions/profile_actions";

class AddEducation extends Component{
    constructor(props){
        super(props);
        this.state = {
            school: '',
            degree: '',
            field: '',
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
        const education = {
            school: this.state.school,
            degree: this.state.degree,
            field: this.state.field,
            from: this.state.from,
            to: this.state.to,
            current: this.state.current,
            description: this.state.description
        }
        this.props.addEducation(education, this.props.history);
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

    render(){
        const {errors} = this.state;
        return(
            <div className="add-education">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <div className="form-container">
                                <Link to="/dashboard" className="mt-2 btn btn-light">
                                    Go Back
                                </Link>
                                <h2 className="display-4 text-center">Add Education</h2>
                                <p className="lead text-center">Specify the schools and universities you have attended</p>
                                <small className="d-block pb-3">Fields Marked as * are required</small>

                                <form onSubmit={this.handleSubmit}>
                                    {/*School / Univesity Name */}
                                    <TextFieldGroup placeholder="* School / University" name="school"
                                        value={this.state.school} onChange={this.handleChange}
                                        error={errors.school}
                                    /><br/>
                                    {/* Bachelors / Master Degree */}
                                    <TextFieldGroup placeholder="* Degree Name" name="degree"
                                        value={this.state.degree} onChange={this.handleChange}
                                        error={errors.degree}
                                    /><br/>
                                    {/* Field of Study */}
                                    <TextFieldGroup placeholder="* Field of Study" name="field"
                                        value={this.state.field} onChange={this.handleChange}
                                        error={errors.field}
                                    /><br/>
                                    {/* School / University Joining date */}
                                    <h6>From Date</h6>
                                    <TextFieldGroup name="from" type="date"
                                        value={this.state.from} onChange={this.handleChange}
                                        error={errors.from}
                                    /><br/>

                                    {/* School / University Completion date */}
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
                                    
                                    <TextAreaFieldGroup placeholder="Course / Degree Description" name="description"
                                        value={this.state.description} onChange={this.handleChange}
                                        error={errors.description} info="Please give short description about your course"
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

AddEducation.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});
export default connect(mapStateToProps, {addEducation})(withRouter(AddEducation));