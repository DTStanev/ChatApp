import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import SendMessageBox from './SendMessageBox'
import Users from './Users'
import MessageBox from './MessageBox'
import './ChatRoom.css'

export  default class ChatRoom extends Component {
    
    SpecificClass = (message) => {
        if (message.username === 'mitaka') {
            return 'ml-auto bg-info'
        }
        return '';
    };

    Sender = (message) => {
        if (message.username === 'mitaka') {
            return ''
        }
        return message.username;
    };

    Separator = (message) => {
        if (message.username === 'mitaka') {
            return ''
        }
        return ':';
    };

    renderRedirect = () => {
        let userToken = localStorage.getItem('id_token');
        if (!userToken) {
            return <Redirect to='/login' />
        }
    }

    render() {
        //inserted fake users for test 
       

        return (
            <div>
                {this.renderRedirect()}
                <h5>Global Chat Room</h5>
                <div className='form-group border-top'>
                   
                    <SendMessageBox />
                    <Users  />
                </div>
            </div>
        )
    }
}

