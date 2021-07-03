import React, {Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import classnames from "classnames";
import { connect } from "react-redux";
import {deletePost, addLike, removeLike} from "../../actions/post_actions";
class PostItem extends Component{
    onDelete(id){
        this.props.deletePost(id);
    }

    onLiked(id){
        this.props.addLike(id);
    }

    onDisliked(id){
        this.props.removeLike(id);
    }

    hasAnyLike(likes){
        const {auth} = this.props;
        return likes.some(like => like.user === auth.user.id);
    }

    render(){
        const {auth, post, showActions} = this.props;
        return (
            <div className="card card-body mb-3">
                <div className="row">
                    <div className="col-md-2">
                        <Link to="/profile/mayur123">
                            <img className="img-thumbnail rounded-circle d-none d-md-block" 
                                src={post.avatar} alt={post.name}
                            />
                        </Link>
                        <p className="text-center">{post.name}</p>
                    </div>
                    <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                        {showActions ? (
                            <div>
                                <button onClick={this.onLiked.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                                    <i className={classnames('fas fa-thumbs-up', {
                                        'text-info': this.hasAnyLike(post.likes)
                                    })}></i>
                                    <span className="badge badge-light">{post.likes.length}</span>
                                </button>
                                <button onClick={this.onDisliked.bind(this, post._id)} type="button" className="btn btn-light mr-1">
                                    <i className="text-secondary fas fa-thumbs-down"></i>
                                    <span className="badge badge-light"></span>
                                </button>
                                <Link to={`/post/${post._id}/comment`} className="btn btn-info mr-1">
                                    Comments
                                </Link>
                                {post.user === auth.user.id ? (
                                    <button className="btn btn-danger pull-right mr-1" type="button" 
                                        onClick={this.onDelete.bind(this, post._id)}
                                    >
                                        Delete Post
                                    </button>
                                ) : null}
                            </div>    
                        ) : null}
                        
                        
                    </div>
                </div>
            </div>
        )
    }
}

PostItem.defaultProps = {
    showActions: true
};

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    deletePost: PropTypes.func.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {deletePost, addLike, removeLike})(PostItem);