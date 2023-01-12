// top level imports
import fs from 'node:fs'

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

    /**
     * @param {string} postId
     * @returns {Promise<any>}
     * @desc - Gets a post by its Id
     */
    getPostById = async (postId: string): Promise<any> => {
        return await Post.findOne({ _id: postId });
    }

    /**
     * @param {string} postId
     * @returns {Promise<boolean>}
     * @desc - check whether the system has post with given post id
     */
    postExists = async (postId: string): Promise<boolean> => {
        let result = false;
        const posts = await Post.find({ _id: postId });
        result = posts.length > 0;
        return result;
    }

    /**
     * @param {string} postId
     * @param {IPost} postFieldsPayload
     * @desc - updates a post with given id and payload
     */
    updatePost = async (postId: string, postFieldsPayload: IPost): Promise<any> => {
        let post = null;
        await Post.findOneAndUpdate({ _id: postId }, postFieldsPayload)
        post = this.getPostById(postId)
        return post;
    }

    /**
     * @returns {Array<IPost>}
     * @desc - returns all the posts in the system
     */
    getAllPosts = async (): Promise<Array<IPost>> => {
        return await Post.find();
    }

    deletePostById = async (postId: string): Promise<void> => {
        const postToBeDeleted = await this.getPostById(postId);
        // delete all attachments for the post
        for (const file of postToBeDeleted.attachments) {
            fs.unlinkSync(`/tmp/uploads/${file}`);
        }

        await Post.findOneAndDelete({ _id: postId });
    }
};

export default new PostService();
