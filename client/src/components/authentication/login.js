import React, {Component} from "react";

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
        
        fetch("/users/login", {
            method: 'post',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => response.json())
        .then(data => {
            if(data.hasError){
                this.setState({errors: data.errors})
            }
        })
        .catch(err => console.log(err));
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
                                <div>
                                    <input 
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                                        type="email" placeholder="Email Address" 
                                        name="email" onChange={this.handleChange}
                                    />
                                    <span className="invalid-feedback">{errors.email}</span>
                                </div>
                                <br />

                                <div>
                                    <input 
                                        className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                                        type="password" placeholder="Password" 
                                        name="password" onChange={this.handleChange}
                                    />
                                    <span className="invalid-feedback">{errors.password}</span>
                                </div>
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

export default Login;