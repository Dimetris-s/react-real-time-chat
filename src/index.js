import React from 'react';
import ReactDOM from 'react-dom';

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseContext } from './context/firebaseContext';

import App from './App';

import './index.scss';
import { BrowserRouter } from 'react-router-dom';

firebase.initializeApp({
    apiKey: "AIzaSyBsoUGU5G0Pr-qtXrK1kTidNXKy91BB5pw",
    authDomain: "react-chat-28fb3.firebaseapp.com",
    projectId: "react-chat-28fb3",
    storageBucket: "react-chat-28fb3.appspot.com",
    messagingSenderId: "697237498645",
    appId: "1:697237498645:web:e79fe8aff38fe0710fd71c"
})

const auth = firebase.auth()
const firestore = firebase.firestore()


const application = 
  <firebaseContext.Provider value={{
    auth,
    firestore,
    firebase
  }}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </firebaseContext.Provider>

ReactDOM.render(
  application,
  document.getElementById('root')
);
