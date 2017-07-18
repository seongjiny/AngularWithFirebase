import { PostService } from './../services/post.service';
import { AuthService } from './../services/auth.service';
import { Post, PostWithAuthor } from 'app/models/post';
import { Component, OnInit, Input } from '@angular/core';
import { Author } from "app/models/author";
import { MdSnackBar } from "@angular/material";

enum EditMode {
  notEditable = 0,
  displayEditButtons = 1,
  editing = 2,
}

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss', './../shared/common.scss']
})

export class PostComponent implements OnInit {
  @Input() postWithAuthor: PostWithAuthor;

  editingMode = EditMode.notEditable;
  updatedPostBody: string;

  constructor(
    private authorService: AuthService,
    private postService: PostService,
    private snackBar: MdSnackBar) {

  }

  ngOnInit() {
    if (this.postWithAuthor.authorKey == this.authorService.currentUsersUid) {
      this.editingMode = EditMode.displayEditButtons;
    }
  }

  enableEditing(inputEl: HTMLInputElement) {
    this.editingMode = EditMode.editing;
    this.updatedPostBody = this.postWithAuthor.body;
    setTimeout(() => {
      inputEl.focus();
    }, 100);
  }

  remove() {
    this.postService.remove(this.postWithAuthor.$key);
    const snackBarRef = this.snackBar.open("Post Removed", "UNDO", {
      duration: 5000,

    });
    snackBarRef.onAction().subscribe(() => {
      const restoredPost = new Post();
      restoredPost.body = this.postWithAuthor.body;
      restoredPost.authorKey = this.authorService.currentUsersUid;
      this.postService.update(this.postWithAuthor.$key, restoredPost);
      this.snackBar.open("Post Restored", "", {
        duration: 3000,
      });
    });
  }

  save(): void {
    const updatedPost = new Post();
    updatedPost.body = this.updatedPostBody;
    updatedPost.authorKey = this.authorService.currentUsersUid;
    this.postService.update(this.postWithAuthor.$key, updatedPost);
    this.editingMode = EditMode.displayEditButtons;
  }

  cancel(): void {
    this.editingMode = EditMode.displayEditButtons;
  }

}

