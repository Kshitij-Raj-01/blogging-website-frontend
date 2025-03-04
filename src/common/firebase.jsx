// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHc88kIx9h1FR2LNij41iZmgItJ6C6Y8w",
  authDomain: "blogging-website-ca8cc.firebaseapp.com",
  projectId: "blogging-website-ca8cc",
  storageBucket: "blogging-website-ca8cc.appspot.com",
  messagingSenderId: "443475282115",
  appId: "1:443475282115:web:d7a4c9540acaf018b8ba76"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// google auth

const provider = new GoogleAuthProvider();

const auth = getAuth();

export const authWithGoogle = async () => {

    let user = null;

    await signInWithPopup(auth, provider)
    .then((result) => {
        user = result.user
    })
    .catch((err) => {
        console.log(err)
    })

    return user
}