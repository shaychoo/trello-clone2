import React from 'react'
import PropTypes from 'prop-types'
import { User } from '../../model/user';
import {useStoreState} from '../../store'
import LoginButton from './LoginButton';
import SaveBoardButton from './SaveBoardButton';
import { Avatar } from '@material-ui/core';


function UserAvatar() {
    const user = useStoreState<Partial<User>>(store=>{ return store.user.user });
    
    return (
      user == undefined ?  <LoginButton />: <div><Avatar src={user.photoURL} ></Avatar> <SaveBoardButton /> </div>
    
    )
}

UserAvatar.propTypes = {

}

export default UserAvatar

