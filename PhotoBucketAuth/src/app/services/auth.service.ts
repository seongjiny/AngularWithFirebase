import { environment } from './../../environments/environment.prod';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { Router } from "@angular/router";
import 'rosefire';

@Injectable()
export class AuthService {
  public isSignedInStream: Observable<boolean>;
  public displayNameStream: Observable<string>;
  public _currentUsersUid: string;
  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
  ) {

    this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        console.log("User is signed as ", user);
        this._currentUsersUid = user.uid;
      } else {
        console.log("User is not signed in");
        this._currentUsersUid = "";
      }
    });
    this.displayNameStream = this.afAuth.authState.map<firebase.User, string>(
      (user: firebase.User) => {
        if (user) {
          return user.displayName;
        } else {
          return '';
        }
      });


    this.isSignedInStream = this.afAuth.authState.map<firebase.User, boolean>(
      (user: firebase.User) => {
        return user != null;
      });
    console.log(this.isSignedInStream);
  }
  signInWithGoogle(): void {
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((result: any) => {
        this.router.navigate(['/']);
        const user: firebase.User = result.user;
        console.log(this.isSignedInStream);
      });
  }

  signInWithRosefire(): void {
    Rosefire.signIn(environment.registryToken, (error, rfUser: RosefireUser) => {
      if (error) {
        // User not logged in!
        console.error(error);
        return;
      }
      // console.log("Rosefire is done. User: ", rfUser);
      this.afAuth.auth.signInWithCustomToken(rfUser.token).then((authState) => {
        // console.log("Firebase signin is done now. User: ", authState);
        this.router.navigate(["/"]);
      });
    });
  }
  signOut(): void {
    this.afAuth.auth.signOut();
    this.router.navigate(['/signin']);
  }
}