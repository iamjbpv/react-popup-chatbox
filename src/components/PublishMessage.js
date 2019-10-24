import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PubSubContext } from '../pubsub';
import { newMessage } from '../actions/messages';

class PublishMessage extends Component {
    state = { text: '' };

    updateText = event => this.setState({ text: event.target.value });

    publishMessage = () => {
        const { text } = this.state;
        const { username } = this.props;
        this.context.pubsub.publish(newMessage({ text, username}));
    }

    handleKeyPress = event => {
        if(event.key === 'Enter') {
            this.publishMessage();
            this.setState({ text: '' });
        }
    }

    render() {
        console.log('this', this);

        return (
            <div className='d-flex justify-content-start'>
                <div>
                    <button className='btn btn-send' onClick={this.publishMessage}><i className="fas fa-paper-plane text-white"></i></button>
                </div>
                <div className='w-100'>
                    <input className='form-control input-custom' type="text" placeholder="what's on your mind?" onChange={this.updateText} value={this.state.text} onKeyDownCapture={this.handleKeyPress} />
                </div>
            </div>
        )
    }

    static contextType = PubSubContext;
}


export default connect(({ username }) => ({ username }))(PublishMessage);