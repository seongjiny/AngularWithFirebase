import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

interface Photo {
  url: string;
  caption: string;
  $key?: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  photoPath = 'pics';
  photoStream: FirebaseListObservable<Photo[]>;
  constructor(db: AngularFireDatabase) {
    this.photoStream = db.list(this.photoPath);
  }
  formPhoto: Photo = {
    'url': '',
    'caption': ''
  }

  onSubmit(): void {
    try {
      if (this.formPhoto.$key) {
        this.edit(this.formPhoto);
      } else {
        this.photoStream.push(this.formPhoto);
      }
    } catch (e) {
      console.log("Form Error: ", e);
    }
    this.formPhoto = {
      'url': '',
      'caption': ''
    }
  }
  edit(photo: Photo): void {
    this.formPhoto = photo;
    this.photoStream.update(this.formPhoto.$key, photo);
  }
  remove(removeKey: string): void {
    this.photoStream.remove(removeKey);
  }
}
