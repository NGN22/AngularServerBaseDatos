import * as firebase from 'firebase/app';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

}
// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyBoNzVOIUIRR3Fprt4RAy4yHGqnCGzRKmM",
  authDomain: "subida-a9e37.firebaseapp.com",
  databaseURL: "https://subida-a9e37.firebaseio.com",
  projectId: "subida-a9e37",
  storageBucket: "subida-a9e37.appspot.com",
  messagingSenderId: "960046578457",
  appId: "1:960046578457:web:5a6090b928ef09c886e388",
  measurementId: "G-DZDRJV3WMZ"
};
firebase.initializeApp(firebaseConfig);
