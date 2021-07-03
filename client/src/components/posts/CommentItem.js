import React, {Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
//import classnames from "classnames";
import { connect } from "react-redux";
import {deleteComment} from "../../actions/post_actions";
class CommentItem extends Component{
    onDelete(postId, commentId){
        this.props.deleteComment(postId, commentId);
    }

    render(){
        const {post, comment, auth} = this.props;

        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/profile/mayur123">
                            <img className="img-thumbnail rounded-circle d-none d-md-block" 
                                src={comment.avatar} alt={comment.name}
                            />
                        </Link>
                        <p className="text-center">{comment.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{comment.text}</p>
                        {comment.user === auth.user.id ? (
                            <button className="btn btn-danger mr-1" type="button" 
                                onClick={this.onDelete.bind(this, post.post._id, comment._id)}
                            >
                                Delete Comment
                            </button>
                        ) : null}
                        
                    </div>
                </div>
            </div>
        )
    }
}

CommentItem.propTypes = {
    comment: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deleteComment: PropTypes.func.isRequired,
    post: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    post: state.post
});

export default connect(mapStateToProps, {deleteComment})(CommentItem);