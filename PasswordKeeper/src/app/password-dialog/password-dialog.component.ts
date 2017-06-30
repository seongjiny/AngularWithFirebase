import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';
import { Password } from "app/modules/password.module";

import * as firebase from 'firebase/app';

interface PasswordDialogData {
  firebasePath: string;
}

@Component({
  selector: 'app-password-dialog',
  templateUrl: './password-dialog.component.html',
  styleUrls: ['./password-dialog.component.scss']
})
export class PasswordDialogComponent implements OnInit {

  formPassword: Password;
  constructor(private dialogRef: MdDialogRef<PasswordDialogComponent>,
  @Inject(MD_DIALOG_DATA) public dialogData: PasswordDialogData) { 
    this.formPassword = new Password();
    console.log("Recieved the data: ",dialogData);
  }

  ngOnInit() {
  }

  onSubmit() {
    try {
      console.log("TODO Submit: ",this.formPassword);
      firebase.database().ref(this.dialogData.firebasePath).push(this.formPassword);
      this.dialogRef.close();
    } catch (e) {
      console.error("Submit error", e);
    }
  }

}
