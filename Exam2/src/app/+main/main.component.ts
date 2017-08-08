import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  phoneNumber: string = "+1";
  code: string;
  confirmResult: any;
  user: firebase.User;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router
  ) { }

  ngOnInit() {
    this.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container');
    this.recaptchaVerifier.render();
    this.afAuth.authState.subscribe((user) => {
      console.log("User: ",this.user);
      this.user = user;
    });
  }
  signInWithPhoneNumber() {
    this.afAuth.auth.signInWithPhoneNumber(this.phoneNumber, this.recaptchaVerifier)
      .then((key) => {
        this.confirmResult = key;
      }).catch(function (error) {
        console.error("Error in Phone:", error);
      })
  }
  signInWithCode() {
    this.confirmResult.confirm(this.code).then((result) => {
      this.user = result.user;
      console.log("us:",this.user);
    }).catch((error) => {
      console.log("Error in Code:", error);
    });
  }
  signOut() {
    this.afAuth.auth.signOut();
  }

}
