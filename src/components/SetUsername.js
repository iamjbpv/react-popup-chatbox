import React from 'react';
import { connect } from 'react-redux';
import { setUsername } from '../actions/username';

const SetUsername = ({ setUsername }) => {
    return(
        <div className='username-wrapper'>
            <h5>What's Your Name?</h5>
            <input className='input-username text-center' onKeyDownCapture={setUsername} />
        </div>
    )
};

const mapDispatchToProps = dispatch => {
    return {
        setUsername: event => {
            if(event.key === 'Enter') dispatch(setUsername(event.target.value))
        }
    }
}

export default connect(null, mapDispatchToProps)(SetUsername)