import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Instagram Clone';

  ngOnInit() {
    var config = {
      apiKey: "AIzaSyAO-iszT4jOrKOSwgV5-Z73ef13lHlDzgI",
      authDomain: "angular-instagram-clone-8687f.firebaseapp.com",
      databaseURL: "https://angular-instagram-clone-8687f.firebaseio.com",
      projectId: "angular-instagram-clone-8687f",
      storageBucket: "angular-instagram-clone-8687f.appspot.com",
      messagingSenderId: "814412479025"
    };
    firebase.initializeApp(config);
  }

}
