import { Password } from './../modules/password.module';
import { FirebaseListObservable, AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase/app';
import { MdDialog, MdDialogConfig } from "@angular/material";
import { PasswordDialogComponent } from "app/password-dialog/password-dialog.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {

  private authStateSubscription: Subscription;
  private firebasePath: string;
  passwordStream: FirebaseListObservable<Password[]>;

  constructor(private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private router: Router,
    private dialog: MdDialog) {

  }

  ngOnInit(): void {
    this.authStateSubscription = this.afAuth.authState.subscribe((user: firebase.User) => {
      if (user) {
        //sign in just happened
        console.log("User is signed in as: ", user.uid);
        this.firebasePath = `/users/${user.uid}`;
        this.passwordStream = this.db.list(this.firebasePath);
      } else {
        //sign out just happened
        console.log("User is not signed in");
        this.router.navigate(["/signin"]);
      }
    })
  }

  ngOnDestroy(): void {
    this.authStateSubscription.unsubscribe();
  }

  showPasswordDialog(): void {
    console.log("show dialog");
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {firebasePath: this.firebasePath};

    this.dialog.open(PasswordDialogComponent, dialogConfig);
  }
}
