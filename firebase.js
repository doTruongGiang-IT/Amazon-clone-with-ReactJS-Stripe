import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyDnI0QpDBXI0HMw-wrVTskOTfOeURe_TJ8",
    authDomain: "clone-60c42.firebaseapp.com",
    projectId: "clone-60c42",
    storageBucket: "clone-60c42.appspot.com",
    messagingSenderId: "514538552759",
    appId: "1:514538552759:web:845f9c97c612d191213c32"
};

const app = !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();
const data = app.firestore();
export default data;