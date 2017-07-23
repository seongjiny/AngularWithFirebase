import { AuthService } from 'app/services/auth.service';
import { Injectable } from '@angular/core';
import { Post, PostWithAuthor } from "app/models/post";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/scan';
import { AuthorService } from "app/services/author.service";
import { Author } from "app/models/author";
import { Subject } from "rxjs/Subject";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

import * as firebase from 'firebase/app';
import { Query } from "angularfire2/interfaces";

@Injectable()
export class PostService {
  readonly postsPath = "posts";
  readonly postBatchSize = 20;

  postWithAuthorStream: Observable<PostWithAuthor[]>;
  private postIncrementStream: Subject<number>;
  public isMyPostsPageStream: Subject<boolean>;

  public hideLoadMoreBtn = false;

  constructor(private db: AngularFireDatabase,
    private authorService: AuthorService,
    private authService: AuthService
  ) {
    this.postIncrementStream = new BehaviorSubject<number>(this.postBatchSize);
    this.isMyPostsPageStream = new BehaviorSubject<boolean>(false);
    const numPostsStream: Observable<number> = this.postIncrementStream
      .scan<number>((previousTotal: number, currenValue: number) => {
        return previousTotal + currenValue;
      });
    const queryStream: Observable<Query> = Observable.combineLatest<Query>(
      numPostsStream,
      this.isMyPostsPageStream,
      (numPosts: number, isMyPostsPage: boolean) => {
        if (isMyPostsPage) {
          return {
            orderByChild: 'authorKey',
            equalTo: this.authService.currentUsersUid,
          };
        } else {
          return {
            limitToLast: numPosts,
          };
        }
      }
    );
    const postStream: Observable<Post[]> = queryStream
      .switchMap<Query, Post[]>((queryParameter: Query) => {
        return this.db.list(this.postsPath, {
          query: queryParameter
        });
      });

    this.postWithAuthorStream = Observable.combineLatest<PostWithAuthor[]>(
      postStream,
      this.authorService.authorMapStream,
      numPostsStream,
      (posts: Post[], authorMap: Map<string, Author>, numPostsRequested: number) => {
        const postsWithAuthor: PostWithAuthor[] = [];
        this.hideLoadMoreBtn = numPostsRequested > posts.length;
        for (let post of posts) {
          const postWithAuthor = new PostWithAuthor(post);
          postWithAuthor.author = authorMap[post.authorKey];
          postsWithAuthor.push(postWithAuthor);
        }
        return postsWithAuthor;
      });
  }

  add(post: Post) {
    firebase.database().ref().child(this.postsPath).push(post);
  }

  displayMorePosts() {
    this.postIncrementStream.next(this.postBatchSize);
  }

  remove(keyToRemove: string): void {
    firebase.database().ref().child(this.postsPath).child(keyToRemove).remove();
  }
  update(key: string, post: Post): void {
    firebase.database().ref(`/${this.postsPath}/${key}`).set(post);
  }

  showOnlyMyPosts(isMyPostsPage: boolean): void {
    this.isMyPostsPageStream.next(isMyPostsPage);
  }

}
