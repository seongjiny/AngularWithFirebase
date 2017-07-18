import { PostService } from 'app/services/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-myposts',
  templateUrl: './myposts.component.html',
  styleUrls: ['./myposts.component.scss']
})
export class MypostsComponent implements OnInit {
  constructor(private postService: PostService) { }

  ngOnInit() {
    this.postService.showOnlyMyPosts(true);
  }


}
