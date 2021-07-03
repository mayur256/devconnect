import React, {Component} from "react";
import PropTypes from "prop-types";
import PostItem from "./PostItem";
class PostList extends Component{
    render(){
        const {posts} = this.props;
        let postListContent = null;
        if(posts.length){
            postListContent = posts.map(post => <PostItem key={post._id} post={post} />)
        }
        else{
            postListContent = <p className="text-center lead mt-4">No Posts Yet</p>
        }
        return (
            <div className="form-container">
                {postListContent}
                <br />
            </div>
        );
    }
}

PostList.propTypes = {
    posts: PropTypes.array.isRequired
}

export default PostList;