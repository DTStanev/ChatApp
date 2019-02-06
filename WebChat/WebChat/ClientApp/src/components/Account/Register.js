import React from 'react'
import { Link, Redirect } from 'react-router-dom';
import $ from 'jquery';
import * as constants from '../Common/ComponentConstants'

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
            },
            redirect: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/login' />
        }
    }

    handleChange(event) {
        let user = this.state.user;

        let name = event.target.name;
        let value = event.target.value;
        user[name] = value;

        this.setState({ user })
    }

    handleSubmit(event) {
        console.log(this.state.user)
        event.preventDefault();

        let data = JSON.stringify({
            username: this.state.user.username,
            password: this.state.user.password,
            confirmPassword: this.state.user.confirmPassword,
            email: this.state.user.email
        });

        $.ajax({
            url: '/api/accounts/register',
            type: constants.POST_METTHOD,
            contentType: constants.APPLICATION_JSON,
            data: data,
            success: function (result) {
                alert(result);
                this.setState({
                    redirect: true
                })
            }.bind(this),
            error: function (result) {
                alert('Error')
            }
        })
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <h1 className='text-center mb-5'>Register</h1>
                <form onSubmit={this.handleSubmit} className='mx-auto w-50'>
                    <div className='form-group'>
                        <label>Username:</label>
                        <input required type="text" name='username' value={this.state.user.username} onChange={this.handleChange} id='username' className='form-control mb-3' placeholder='At least 5 characters, including UPPER/lowercase and numbers' pattern='^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$' />
                    </div>
                    <div className='form-group'>
                        <label>Password:</label>
                        <input required type="password" name='password' value={this.state.user.password} onChange={this.handleChange} className='form-control  mb-3' placeholder='Password...' />
                    </div>
                    <div className='form-group'>
                        <label>Confirm Password:</label>
                        <input required type="password" name='confirmPassword' value={this.state.user.confirmPassword} onChange={this.handleChange} className='form-control  mb-3' placeholder='Confirm Password...' />
                    </div>
                    <div className='form-group'>
                        <label>Email:</label>
                        <input required type="email" name='email' value={this.state.user.email} onChange={this.handleChange} className='form-control mb-3' placeholder='Email...' />
                    </div>
                    <div className='mt-4 d-flex justify-content-around'>
                        <input type="submit" value="Register" className='btn btn-primary mr-5' />
                        <div>If you have an account please <Link to='/login' id='login' className='btn btn-outline-success  ' >Login</Link></div>
                    </div>
                </form>
            </div>
        );
    }