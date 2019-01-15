import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import SendMessageBox from './SendMessageBox'
import Users from './Users'
import * as signalR from '@aspnet/signalr';
import MessageBox from './MessageBox'
import './ChatRoom.css'

export default class ChatRoom extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            currentUser: localStorage.getItem('username')
        }
    }

    SpecificClass = (message) => {
        if (message.sender === this.state.currentUser) {
            return 'ml-auto bg-info'
        }
        return '';
    };

    Sender = (message) => {
        if (message.sender === this.state.currentUser) {
            return ''
        }
        return message.sender;
    };

    Separator = (message) => {
        if (message.sender === this.state.currentUser) {
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

    addMessage = (message) => {
        this.setState(prevState => {
            let messages = prevState.messages
            messages.push(message)
            return { messages }
        })
    }

    
    render() {
        //ТODO: Need to fix bug with multiple connections ..... and messages
        let connection = new signalR.HubConnectionBuilder()
            .withUrl("/chat", { accessTokenFactory: () => localStorage.getItem('id_token') })
            .build();

        connection.on("NewMessage", data => {
            console.log(data);

            this.addMessage(data)
        });
        
        function sendMessage(message) {
            

            connection.start()
                .then(() => connection.invoke("Send", message));
            console.log(7777777777777)
        }

        //function sendPrivateMessage(message, who) {
        //    connection.start()
        //        .then(() => connection.invoke("SendChatMessage", who, message));
        //    console.log(7777777777777)
        //}

        return (
            <div>
                {this.renderRedirect()}
                <h5>Global Chat Room</h5>
                <div className='form-group border-top'>
                    {this.state.messages.map(x => <MessageBox key={x.Id} styleName={this.SpecificClass(x)} sender={this.Sender(x)} messageContent={x.content} separator={this.Separator(x)} />)}
                    <SendMessageBox SendMessage={sendMessage} />
                    <Users />
                </div>
            </div>
        )
    }
}

