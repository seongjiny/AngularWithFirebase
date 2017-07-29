import { Component, OnInit, Input } from '@angular/core';
import { Photo } from "./../models/photo";
import { AuthService } from "./../services/auth.service";
import { PhotoService } from "./../services/photo.service";
import { MdDialogConfig, MdDialog } from "@angular/material";
import { PhotoDialogComponent } from "./../photo-dialog/photo-dialog.component";

@Component({
  selector: 'app-photo-card',
  templateUrl: './photo-card.component.html',
  styleUrls: ['./photo-card.component.scss']
})
export class PhotoCardComponent implements OnInit {
  @Input() photo: Photo;
  @Input() myPage: boolean;

  constructor(
    public authService: AuthService,
    public photoService: PhotoService,
    private dialog: MdDialog
  ) { }

  ngOnInit() {
  }

  edit(): void {
    console.log("photo", this.photo);
    const dialogConfig = new MdDialogConfig();
    dialogConfig.data = { photo: this.photo };
    this.dialog.open(PhotoDialogComponent, dialogConfig);
  }

  remove(): void {
    this.photoService.remove(this.photo);
  }

}