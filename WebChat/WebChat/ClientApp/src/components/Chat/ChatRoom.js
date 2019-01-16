import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import SendMessageBox from './SendMessageBox'
import Users from './Users'
import * as signalR from '@aspnet/signalr';
import './ChatRoom.css'
import MessagesContainer from './MessagesContainer'

export default class ChatRoom extends Component {

    constructor(props) {
        super(props)

        this.state = {
            messages: [],
            disconnected: false,
            status: 'Connected',
            hubConnection: null
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

    click = () => {
        console.log(this.state)

        this.setState(prevState => ({
            disconnected: !prevState.disconnected,
        }), () => {
            this.setState({
                status: this.state.disconnected ? 'Discconected' : 'Connected'
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
        let token = localStorage.getItem('id_token');

        var url = new URL('https://localhost:44385/api/chat/loadhistory');
        let params = { messagesToSkip: this.state.messages.length };
        url.search = new URLSearchParams(params);

        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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
                        messages: messages
                    })
                }
            })
            .catch(result => console.log(result));

    }


    render() {
        let buttonClass = this.state.disconnected ? 'btn btn-danger' : 'btn btn-success'

        return (
            <div className='chat-room'>
                {this.renderRedirect()}
                <div className='mb-3'>
                    <h5 className='w-25'>Global Chat Room</h5>
                    <button className={buttonClass} onClick={this.click}>{this.state.status}</button>
                </div>
                <div className='form-group border-top'>
                    <MessagesContainer loadHistory={this.loadHistory} messages={this.state.messages} />
                    <SendMessageBox SendMessage={this.sendMessage} />
                    <Users />
                </div>
            </div>
        )
    }
}

