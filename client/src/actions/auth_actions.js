import {GET_ERRORS, SET_CURRENT_USER} from "./types";
import {fetchWrapper} from "../utility/fetch_wrapper";
import jwt_decode from "jwt-decode";
//Register User
export const registerUser = (userData, history) => dispatch => {
    /**fetchWrapper(url, requestOptions) */
    fetchWrapper('/users/register', {method: 'post', payload: userData})
    .then(data => {
        if(data.hasError){
            //this.setState({errors: data.errors});
            dispatch({
                type: GET_ERRORS,
                payload: data.errors
            });
        }
        else{
            history.push('/login');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

//Login User
export const loginUser = userData => dispatch => {
    /**fetchWrapper(url, requestOptions) */
    fetchWrapper('/users/login', {method: 'post', payload: userData})
    .then(data => {
        if(data.hasError){
            //this.setState({errors: data.errors})
            dispatch({
                type:GET_ERRORS,
                payload: data.errors
            });
        }
        else{
            const {token} = data;
            //set the token in localStorage
            localStorage.setItem('jwtToken', token);
            //setAuthToken(token)
            //get user data from token
            const decoded = jwt_decode(token);
            dispatch(setCurrentUser(decoded));
        }
    })
    .catch(err => console.log(err));
}

//Set current User from decoded data
export const setCurrentUser = (decoded) => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}

//Logout the current user on a specific action
export const logoutUser = () => dispatch => {
    //removing token from local storage
    localStorage.removeItem('jwtToken')
    //also remove token from Authorization header
    //removeAuthToken()
    dispatch(setCurrentUser({}));
    //redirect to login page
    window.location.href = "/login";
}