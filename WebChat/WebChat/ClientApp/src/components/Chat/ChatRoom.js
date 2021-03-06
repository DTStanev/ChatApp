﻿import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import SendMessageBox from './SendMessageBox'
import Users from './Users'
import * as signalR from '@aspnet/signalr';
import './style/ChatRoom.css'
import MessagesContainer from './MessagesContainer'
import * as constants from '../Common/ComponentConstants'

export default class ChatRoom extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            disconnected: false,
            status: constants.CONNECTED_STRING,
            hubConnection: null,
            scrollToBottom: true
        }
    }

    componentDidMount = () => {
        const hubConnection = new signalR.HubConnectionBuilder()
            .withUrl("/chat", { accessTokenFactory: () => localStorage.getItem('id_token') })
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('NewMessage', (receivedMessage) => {
                this.setState(prevState => {
                    let messages = prevState.messages
                    messages.push(receivedMessage)
                    let length = messages.length;
                    messages[length - 1].focus;
                    return { messages }
                })
            });
        });
    }

    renderRedirect = () => {
        let userToken = localStorage.getItem(constants.TOKEN);
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

    click = () => {

        if (!this.state.disconnected) {
            this.setState({
                scrollToBottom: false
            });
        } else {
            this.setState({
                scrollToBottom: true
            });
        }

        this.setState(prevState => ({
            disconnected: !prevState.disconnected,
        }), () => {
            this.setState({
                status: this.state.disconnected ? constants.DISCCONECTED_STRING : constants.CONNECTED_STRING
            }, () => {
                if (this.state.disconnected) {
                    this.state.hubConnection.stop()
                }
                else {
                    this.state.hubConnection
                        .start()
                        .then(() => console.log('Connection started!'))
                        .catch(err => console.log('Error while establishing connection :('));
                    this.setState({
                        messages: []
                    })
                }
            })
        });
    }

    sendMessage = (message) => {
        this.state.hubConnection
            .invoke('Send', message)
            .catch(err => console.error(err));
    };

    loadHistory = () => {
        let token = localStorage.getItem(constants.TOKEN);

        var url = new URL('https://localhost:44385/api/chat/loadhistory');
        let params = { messagesToSkip: this.state.messages.length };
        url.search = new URLSearchParams(params);

        fetch(url, {
            method: constants.GET_METHOD,
            headers: {
                'Content-Type': constants.APPLICATION_JSON,
                'Authorization': 'Bearer ' + token,
            }
        })
            .then(response => response.json())
            .then(responseData => {
                console.log(responseData);
                let messages = [];
                if (responseData.length > 0) {
                    messages.push.apply(messages, responseData);
                    console.log(messages);
                    messages.push.apply(messages, this.state.messages);
                    this.setState({
                        messages: messages,
                        scrollToBottom: false
                    })
                }
            })
            .catch(result => console.log(result));
    }

    render() {
        let buttonClass = this.state.disconnected ? 'btn btn-danger' : 'btn btn-success';

        return (
            <div className='chat-room'>
                {this.renderRedirect()}
                <div className='mb-3'>
                    <h5 className='w-25'>Global Chat Room</h5>
                    <button className={buttonClass} onClick={this.click}>{this.state.status}</button>
                </div>
                <div className='form-group border-top'>
                    <div className='text-center'><button className='btn btn-light mt-2' onClick={this.loadHistory} >Load more messages</button></div>
                    <MessagesContainer scrollToBottom={this.state.scrollToBottom} messages={this.state.messages} />
                    <SendMessageBox SendMessage={this.sendMessage} />
                    <Users />
                </div>
            </div>
        )
    }
}

