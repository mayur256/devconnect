import {GET_ERRORS} from "./types";
//Register User
export const registerUser = (userData, history) => dispatch => {
    fetch('/users/register', {
        method: 'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => {
        return response.json()
    })
    .then(data => {
        if(data.hasError){
            //this.setState({errors: data.errors});
            dispatch({
                type: GET_ERRORS,
                payload: data.errors
            });
        }
        else{
            //
            history.push('/login');
        }
    })
    .catch(err => {
        console.log(err);
    });
}

//Login User
export const loginUser = userData => dispatch => {
    fetch("/users/login", {
        method: 'post',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
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
        }
    })
    .catch(err => console.log(err));
}