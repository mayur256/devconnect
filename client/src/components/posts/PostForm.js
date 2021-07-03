import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addPost} from "../../actions/post_actions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class PostForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            text: '',
            errors: {}
        }
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    changeHandler(e){
        this.setState({[e.target.name] : e.target.value});
    }

    submitHandler(e){
        e.preventDefault();
        const newPost = {text: this.state.text}
        this.props.addPost(newPost);
    }

    static getDerivedStateFromProps(newProps){
        return {
            //auth: newProps.auth,
            errors: newProps.errors
        }
    }

    render(){
        const {errors} = this.state;
        return (
            <div className="post-form mt-3">
                <div className="card card-info">
                    <div className="card-header bg-info text-white">
                        Say Something...
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <TextAreaFieldGroup name="text" placeholder="Create a Post" 
                                    value={this.state.text} onChange={this.changeHandler} error={errors.text}
                                />                                
                            </div>
                            <button type="submit" className="btn btn-dark pull-right">Submit</button>
                        </form>
                        
                    </div>
                </div>
            </div>
        );
    }
}

PostForm.propTypes = {
    //auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    addPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    //auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, {addPost})(PostForm);