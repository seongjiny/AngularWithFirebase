import { Photo } from './../models/photo';
import { PhotoService } from './../services/photo.service';
import { FirebaseListObservable } from 'angularfire2/database';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {
  @Input() myPage: boolean;
  photos:FirebaseListObservable<Photo[]>;
  constructor(public photoService:PhotoService) { }

  ngOnInit() {
    if (this.myPage) {
      this.photos = this.photoService.myPhotoStream;
    } else {
      this.photos = this.photoService.photoStream;
    }
  }
  get numColumns(): number {
    if (window.innerWidth > 1300) {
      return 4;
    } else if (window.innerWidth > 900) {
      return 3;
    } else if (window.innerWidth > 500) {
      return 2;
    } else {
      return 1;
    }
  }
}
