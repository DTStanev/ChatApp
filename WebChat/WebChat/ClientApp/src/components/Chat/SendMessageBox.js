import React, { Component } from 'react'
import './SendMessageBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'


export default class SendMessageBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        }

        this.handleMessageChange = this.handleMessageChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }

    handleMessageChange(event) {
       
        let value = event.target.value;

        this.setState({
            message: value
        })
    }

    onSubmit(event) {
        event.preventDefault();
        console.log(this.state.message);
        this.setState({
            message: ''
        });
    }

    sendMessage() {
        let message = this.state.message;

        if (message.length < 1) {
            return;
        }
        document.getElementById("sendButton").click();        
    }

    render() {

        let element = document.getElementById('msg');

        if (element) {
            element.addEventListener('keydown', function (e) {
                if (e.keyCode === 13) {
                    this.sendMessage;
                }
            })
        }


        return (
            <div className='panel-footer mt-3' id='message-holder'>
                <form className='form-inline' onSubmit={this.onSubmit}>
                    <label className='sr-only' htmlFor='msg'>Amount (in dollars)</label>
                    <div className='input-group col-md-12 col-sm-12'>
                        <input type='text'
                            onChange={this.handleMessageChange}
                            className='form-control bg-light'
                            id='msg'
                            value={this.state.message}
                            placeholder='Your message'
                            autoComplete="off" />
                        <button id='sendButton' className='btn btn-primary chat-button input-group-addon'><FontAwesomeIcon icon={faTelegramPlane} /></button >
                    </div>
                </form>
            </div>
        )
    }
}