import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {deleteExperience} from "../../actions/profile_actions";
class Experience extends Component{

    onDelete(expId){
        this.props.deleteExperience(expId);
    }

    render(){
        const experience = this.props.experience.map(exp => {
            let from = new Date(exp.from).getDate() + "/" + (new Date(exp.from).getMonth()+1) + "/" + new Date(exp.from).getFullYear(); 
            let to = exp.current ? 'Present Day' : new Date(exp.to).getDate() + "/" + (new Date(exp.to).getMonth()+1) + "/" + new Date(exp.to).getFullYear();
            return (<tr key={exp._id}>
                <td>{exp.company}</td>
                <td>{exp.title}</td>
                <td>{from} - {to}</td>
                <td>
                    <button type="button" className="btn btn-danger"
                        onClick={this.onDelete.bind(this, exp._id)}>
                        Delete
                    </button>
                </td>
            </tr>)
        });

        return (
            <div>
                <h4 className="mb-4">Your Professional Experiences</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Job Title</th>
                            <th>Period</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {experience}
                    </tbody>
                </table>
            </div>
        );
    }
}

Experience.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    deleteExperience: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {deleteExperience})(Experience);