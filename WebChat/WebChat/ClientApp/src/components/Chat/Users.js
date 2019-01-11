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
                        {users.map(x => <li ><NavLink tag={Link} key={x.id} to={'/'.concat(x.username)} /*data='{user{id:1}}'*/ className='text-light text-line'><span className='tooltiptext'>Click to send private message</span>{x.username}</NavLink> </li>)}
                    </ul>

                </nav>
                <div id="content">
                </div>
            </div>
        )
    }
}