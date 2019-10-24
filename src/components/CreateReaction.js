import React, { Component } from 'react';
import { connect } from 'react-redux';
import { REACTION_OBJECTS } from '../actions/types';
import { PubSubContext } from '../pubsub';
import { createReaction } from '../actions/reactions';

class CreateReaction extends Component {
    state = { emojiShow: false };

    publishReaction = ({ type, emoji }) => () => {
        const { username, messageId } = this.props;
        this.context.pubsub.publish(createReaction({ type, emoji, username, messageId }));
        this.toggleEmoji();
    }

    toggleEmoji = () => {
        this.setState({ emojiShow: !this.state.emojiShow });
    }

    render() {
        return (
            <div className='emojis-reaction text-right'>
                <span onClick={this.toggleEmoji}>&#x263A;</span>
                <div className='emojis-container'>
                    <div className={"emojis " + (this.state.emojiShow ? 'visible' : 'hidden')}>
                        <div className='d-flex justify-content-start'>
                            {
                                REACTION_OBJECTS.map(REACTION_OBJECT => {
                                    const { type, emoji } = REACTION_OBJECT;
                                    return <div
                                                className='emoji-icons'
                                                style={{margin:5, cursor: 'pointer'}} 
                                                key={type}
                                                onClick={this.publishReaction({type, emoji})}
                                            >
                                                {emoji}
                                            </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    static contextType = PubSubContext;
}

export default connect( ({ username }) => ({ username }))(CreateReaction);