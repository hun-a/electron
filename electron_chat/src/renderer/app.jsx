import React from 'react';
import { render } from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import Login from './Login';
import Signup from './Signup';
import Rooms from './Rooms';
import Room from './Room';
import firebase from 'firebase/firebase-browser';

// Define the Routing
const appRouting = (
  <Router history={hashHistory}>
    <Route path="/">
      <Route path="login" component={Login} />
      <Route path="signup" component={Signup} />
      <Route path="rooms" component={Rooms}>
        <Route path=":roomId" component={Room} />
      </Route>
    </Route>
  </Router>
);

// Init the Router
if (!location.hash.length) {
  location.hash = '#/login';
}

var config = {
  apiKey: "AIzaSyDZ9QEQ58h_IEMlJFSuexi3PAxEVYcU7so",
  authDomain: "electron-chat-fcc8d.firebaseapp.com",
  databaseURL: "https://electron-chat-fcc8d.firebaseio.com",
  projectId: "electron-chat-fcc8d",
  storageBucket: "electron-chat-fcc8d.appspot.com",
  messagingSenderId: "1097573266600"
};
firebase.initializeApp(config);

// Rendering the Application
render(appRouting, document.getElementById('app'));
