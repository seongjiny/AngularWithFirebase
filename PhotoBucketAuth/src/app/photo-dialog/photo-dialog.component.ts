import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Photo } from './../models/photo';
import { Component, OnInit, Inject } from '@angular/core';
import * as firebase from 'firebase/app';
import { PhotoService } from "../services/photo.service";

interface PhotoDialogData {
  photo?: Photo;
  key?: string;
}


@Component({
  selector: 'app-photo-dialog',
  templateUrl: './photo-dialog.component.html',
  styleUrls: ['./photo-dialog.component.scss']
})
export class PhotoDialogComponent implements OnInit {
  title = "Add a new photo.";
  formPhoto: Photo;
  constructor(
    private dialogRef: MdDialogRef<PhotoDialogComponent>,
    @Inject(MD_DIALOG_DATA) private dialogData: PhotoDialogData,
    public photoService: PhotoService
  ) {
    this.formPhoto = dialogData.photo;
  }

  ngOnInit() {

  }
  onSubmit() {
    // TODO: submit button 
    console.log("submit works");
    try {
      if (this.dialogData.photo) {
        this.photoService.update(this.dialogData.photo.$key, this.formPhoto);
      } else {
        this.photoService.add(this.formPhoto);
      }

      this.dialogRef.close();
    } catch (e) {
      console.log("Submit error", e);
    }
  }

  photoSelected(event: any): void {
    const file: File = event.target.files[0];
    const metaData = { 'contentType': file.type };
    const nextAvailableKey = this.photoService.photoStream.push({}).key;
    const storageRef: firebase.storage.Reference = firebase.storage().ref(`/photos/${nextAvailableKey}`);
    const uploadTask: firebase.storage.UploadTask = storageRef.put(file, metaData);

    uploadTask.then((uploadSnapshot: firebase.storage.UploadTaskSnapshot) => {
      console.log("upload done");
      const downloadUrl = uploadSnapshot.downloadURL;
      this.formPhoto.imageUrl = downloadUrl;
    });
  }

}
