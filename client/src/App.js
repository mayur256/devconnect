import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import PrivateRoute from "./components/common/PrivateRoute";
import {Provider} from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import Navbar from "./components/layouts/navbar";
import Banner from "./components/layouts/banner";
import Footer from "./components/layouts/footer";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import Dashboard from "./components/dashboard/Dashboard";
import AddExperience from "./components/profile/AddExperience";
import AddEducation from "./components/profile/AddEducation";
import CreateProfile from "./components/profile/CreateProfile";
import ViewProfile from "./components/profiles/ViewProfile";
import Profiles from "./components/profiles/Profiles";
import { logoutUser, setCurrentUser } from "./actions/auth_actions";
import { clearCurrentProfile } from "./actions/profile_actions";
import './App.css';



//Check for the token
if(localStorage.jwtToken){
  //set auth token for every request header
  //setAuthToken();

  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  //check if the token has expired
  const currentTimeInSec = Date.now() / 1000;
  if(currentTimeInSec > decoded.exp){
    //logout the user
    store.dispatch(logoutUser());
    //Clear the current profile
    store.dispatch(clearCurrentProfile());
    //redirect to login page
    window.location.href = "/login";
  }
}
function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Navbar />
          {/* Main section*/}
          <Route exact path="/" component={Banner} />
          <div className="container">
            <Route exact path="/register" component={Register} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/developers" component={Profiles} />
            <Route exact path="/profile/:handle" component={ViewProfile} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/create-profile" component={CreateProfile} />
              <PrivateRoute exact path="/edit-profile" component={CreateProfile} />
              <PrivateRoute exact path="/add-experience" component={AddExperience} />
              <PrivateRoute exact path="/add-education" component={AddEducation} />
            </Switch>
            
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>    
  );
}

export default App;
