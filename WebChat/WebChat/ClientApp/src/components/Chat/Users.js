import React, { Component } from 'react'
import './style/Users.css'
import * as constants from '../Common/ComponentConstants'

export default class Users extends Component {

    constructor(props) {
        super(props)
        this.state = {
            users: [],
            token: null
        }
    }

    componentDidMount() {
        let token = localStorage.getItem(constants.TOKEN);
        this.setState({
            token: token
        })
        fetch('api/Accounts/getusers', {
            method: constants.GET_METHOD,
            headers: {
                'Content-Type': constants.APPLICATION_JSON,
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(responseData => {
                this.setState({
                    users: responseData
                })
            })
            .catch(result => console.log(result));
    };

    render() {
        return (
            <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3 className='text-center m-3'>Users</h3>
                    </div>
                    <ul className="list-unstyled components">
                        {this.state.users.map(x => <li key={x.id} className='text-light text-line ml-2'>{x.username}</li>)}
                    </ul>
                </nav>
                <div id="content">
                </div>
            </div>
        )
    }
}