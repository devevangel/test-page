import React, { useState } from 'react'

import Register from '../components/Register';
import Login from '../components/Login';

const Auth = () => {

    const [authState, setAuthState] = useState('reg')


    return (
        <div>
            {
                authState === 'reg' ? (<Register setAuthState={setAuthState} />) : (<Login setAuthState={setAuthState} />)

            }
        </div>
    )
}

export default Auth