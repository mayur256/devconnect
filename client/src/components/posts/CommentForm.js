import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {addComment} from "../../actions/post_actions";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";

class CommentForm extends Component{
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
        const newComment = {text: this.state.text}
        this.props.addComment(this.props.postId, newComment);
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
                        Add Comment
                    </div>
                    <div className="card-body">
                        <form onSubmit={this.submitHandler}>
                            <div className="form-group">
                                <TextAreaFieldGroup name="text" placeholder="Create a Comment" 
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

CommentForm.propTypes = {
    //auth: PropTypes.object.isRequired,
    postId: PropTypes.string.isRequired,
    errors: PropTypes.object.isRequired,
    addComment: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    //auth: state.auth,
    errors: state.errors
})
export default connect(mapStateToProps, {addComment})(CommentForm);