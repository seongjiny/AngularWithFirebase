import { PasswordDialogComponent } from 'app/password-dialog/password-dialog.component';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Password } from 'app/modules/password.module';
import { Component, OnInit, Input } from '@angular/core';
import * as firebase from 'firebase/app';
import { MdSnackBar, MdDialog, MdDialogConfig } from "@angular/material";
@Component({
  selector: 'app-password-display-card',
  templateUrl: './password-display-card.component.html',
  styleUrls: ['../shared/common.scss', './password-display-card.component.scss'],
  animations: [
    trigger('showPassword', [
      state('collapsed', style({
        height: 0,
      })),
      state('expanded', style({})),
      // transition('collapsed <=> expanded', animate('.3s'))
      transition('* => *', animate('.3s'))
    ]),
  ],
})
export class PasswordDisplayCardComponent implements OnInit {
  @Input() password: Password;
  @Input() firebasePath: string;
  isExpanded = false;

  get showPasswordState(): string {
    return this.isExpanded ? 'expanded' : 'collapsed';
  }

  constructor(private snackBar: MdSnackBar,
  private dialog:MdDialog) { }

  ngOnInit() {
  }

  edit(): void {
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = { 
      firebasePath: this.firebasePath,
      password: this.password,
    };
    this.dialog.open(PasswordDialogComponent, dialogConfig);
  }

  remove(): void {
    firebase.database().ref(this.firebasePath).child(this.password.$key).remove();
    this.snackBar.open("Password removed", "Dismiss", {
      duration: 3000,
    });
  }
}
