import React, {Component} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

class ProfileGithub extends Component{
    constructor(props){
        super(props);
        this.state = {
            clientId: 'c7068699ebf58284e4da',
            clientSecret: 'cb5e59908de163efab8d2af51d7799af8d0c1424',
            count: 5,
            sort: 'created: asc',
            repos: []
        };
    }

    componentDidMount(){
        const {githubusername} = this.props;
        const {count, sort, clientId, clientSecret} = this.state;

        fetch(`https://api.github.com/users/${githubusername}/repos?per_page=${count}&sort=${sort}
        &client_id=${clientId}&client_secret=${clientSecret}`)
        .then(res => res.json())
        .then(data => this.setState({repos: data}))
        .catch(err => {
            console.log(err);
        })
    }

    render(){
        const {repos} = this.state;
        const repoItems = repos.map(repo => (
            <div key={repo.id} className="card card-body mb-2">
                <div className="row">
                    <div className="col-md-6">
                        <h5>
                            <a href={repo.html_url} className="text-info" rel="noreferrer" target="_parent">
                                {repo.name}
                            </a>
                        </h5>
                        <p>{repo.description}</p>
                    </div>
                    <div className="col-md-6">
                        <span className="badge badge-info mr-1">
                            Stars: {repo.stargazers_count}
                        </span>
                        <span className="badge badge-secondary mr-1">
                            Watchers: {repo.watchers_count}
                        </span>
                        <span className="badge badge-success">
                            Forks: {repo.forks_count}
                        </span>
                    </div>
                </div>
            </div>
        ));
        return (
            <div ref="myRef">
                <hr />
                <h3 className="mb-4">Latest Github Repos</h3>
                {repoItems}
            </div>
        );
    }
}

ProfileGithub.propTypes = {
    githubusername: PropTypes.string.isRequired
}
export default ProfileGithub;