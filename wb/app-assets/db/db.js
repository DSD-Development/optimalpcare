import { getLoginInfoIsCorrect } from "./accessInfo.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
const firebaseConfig = {apiKey: "AIzaSyDP7UkZc9WbydYPJSGo2M78kR7oIkl6Sog", authDomain: "optimalpcare.firebaseapp.com", databaseURL: "https://optimalpcare-default-rtdb.firebaseio.com", projectId: "optimalpcare", storageBucket: "optimalpcare.appspot.com", messagingSenderId: "578435864971", appId: "1:578435864971:web:77e9548e4e64a66209f78e", measurementId: "G-72G4N4BRS8"};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase();
let UserInformation;
var loginInfo;

function RegisterProfile(nome, email, password, imagineLink) {
    createUserWithEmailAndPassword(auth, email, password) 
    .then((userCredential) => {set(ref(database, 'users/' + userCredential.user.email.replace(/[^\w\s]|_/g, "")), {nome: nome, email: email, password: password, imagineLink: imagineLink, uid: userCredential.user.uid});})
}

function LoginProfile(email, password) {
    var emailName = email.replace(/[^\w\s]|_/g, "");
    const dataRef = ref(database, 'users/' + emailName);
    get(dataRef).then((snapshot) => {
        if (snapshot.exists()) {
            setUserInformation(snapshot.val());
            setLoginInformation(getLoginInfoIsCorrect(snapshot.val(), email, password));
        } 
    });
}

function setUserInformation(inf) {UserInformation = inf;}
function setLoginInformation(inf) {loginInfo = inf;}
function GetUserInformation() {return UserInformation;}
function GetLoginInformation() {return loginInfo;}

export { RegisterProfile, LoginProfile, GetUserInformation, GetLoginInformation };