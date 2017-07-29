import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Photo } from "./../models/photo";
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";
import { PhotoService } from "./../services/photo.service";
import { AuthService } from "./../services/auth.service";
import * as firebase from 'firebase/app';
import { MdDialogConfig, MdDialog } from "@angular/material";
import { PhotoDialogComponent } from "./../photo-dialog/photo-dialog.component";
import { Observable } from "rxjs/Observable";

@Component({
  selector: 'app-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {
  photo: Photo = new Photo();
  photoStream: Observable<Photo>;
  photoKey: string;

  constructor(
    private router: Router,
    private dialog: MdDialog,
    private route: ActivatedRoute,
    private db: AngularFireDatabase,
    public photoService: PhotoService,
    public authService: AuthService
  ) {

  }

  ngOnInit() {
    this.route.params.subscribe((routeParams: Params) => {
      const photoKey = routeParams["photoKey"];
      this.photoKey = photoKey;
      this.photoStream = this.db.object('photos/' + photoKey);
      this.photoStream.subscribe((value: Photo) => {
        this.photo.uid = value.uid;
        this.photo.$key = value.$key;
        this.photo.caption = value.caption;
        this.photo.imageUrl = value.imageUrl;
      });
    });
    console.log(this.photo.uid);
    console.log(this.authService._currentUsersUid);
  }

  back(): void {
    this.router.navigate([""]);
  }

  edit(): void {
    console.log("editting:", this.photo);
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = {
      photo: this.photo
    };
    this.dialog.open(PhotoDialogComponent, dialogConfig);
  }
  remove(): void {
    console.log("removing");
    this.photoService.remove(this.photo);
    this.back();
  }


}