import React, { Component } from 'react'
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

    render() {
        //inserted fake users for test 
        const users = [{ id: 1, username: 'FriendUser', messageContent: 'Здрасти, как си' }, { id: 2, username: 'mitaka', messageContent: 'Добре съм, а ти' },]

        return (
            <div>
                <h5>Global Chat Room</h5>
                <div className='form-group border-top'>
                    {users.map(x => <MessageBox key={x.id} sender={this.Sender(x)} messageContent={x.messageContent} styleName={this.SpecificClass(x)} separator={this.Separator(x)} />)}
                    <SendMessageBox />
                    <Users  />
                </div>
            </div>
        )
    }
}

