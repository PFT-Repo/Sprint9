import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import { getDatabase, ref, child, push, update, Database,set, get, onValue, remove } from "firebase/database";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

@Injectable({
  providedIn: 'root'
})
export class PlistService {
  auth: any;
  user: any;
  data:any;
  uid:any;
  database!: Database;

  constructor() {
    const firebaseConfig = {
      // Configurar tu proyecto de Firebase aquí
      apiKey: "AIzaSyBHUFHHSPjkz54k3BljD_0talj8MEj7fyQ",
      authDomain: "portafolioturpial.firebaseapp.com",
      databaseURL: "https://portafolioturpial-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "portafolioturpial",
      storageBucket: "portafolioturpial.appspot.com",
      messagingSenderId: "116113088600",
      appId: "1:116113088600:web:48cf8aa8f33ee5f59b2a2d",
      measurementId: "G-FCZZSM2Y02"
    };
    firebase.initializeApp(firebaseConfig);
    this.auth= getAuth();
    signInAnonymously(this.auth)
  .then(() => {
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.user= user;
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        this.uid = user.uid;
        // ...
        this.getPlayers();
      } else {
        // User is signed out
        remove(ref(this.database,`objects/${this.uid}`));
      }
    });
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ...
  });
    this.database = getDatabase()
    console.log(this.database);
  }
  getPlayers(){
    const db = getDatabase();
  const starCountRef = ref(db, 'objects/');
  onValue(starCountRef, (snapshot) => {
   this.data = snapshot.val();
   setTimeout(() => {
    this.getPlayers();
   }, 500);
 
}); 
  }
}
