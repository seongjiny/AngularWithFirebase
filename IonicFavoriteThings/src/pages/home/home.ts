import { AngularFireDatabase } from 'angularfire2/database';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {

  favoriteColor: string;
  favoriteNumber: number;
  constructor(
    private db: AngularFireDatabase,
    public navCtrl: NavController
  ) {

  }
  ngOnInit(): void {
    firebase.database().ref("/color").on("value", (snapShot: firebase.database.DataSnapshot) => {
      this.favoriteColor = snapShot.val();
    });
    firebase.database().ref("/number").on("value", (snapShot: firebase.database.DataSnapshot) => {
      this.favoriteNumber = snapShot.val();
    });
  }

  ngOnDestroy(): void {
    firebase.database().ref("/color").off();
    firebase.database().ref("/number").off();
  }

  setColor(selectedColor): void {
    console.log("Set Color in firebase to " + selectedColor);
    firebase.database().ref("/color").set(selectedColor);
  }

  changeNumberBy(amount: number): void {
    this.setNumber(this.favoriteNumber + amount);
  }

  setNumber(value: number): void {
    firebase.database().ref("/number").set(value);
  }

}
