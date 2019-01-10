import React from 'react'
import { Link, withRouter, Redirect } from 'react-router-dom';
import $ from 'jquery';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: '',
                confirmPassword: '',
                email: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
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
            url: '/api/accounts',
            type: 'post',
            contentType: 'application/json',
            data: data,
            success: function (result) {
                alert(result);
                document.getElementById("login").click();
            },
            error: function (result) {
                alert('Error')
            }
        })
    }

    render() {
        return (
            <div>
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
                        <input type="submit" value="Register" className='btn btn-primary' />

                        <div>If you have an account please <Link to='/login' id='login' className='btn btn-outline-success  ' >Login</Link></div>

                    </div>
                </form>

            </div>
        );
    }
}