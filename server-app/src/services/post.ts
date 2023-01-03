// top level imports

// Models
import Post from '../models/Post';

// types
import { IPost } from '../types/Post';
/**
 * Service container for Post entity
 */
class PostService {
    /**
    * @param {IPost} postFields
    * @returns {Promise<any>}
    * @desc - creates a post based on the data in request body
    */
    createPost = async (postFields: IPost): Promise<any> => {
        let post = null;
        // instantiate post model and save
        post = new Post(postFields);
        await post.save();
        return post;
    }
};

export default new PostService();
