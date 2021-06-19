import {BrowserRouter as Router, Route}from "react-router-dom";
import {Provider} from "react-redux";
import store from "./store";
import jwt_decode from "jwt-decode";
import Navbar from "./components/layouts/navbar";
import Banner from "./components/layouts/banner";
import Footer from "./components/layouts/footer";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import { logoutUser, setCurrentUser } from "./actions/auth_actions";

import './App.css';


//Check for the token
if(localStorage.jwtToken){
  //set auth token for every request header
  //setAuthToken();

  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));
  //check if the token has expired
  const currentTimeInSec = Date.now() / 1000;
  if(currentTimeInSec < decoded.exp){
    //logout the user
    store.dispatch(logoutUser())

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
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>    
  );
}

export default App;
