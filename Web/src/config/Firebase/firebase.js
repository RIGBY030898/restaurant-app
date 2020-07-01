import firebase from 'firebase'

var firebaseConfig = {
    apiKey: 'AIzaSyAdLeu4lxI4RGDuAtvApduX64eS1zdX4oo',
    authDomain: 'restaurant-553a3.firebaseapp.com',
    databaseURL: 'https://restaurant-553a3.firebaseio.com',
    projectId: 'restaurant-553a3',
    storageBucket: 'restaurant-553a3.appspot.com',
    messagingSenderId: '668515019586',
    appId: '1:668515019586:web:e146b378b78ec772c876db'
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const firebaseDatabaseReference = app.database().ref()
const firebaseStorageReference = app.storage().ref()

export {
    firebaseDatabaseReference, 
    firebaseStorageReference
}