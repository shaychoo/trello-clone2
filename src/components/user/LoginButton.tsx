
import React from 'react'
import { useStoreActions } from '../../store';
import {Button} from '@material-ui/core'
const LoginButton = () => {

    const login = useStoreActions(actions => actions.user.login);

    return (
            <Button variant="outlined" color="primary" onClick={()=>{login(null)}}> Sign in with Google</Button>
    )
}

export default LoginButton
