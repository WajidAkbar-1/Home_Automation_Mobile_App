import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"



const firebaseConfig = {
    apiKey: "AIzaSyC3v9Lt6Mt8mubfsYjnuYSzd87A9hNg1gA",
    authDomain: "esp32-atta.firebaseapp.com",
    databaseURL: "https://esp32-atta-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "esp32-atta",
    storageBucket: "esp32-atta.appspot.com",
    messagingSenderId: "1073324019548",
    appId: "1:1073324019548:web:ec3445762c419ee4963b99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

export default db;

