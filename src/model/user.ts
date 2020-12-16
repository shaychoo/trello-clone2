import { Action, action, Thunk, thunk } from "easy-peasy";
import firebase from 'firebase';
import { StoreModel } from ".";


export interface User {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}
export interface UserModel {
  user:  Partial<User>;
  login: Thunk<UserModel, any>;
// Actions
  setUser:Action<UserModel,any>;
// Thunks
  saveBoard: Thunk<UserModel, any, undefined, StoreModel>;
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
  }),

  saveBoard: thunk(  (action,payload,{getStoreState})=>{
    
    let {user} = getStoreState().user
    let { board,columns } = getStoreState().board;
    let dataSaveKey = user.uid + '_' + board.title; 
    let dataToSave = {...board, uid:user.uid,columns};
    
    var db = firebase.firestore();
    db.collection('boards')
        .doc(dataSaveKey)
        .set(dataToSave)
        .then(
      console.log
    ).catch(console.error)
  })
};

export default user;