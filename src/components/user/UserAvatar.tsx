import React from 'react'
import PropTypes from 'prop-types'
import { User } from '../../model/user';
import {useStoreState} from '../../store'
import LoginButton from './LoginButton';
import SaveBoardButton from './SaveBoardButton';


function UserAvatar() {
    const user = useStoreState<Partial<User>>(store=>{ return store.user.user });
    
    return (
      user == undefined ?  <LoginButton />: <div><img src={user.photoURL} /> <SaveBoardButton /> </div>
    
    )
}

UserAvatar.propTypes = {

}

export default UserAvatar

