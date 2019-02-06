import React, { Component } from 'react'
import MessageBox from './MessageBox'
import './style/MessagesContainer.css'


export default class MessagesContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            currentUser: localStorage.getItem('username'),
        }
    }

    componentDidMount() {
        this.scroll();
    }

    scroll = () => {
        if (this.props.scrollToBottom) {
            this.messagesEnd.scrollIntoView({ behavior: "smooth" });
        }
    }

    componentDidUpdate() {
        this.scroll();
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


    render() {

        let messages = this.props.messages || []

        return (
            <div className='messages-container mb-4'>
                <div className='mt-2'>
                    {messages.map(x => <MessageBox key={x.Id} focus styleName={this.SpecificClass(x)} sender={this.Sender(x)} messageContent={x.content} separator={this.Separator(x)} />)}
                    <div style={{ float: "left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </div>
                </div>
            </div>
        )
    }
}