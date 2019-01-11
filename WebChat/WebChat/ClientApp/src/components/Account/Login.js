import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';

export default class Login extends Component {

    constructor(props) {
        super(props)

        this.state = {
            user: {
                username: '',
                password: ''
            },
            redirect: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        let user = this.state.user;

        let name = event.target.name;
        let value = event.target.value;
        user[name] = value;

        this.setState({ user })
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state.user)
        this.setState({ redirect: true });
        //TODO:....

    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/' />
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="col-md-6 col-md-offset-3">
                    <h2>Login</h2>
                    <form name="form" onSubmit={this.handleSubmit}>
                        <div className={'form-group'}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" onChange={this.handleChange} />

                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" name="password" onChange={this.handleChange} />

                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary">Login</button>

                            <Link to="/register" className="btn btn-link">Register</Link>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}