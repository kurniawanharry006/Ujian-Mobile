import React, { Component } from 'react';
import firebase from '@firebase/app';
import '@firebase/auth';
import MainStack from './src/components/MainStack';
import { connect } from 'react-redux';
import { alreadyLogin, notLoginYet } from './src/actions';

class AppInit extends Component {
  componentDidMount() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyBzBkKPX0tk4LhMhXdnMP8nHJoBC3Vtc2o",
      authDomain: "instagrinjc10.firebaseapp.com",
      databaseURL: "https://instagrinjc10.firebaseio.com",
      projectId: "instagrinjc10",
      storageBucket: "instagrinjc10.appspot.com",
      messagingSenderId: "415675053349",
      appId: "1:415675053349:web:aac00e520997af624756cc",
      measurementId: "G-B9K8JZS470"
    };
    // Initialize Firebase
    //console.log('Isi Firebase Apps', firebase.apps)
    if(!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user) {
            this.props.alreadyLogin(user);
        } else {
            this.props.notLoginYet();
        }
    });
    // this.props.notLoginYet()
  }

  render() {
    return (
      <MainStack />
    )
  }
}

export default connect(null, { notLoginYet, alreadyLogin })(AppInit);