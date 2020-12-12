import { Action, action, Thunk, thunk } from "easy-peasy";
import firebase from 'firebase';

export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}
export interface UserModel {
  user: Partial<User>;
  login: Thunk<UserModel, any>;
  setUser:Action<UserModel,any>
}


const user: UserModel = {
  user: undefined,

  setUser:action((state,user: Partial<User>)=>{
      state.user = user;
      console.log(user)
    }),
    
    login :thunk( async (actions,payload) => {    
      const provider = new firebase.auth.GoogleAuthProvider();
      let {user} = await firebase.auth().signInWithPopup(provider)
      actions.setUser({...user})
      
  })


};

export default user;