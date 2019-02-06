import React, { Component } from 'react'
import classnames from 'classnames'
import './style/MessageBox.css'

export default class MessageBox extends Component {
    render() {
        return (
            <div className='mb-4'>
                <div id='chat-line' className={classnames(this.props.styleName, 'form-control m-3')}>
                    <div>{this.props.sender}{this.props.separator}</div>
                    <div>{this.props.messageContent}</div>
                </div>
            </div>
        )
    }
}