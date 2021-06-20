import {fetchWrapper} from "../utility/fetch_wrapper";
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE } from "./types";

//gets a profile data
export const getCurrentProfile = () => dispatch => {
    dispatch(setProfileLoading());
    fetchWrapper('/profiles', {method: 'GET', headers: {'Authorization': localStorage.token}})
    .then(data => {
        if(data.hasError){
            //dispatchGetProfileReducer({});
            dispatch({type: GET_PROFILE, payload: {}});
        }
        dispatch({type: GET_PROFILE, payload: data.profile});
    })
    .catch(err => {
        console.log(err);
        dispatch({type: GET_PROFILE, payload: {}});
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