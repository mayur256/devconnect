import React, {Component} from "react";
import PropTypes from "prop-types";
import CommentItem from "./CommentItem";
class CommentList extends Component{
    render(){
        const {comments} = this.props;
        let commentListContent = null;
        if(comments && comments.length){
            commentListContent = comments.map(comment => <CommentItem key={comment._id} comment={comment} />)
        }
        else{
            commentListContent = <p className="text-center lead mt-4">No Comments Yet</p>
        }
        return (
            <div>
                {commentListContent}
                <br />
            </div>
        );
    }
}

CommentList.propTypes = {
    comments: PropTypes.array.isRequired
}

export default CommentList;