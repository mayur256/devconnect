import React, {Component} from "react";
import './register.css';
class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors:{}
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        const newUser = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        };
        
        fetch('/users/register', {
            method: 'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newUser)
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            if(data.hasError){
                this.setState({errors: data.errors});
            }
            else{
                //
            }
        })
        .catch(err => {
            console.log(err);
        });
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
                                
                                <h3>Register</h3><hr />
                                <div>
                                    <input 
                                        className={`form-control ${errors.name ? 'is-invalid' : ''}`} 
                                        type="text" placeholder="Full Name" 
                                        name="name" value={this.state.name}
                                        onChange={this.handleChange}
                                    />
                                    <span className="invalid-feedback">{errors.name}</span>
                                </div>
                                
                                <br />

                                <div>
                                    <input 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} type="email" 
                                        placeholder="Email Address" name="email" 
                                        value={this.state.email}
                                        onChange={this.handleChange}
                                    />
                                    <span className="invalid-feedback">{errors.email}</span>
                                    <label>This site uses Gravatar, so if you want a profile image, we will use this email for it.</label>
                                    
                                </div>
                                <br />

                                <div>
                                    <input 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} name="password"
                                        type="password" placeholder="Password" 
                                        value={this.state.password}
                                        onChange={this.handleChange}
                                    />
                                    <span className="invalid-feedback">{errors.password}</span>
                                </div>
                                <br />

                                <div>
                                    <input 
                                        className={`form-control ${errors.password2 ? 'is-invalid' : ''}`} type="password" 
                                        placeholder="Confirm Password"
                                        value={this.state.password_confirm}
                                        name="password_confirm"
                                        onChange={this.handleChange}
                                    />
                                    <span className="invalid-feedback">{errors.password2}</span>
                                </div>
                                <br />

                                <div>
                                    <button type="submit" className="btn btn-submit btn-lg btn-block">Sign Up</button>
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

export default Register;