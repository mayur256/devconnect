import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {loginUser} from "../../actions/auth_actions";
import TextFieldGroup from "../common/TextFieldGroup";
class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        this.props.loginUser(user);
    }

    //React lifecycle hook
    componentWillReceiveProps(nextProps){
        if(nextProps.auth.isAuthenticated){
            this.props.history.push('/dashboard')
        }
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }
    
    componentDidMount(){
        if(this.props.auth.isAuthenticated){
            this.props.history.push('/dashboard');
        }
    }

    render(){
        const errors = this.state.errors;
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8">
                        <div className="form-container">
                            <form onSubmit={this.handleSubmit}>
                                <h3>Login</h3><hr />
                                <TextFieldGroup type="email" placeholder="Email Address" value={this.state.email}
                                    name="email" onChange={this.handleChange} error={errors.email}></TextFieldGroup> 
                                <br />

                                <TextFieldGroup type="password" placeholder="Password" value={this.state.password}
                                    name="password" onChange={this.handleChange} error={errors.password}></TextFieldGroup> 
                                <br />

                                <div>
                                    <button type="submit" className="btn btn-submit btn-lg btn-block">Sign In</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                    
                </div>
            </div>
        );
    }
}

//assigning proptTypes property to component for type-checking
//of properties passed
Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
} 
const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});
export default connect(mapStateToProps, {loginUser})(Login);