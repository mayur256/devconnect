import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import PostForm from "./PostForm";
import PostList from "./PostList";
import { getPosts } from "../../actions/post_actions";
import Spinner from "../common/Spinner";
class Posts extends Component{
    componentDidMount(){
        this.props.getPosts();
    }
    render(){
        const {posts, loading} = this.props.post;
        let postsContent = null;
        if(posts === null || loading){
            postsContent = <Spinner />
        }
        else{
            postsContent = <PostList posts={posts} />;
        }
        return (
            <div className="feed">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <label>Please create a Profile first, otherwise you would not be able to like other people's posts or create your own</label>
                            <PostForm />
                            <br />
                            {postsContent}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Posts.propTypes = {
    post: PropTypes.object.isRequired,
    getPosts: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
    post: state.post
});
export default connect(mapStateToProps, {getPosts})(Posts);