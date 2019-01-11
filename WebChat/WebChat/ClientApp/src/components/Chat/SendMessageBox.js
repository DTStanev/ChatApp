import React, { Component } from 'react'
import './SendMessageBox.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTelegramPlane } from '@fortawesome/free-brands-svg-icons'


export default class SendMessageBox extends Component {

    render() {
        return (
            <div className='panel-footer mt-3' id='message-holder'>
                <form className='form-inline' onSubmit={this.onSubmit}>
                    <label className='sr-only' htmlFor='msg'>Amount (in dollars)</label>
                    <div className='input-group col-md-12 col-sm-12'>
                        <input type='text'
                            onChange={this.handleMessageChange}
                            className='form-control bg-light'
                            id='msg'
                            placeholder='Your message'
                            autoComplete="off" />
                        <button className='btn btn-primary chat-button input-group-addon'><FontAwesomeIcon icon={faTelegramPlane} /></button >
                    </div>
                </form>
            </div>
        )
    }
}