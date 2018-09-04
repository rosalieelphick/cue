import firebase from 'firebase';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBPk37uhui-JGkb_K9YIOajyEbeXySBoyE",
    authDomain: "cue-card-app.firebaseapp.com",
    databaseURL: "https://cue-card-app.firebaseio.com",
    projectId: "cue-card-app",
    storageBucket: "cue-card-app.appspot.com",
    messagingSenderId: "1063560079475"
};

firebase.initializeApp(config);

export default firebase;