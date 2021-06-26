import {fetchWrapper} from "../utility/fetch_wrapper";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, 
    GET_ERRORS, SET_CURRENT_USER } from "./types";

//gets a profile data
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    fetchWrapper('/profiles', {method: 'GET', headers: {'Authorization': localStorage.jwtToken}})
    .then(data => {
        if(data.hasError){
            //dispatchGetProfileReducer({});
            dispatch({type: GET_PROFILE, payload: {}});
        }
        else{
            dispatch({type: GET_PROFILE, payload: data.profile});
        }
        
    })
    .catch(err => {
        console.log(err);
        dispatch({type: GET_PROFILE, payload: {}});
    })
}

//create Profile
export const createProfile = (profileData, history) => dispatch => {
    fetchWrapper('/profiles', {method: 'POST', headers: {'Authorization': localStorage.jwtToken},
                                payload: profileData})
    .then(data => {
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.errors});
        if(!data.hasError) history.push('/dashboard');
    })
    .catch(err => {
        dispatch({type: GET_ERRORS, payload: {}});
    })
}

//sets the profile loading flag
export const setProfileLoading = () =>{
    return {type: PROFILE_LOADING};
}

//dispatch to profile reducer for type = 'GET_PROFILE' after the action is completed
/*const dispatchGetProfileReducer = (dispatch,payload) => {
    dispatch({
        type: GET_PROFILE,
        payload
    });
}*/

//Clears the current profile
export const clearCurrentProfile = () => {
    return{type: CLEAR_CURRENT_PROFILE}
}

//delete an user account
export const deleteAccount = () => dispatch => {
    if(window.confirm("Are you sure, you want to delete your account?")){
        fetchWrapper('/profiles/delete', {method: 'DELETE', headers: {'Authorization': localStorage.jwtToken}})
        .then(data => {
            if(!data.hasError) dispatch({type: SET_CURRENT_USER, payload: {}});
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//add Experience to profile
export const addExperience = (experience,history) => dispatch => {
    fetchWrapper('/profiles/experience/store', {method: 'POST', headers: {'Authorization': localStorage.jwtToken}, payload: experience})
    .then(data => {
        if(!data.hasError) history.push('/dashboard');
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.errors});
    })
    .catch(err => {
        console.log(err);
    })
}

//add Education to profile
export const addEducation = (education,history) => dispatch => {
    fetchWrapper('/profiles/education/store', {method: 'POST', headers: {'Authorization': localStorage.jwtToken}, payload: education})
    .then(data => {
        if(!data.hasError) history.push('/dashboard');
        if(data.hasError) dispatch({type: GET_ERRORS, payload: data.errors});
    })
    .catch(err => {
        console.log(err);
    })
}

//delete experience attached to a user profile
export const deleteExperience = expId => dispatch => {
    if(window.confirm("Are you sure you want to remove your experience?")){
        fetchWrapper(`/profiles//experience/delete/${expId}`, {method: 'DELETE', headers:{'Authorization': localStorage.jwtToken}})    
        .then(data => {
            if(!data.hasError) dispatch({type: GET_PROFILE, payload: data.profile});
            if(data.hasError) alert("Something went wrong while deleting experience");
        })
        .catch(err => {
            console.log(err);
        })
    }
}

//delete educationinfo attached to a user profile
export const deleteEducation = eduId => dispatch => {
    if(window.confirm("Are you sure you want to remove your education details?")){
        fetchWrapper(`/profiles/education/delete/${eduId}`, {method: 'DELETE', headers:{'Authorization': localStorage.jwtToken}})    
        .then(data => {
            if(!data.hasError) dispatch({type: GET_PROFILE, payload: data.profile});
            if(data.hasError) alert("Something went wrong while deleting education details");
        })
        .catch(err => {
            console.log(err);
        })
    }
}