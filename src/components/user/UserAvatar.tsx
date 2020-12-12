import React from 'react'
import PropTypes from 'prop-types'
import { User } from '../../model/user';
import {useStoreState} from '../../store'
import LoginButton from './LoginButton';


function UserAvatar() {
    const user = useStoreState<Partial<User>>(store=>{ return store.user.user });
    
    return (
      user == undefined ?  <LoginButton />: <div><img src={user.photoURL} />  </div>
    
    )
}

UserAvatar.propTypes = {

}

export default UserAvatar

