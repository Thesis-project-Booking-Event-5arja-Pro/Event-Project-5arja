// import {getAuth} from' firebase/auth'
import firebase from "firebase/compat/app"
import "firebase/compat/auth"
import "firebase/compat/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyD1CjtA4hyz4Tnwuy9wwSWZ9EDMmBY8EHM",
    authDomain: "kharajni-4223a.firebaseapp.com",
    projectId: "kharajni-4223a",
    storageBucket: "kharajni-4223a.appspot.com",
    messagingSenderId: "405960096643",
    appId: "1:405960096643:web:7e638ccc48951fde2fd4b6",
    measurementId: "G-SV1X47NMTN"
  };



if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}
 
//  firebase.Firestore(app);
// const colref=collection(db,'kharja')
const db = firebase.firestore()

 const auth = firebase.auth()
export  { firebase,db,auth};