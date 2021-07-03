import React, {Component} from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {getPost} from "../../actions/post_actions";
import Spinner from "../common/Spinner";
import PostItem from "./PostItem";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

class PostComment extends Component{
    componentDidMount(){
       this.props.getPost(this.props.match.params.id);
    }
    render(){
        const{post, loading} = this.props.post;
        let postCommentContent = null;
        if(post === null || !Object.keys(post).length || loading){
            postCommentContent = <Spinner />
        }
        else{
            postCommentContent = <PostItem post={post} showActions={false}/>
        }
        return (
            <div className="container form-container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/post-feed" className="btn btn-light mb-3">Go Back</Link>
                        {postCommentContent}
                        <CommentForm postId={post._id}/>
                        <br />
                        <CommentList comments={post.comments} />
                    </div>
                </div>
            </div>
        );
    }
}

PostComment.propTypes = {
    post: PropTypes.object.isRequired,
    getPost: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    post: state.post
});
export default connect(mapStateToProps, {getPost})(PostComment);