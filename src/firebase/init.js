import firebase from 'firebase'
import firestore from 'firebase/firestore'

var firebaseConfig = {
    apiKey: "AIzaSyBYv0VrWT9e8WRRN5R8shwuFEYdGgZjX7U",
    authDomain: "geo-ninja-x.firebaseapp.com",
    databaseURL: "https://geo-ninja-x.firebaseio.com",
    projectId: "geo-ninja-x",
    storageBucket: "",
    messagingSenderId: "743067281958",
    appId: "1:743067281958:web:2d800c81746c1913"
};
// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();