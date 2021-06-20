import {combineReducers} from "redux";
import authReducer from "./authreducer";
import errorReducer from "./error_reducer";
import profileReducer from "./profile_reducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    profile: profileReducer
});