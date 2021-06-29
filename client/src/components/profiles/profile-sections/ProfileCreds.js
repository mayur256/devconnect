import React, {Component} from "react";
//import isEmpty from "../../../utility/is_empty";

class ProfileCreds extends Component{
    
    render(){
        const {experience, education} = this.props;

        //JSX for Experience Array
        const expItems = experience.map(exp => {
            let from = new Date(exp.from).getDate() + "/" + (new Date(exp.from).getMonth()+1) + "/" + new Date(exp.from).getFullYear(); 
            let to = exp.current ? 'Present Day' : new Date(exp.to).getDate() + "/" + (new Date(exp.to).getMonth()+1) + "/" + new Date(exp.to).getFullYear();
            return (
                <li key={exp._id} className="list-group-item" >
                    <h5>{exp.company}</h5>
                    <p>{from} - {to}</p>
                    <p><strong>Designation</strong> : {exp.title}</p>
                    <p><strong>Location</strong> : {exp.location ? exp.location : 'None'}</p>
                    <p><strong>Description</strong> : {exp.description ? exp.description : 'None'}</p>
                </li>
            )
        });

        //JSX for Education Array
        const eduItems = education.map(edu => {
            let from = new Date(edu.from).getDate() + "/" + (new Date(edu.from).getMonth()+1) + "/" + new Date(edu.from).getFullYear(); 
            let to = edu.current ? 'Present Day' : new Date(edu.to).getDate() + "/" + (new Date(edu.to).getMonth()+1) + "/" + new Date(edu.to).getFullYear();
            return (
                <li key={edu._id} className="list-group-item" >
                    <h5>{edu.school}</h5>
                    <p>{from} - {to}</p>
                    <p><strong>Degree</strong> : {edu.degree}</p>
                    <p><strong>Specialization</strong> : {edu.field ? edu.field : 'None'}</p>
                    <p><strong>Description</strong> : {edu.description ? edu.description : 'None'}</p>
                </li>
            )
        });
        return (
            <div className="row mb-3">
                <div className="col-md-6">
                    <h4 className="text-center text-info">Experience</h4>
                    {expItems.length > 0 ? 
                        (<ul className="list-group">{expItems}</ul>) : (<p>No Experience Details Provided</p>)}
                </div>
                <div className="col-md-6" >
                    <h4 className="text-center text-info">Education</h4>
                    {eduItems.length > 0 ? 
                        (<ul className="list-group">{eduItems}</ul>) : (<p>No Education Details Provided</p>)}
                </div>
            </div>
        );
    }
}

export default ProfileCreds;