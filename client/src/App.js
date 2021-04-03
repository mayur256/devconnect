import {BrowserRouter as Router, Route}from "react-router-dom";
import Navbar from "./components/layouts/navbar";
import Banner from "./components/layouts/banner";
import Footer from "./components/layouts/footer";
import Register from "./components/authentication/register";
import Login from "./components/authentication/login";
import './App.css';

function App() {
  return (
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
    
  );
}

export default App;
