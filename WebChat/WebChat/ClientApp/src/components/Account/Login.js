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
        localStorage.setItem(itemName, JSON.stringify(selectedValue));            
        } catch (error) {
            alert('AsyncStorage error: ' + error.message);
            console.error('AsyncStorage error: ' + error.message);
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.user.username || !this.state.user.password) return;
        
        fetch('api/Accounts/login', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.user.username,
                password: this.state.user.password
            })
        })
            .then(response => response.json())
            .then(responseData => {
                alert('Login Success!');
                console.log(responseData);
               this.saveItem('id_token', responseData.token);                
            })
    };

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