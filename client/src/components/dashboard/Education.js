import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {deleteEducation} from "../../actions/profile_actions";
class Education extends Component{
    constructor(props){
        super(props);
    }

    onDelete(eduId){
        this.props.deleteEducation(eduId);
    }

    render(){
        const education = this.props.education.map(edu => {
            let from = new Date(edu.from).getDate() + "/" + (new Date(edu.from).getMonth()+1) + "/" + new Date(edu.from).getFullYear(); 
            let to = edu.current ? 'Present Day' : new Date(edu.to).getDate() + "/" + (new Date(edu.to).getMonth()+1) + "/" + new Date(edu.to).getFullYear();
            return (<tr key={edu._id}>
                <td>{edu.school}</td>
                <td>{edu.degree}</td>
                <td>{edu.field}</td>
                <td>{from} - {to}</td>
                <td>
                    <button type="button" className="btn btn-danger"
                        onClick={this.onDelete.bind(this, edu._id)}>
                        Delete
                    </button>
                </td>
            </tr>)
        });

        return (
            <div>
                <h4 className="mb-4">Education Profile</h4>
                <table className="table">
                    <thead>
                        <tr>
                            <th>School/University</th>
                            <th>Degree Title</th>
                            <th>Field of Study</th>
                            <th>Period</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {education}
                    </tbody>
                </table>
            </div>
        );
    }
}

Education.propTypes = {
    profile: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    deleteEducation: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    profile: state.profile,
    errors: state.errors
});

export default connect(mapStateToProps, {deleteEducation})(Education);