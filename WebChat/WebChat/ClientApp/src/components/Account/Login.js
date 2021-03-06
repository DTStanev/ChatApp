﻿import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom';
import * as constants from '../Common/ComponentConstants';

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

        this.saveItem = this.saveItem.bind(this);
    };

    handleChange = (event) => {
        let user = this.state.user;

        let name = event.target.name;
        let value = event.target.value;
        user[name] = value;

        this.setState({ user })
    }

    saveItem(itemName, selectedValue) {
        try {
        localStorage.setItem(itemName, selectedValue);            
        } catch (error) {
            alert('AsyncStorage error: ' + error.message);
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.user.username || !this.state.user.password) return;
        
        fetch('api/Accounts/login', {
            method: constants.POST_METTHOD,
            headers: {
                Accept: constants.APPLICATION_JSON,
                'Content-Type': constants.APPLICATION_JSON
            },
            body: JSON.stringify({
                username: this.state.user.username,
                password: this.state.user.password
            })
        })
            .then(response => response.json())
            .then(responseData => {
                alert('Login Success!');
                this.setState({
                    redirect: true
                })
                this.saveItem(constants.TOKEN, responseData.token);
                this.saveItem(constants.USERNAME, responseData.userName);                
            })
            .catch(result => console.log(result));
    };

    renderRedirect = () => {
        let userToken = localStorage.getItem(constants.TOKEN);
        if (this.state.redirect || userToken) {
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