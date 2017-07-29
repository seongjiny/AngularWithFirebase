import { Injectable } from '@angular/core';
import { Photo } from "./../models/photo";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { AuthService } from "./../services/auth.service";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Query } from "angularfire2/interfaces";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/switchMap';

import * as firebase from 'firebase/app';
import { MdSnackBar } from "@angular/material";


@Injectable()
export class PhotoService {
  photoStream: FirebaseListObservable<Photo[]>;
  myPhotoStream: FirebaseListObservable<Photo[]>;
  readonly photosPath = '/photos/';

  constructor(private db: AngularFireDatabase, private authService: AuthService,
    private snackBar: MdSnackBar) { 

    this.photoStream = this.db.list(this.photosPath);
    this.myPhotoStream = this.db.list(this.photosPath, 
      {query: {
        orderByChild: 'uid',
        equalTo: this.authService._currentUsersUid,
      }});
    
  }

  add(photo: Photo):void {
    photo.uid = this.authService._currentUsersUid;
    firebase.database().ref().child(this.photosPath).push(photo);
    this.snackBar.open("Image Added", "", {
      duration: 3000,
    });
  }

  update(key: string, photo: Photo):void {
    const ref = firebase.database().ref(this.photosPath);
    ref.child(key).set(photo);
    this.snackBar.open("Image Updated", "", {
      duration: 3000,
    });
  }

  remove(photo: Photo): void {
    firebase.database().ref().child(this.photosPath).child(photo.$key).remove();
    this.snackBar.open("Image Deleted", "", {
      duration: 3000,
    });
  }

}
