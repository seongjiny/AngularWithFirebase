import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Post } from 'app/models/post';
import { Injectable } from '@angular/core';

@Injectable()
export class PostService {
  readonly postsPath = "posts";
  private _postsStream: FirebaseListObservable<Post[]>;

  constructor(private db: AngularFireDatabase) {
    this._postsStream = this.db.list(this.postsPath);
  }

  add(post: Post) {
    console.log("TODO: Push the post", post);
    this._postsStream.push(post);
  }

}
