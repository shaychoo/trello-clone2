import { Action, action, Thunk, thunk } from "easy-peasy";
import firebase from 'firebase';

export interface UserModel {
  user: any;
  login: Thunk<UserModel, any>;
  setUser:Action<UserModel,any>
}

const user: UserModel = {
  user: {},

  setUser:action((state,user)=>{
      state.user = user;
      console.log(user)
  }),
  
  login :thunk( async (actions,payload) => {    
    const provider = new firebase.auth.GoogleAuthProvider();
    let {user} = await firebase.auth().signInWithPopup(provider)
      actions.setUser({uid:user.uid})
      
  })


};

export default user;