import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import firebase from 'firebase';
import {firebaseConfig} from './firebase/config'

firebase.initializeApp(firebaseConfig);


const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
