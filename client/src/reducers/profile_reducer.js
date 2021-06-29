import {PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_PROFILES} from "../actions/types";
import isEmpty from "../utility/is_empty";
const initialState = {
    profile: null,
    profiles: null,
    loading: false
};

export default function profileReducer(state = initialState, action){
    switch(action.type){
        case PROFILE_LOADING:
            return{
                ...state,
                loading: true
            }

        case GET_PROFILE:
            return{
                ...state,
                profile: action.payload,
                loading: isEmpty(action.payload)
            }

        case CLEAR_CURRENT_PROFILE:
            return {
                ...state,
                profile: null
            }

        case GET_PROFILES:
            return {
                ...state,
                profiles: action.payload,
                loading: false
            }

        default:
            return state;
    }
}

