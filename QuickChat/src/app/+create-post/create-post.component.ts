import { PostService } from './../services/post.service';
import { AuthService } from 'app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Post } from "app/models/post";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss', './../shared/common.scss']
})
export class CreatePostComponent implements OnInit {
  postBodyText: string;
  constructor(public authService: AuthService, private postService: PostService) { }

  ngOnInit() {
  }

  onSubmit(): void {
    try {
      const post = new Post({
        body: this.postBodyText,
        authorKey: this.authService._currentUsersUid,
      });
      console.log("TODO", post);
      this.postService.add(post);
      this.postBodyText = "";
    } catch (e) {
      console.error("Submit failed", e);
    }
  }

}
