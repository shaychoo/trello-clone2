
import React from 'react'
import { useStoreActions } from './store';


const LoginButton = () => {

    const login = useStoreActions(actions => actions.user.login);

    return (
        <div>
            <button onClick={login}> Sign in with Google</button>
        </div>
    )
}

export default LoginButton
