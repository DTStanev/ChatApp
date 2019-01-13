import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { NavLink } from 'reactstrap';
import './Users.css'

export default class Users extends Component {

    render() {

        let users = this.props.users || []
        return (
            <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Users</h3>
                    </div>

                    <ul className="list-unstyled components">
                        {users.map(x => <li key={x.id} className='text-light text-line'>{x.username}</li>)}
                    </ul>

                </nav>
                <div id="content">
                </div>
            </div>
        )
    }
}