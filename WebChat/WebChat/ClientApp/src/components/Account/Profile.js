import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import * as constants from '../Common/ComponentConstants'


export default class Profile extends Component {
    //Simple version of profile just showing personal information 
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            email: ''
        }
    }

    componentDidMount() {
        let token = localStorage.getItem(constants.TOKEN);
        this.setState({
            token: token
        })
        fetch('api/Accounts/getpersonaldata', {
            method: constants.GET_METHOD,
            headers: {                
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                this.setState({
                    username: responseData.username,
                    email: responseData.email
                })
            })
            .catch(result => console.log(result));
    }

    renderRedirect = () => {
        let userToken = localStorage.getItem(constants.TOKEN);
        if (!userToken) {
            return <Redirect to='/login' />
        }
    }

    render() {
        return (
            <div>
                {this.renderRedirect()}
                <div className="col-md-6 col-md-offset-3 mt-4">
                    <h2>Profile</h2>
                    <form name="form" onSubmit={this.handleSubmit} className='mt-5'>
                        <div className={'form-group'}>
                            <label htmlFor="username">Username</label>
                            <input type="text" className="form-control" name="username" value={this.state.username} disabled />
                        </div>
                        <div className={'form-group'}>
                            <label htmlFor="password">Email</label>
                            <input type="email" className="form-control" name="email" value={this.state.email} disabled />
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
