import React, {Component} from "react";

class ErrorBoundary extends Component{
    constructor(props){
        super(props);
        this.state = {hasError: false}
    }

    static getDerivedStateFromError(err){
        console.log(err);
        return {hasError: true}
    }

    componentDidCatch(error, info){
        console.log({error, info});
    }

    render(){
        if(this.state.hasError){
            return (
                <div className="container text-center">
                    <h4 className="display-4">Something went wrong!</h4>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;