import { AngularFireAuth } from 'angularfire2/auth';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { Subscription } from "rxjs/Subscription";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  showSignOut = false;
  private authStateSubscription: Subscription;

  constructor(private afAuth: AngularFireAuth) {

  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.authStateSubscription = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        //sign in just happened
        this.showSignOut = true;
        console.log("Sign in just happened");
      } else {
        //sign out just happened
        this.showSignOut = false;
        console.log("Sign out just happened");
      }
    })
  }

  signOut(): void {
    this.afAuth.auth.signOut();
  }
}
