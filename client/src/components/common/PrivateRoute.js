import { Route, Redirect } from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from "prop-types";

function PrivateRoute({children, auth, ...rest}){
    if(auth.isAuthenticated){
        return (
            <Route {...rest} />
        );
    }
    return (<Redirect to="/login"/>);
}

PrivateRoute.propTypes = {
    auth: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
    auth: state.auth
});
export default connect(mapStateToProps)(PrivateRoute);