import {fetchWrapper} from "../utility/fetch_wrapper";
import { GET_ERRORS, ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST, CLEAR_ERRORS } from "./types";

//Create a New Post
export const addPost = postData => dispatch => {
    dispatch(clearErrors());
    fetchWrapper('/posts/create', {method: 'POST', headers:{'Authorization': localStorage.jwtToken}, payload: postData})
    .then(data => {
        if(!data.hasError) dispatch({type: ADD_POST, payload: data.post});
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.errors});
    })
    .catch(err => {
        dispatch({type: GET_ERRORS, payload: err}); 
    })
}

//Get all Posts stored in the system
export const getPosts = () => dispatch => {
    dispatch(setPostLoading());
    fetchWrapper('/posts/all', {method: 'GET', headers:{'Authorization': localStorage.jwtToken}})
    .then(data => {
        if(data.hasError) dispatch({type: GET_POSTS, payload: null});
        if(!data.hasError) dispatch({type: GET_POSTS, payload: data.posts});
    })
}

//set Post loading flag
export const setPostLoading = () =>{
    return {type: POST_LOADING};
}

//Delete a Post
export const deletePost = postId => dispatch => {
    if(window.confirm("Are you sure, you want to remove this post?")){
        dispatch(setPostLoading());
        fetchWrapper(`/posts/delete/${postId}`, {method: 'DELETE', headers:{'Authorization': localStorage.jwtToken}})    
        .then(data => {
            if(!data.hasError) dispatch({type: DELETE_POST, payload: postId});
        })
        .catch(err => console.log(err))
    }
}

//Add Likes to a Post
export const addLike = postId => dispatch => {
    fetchWrapper(`/posts/like/${postId}`, {method: 'POST', headers: {'Authorization': localStorage.jwtToken}})
    .then(data => {
        if(!data.hasError) dispatch(getPosts());
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.error});
    })
    .catch(err => console.log(err))
}

//remove Likes of a Post
export const removeLike = postId => dispatch => {
    fetchWrapper(`/posts/dislike/${postId}`, {method: 'POST', headers: {'Authorization': localStorage.jwtToken}})
    .then(data => {
        if(!data.hasError) dispatch(getPosts());
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.error});
    })
    .catch(err => console.log(err))
}

//Get a Post by its id
export const getPost = postId => dispatch=> {
    fetchWrapper(`/posts/get/${postId}`, {method: 'GET', headers: {'Authorization': localStorage.jwtToken}})
    .then(data => {
        if(!data.hasError) dispatch({type: GET_POST, payload: data.post});
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.error});
    })
    .catch(err => console.log(err));
}

//add a comment to a post
export const addComment = (postId,commentData) => dispatch => {
    dispatch(clearErrors());
    fetchWrapper(`/posts/comments/${postId}`, {method: 'POST', headers:{'Authorization': localStorage.jwtToken}, payload: commentData})
    .then(data => {
        if(!data.hasError) dispatch({type: GET_POST, payload: data.post});
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.errors});
    })
    .catch(err => {
        dispatch({type: GET_ERRORS, payload: err}); 
    })
}

//delete a comment of a post
export const deleteComment = (postId,commentId) => dispatch => {
    //dispatch(setPostLoading());
    if(window.confirm("Are you sure you want to remove this comment?")){
        fetchWrapper(`/posts/comments/${postId}/delete/${commentId}`, {method: 'DELETE', headers:{'Authorization': localStorage.jwtToken}})
        .then(data => {
            if(!data.hasError) dispatch({type: GET_POST, payload: data.post});
            if(data.hasError) dispatch({type: GET_ERRORS, payload: data.errors});
        })
        .catch(err => {
            dispatch({type: GET_ERRORS, payload: err}); 
        })
    }
}

//Reset the error messages
export const clearErrors = () => dispatch => {
    dispatch({type: CLEAR_ERRORS});
}