import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts!: Post[];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.posts = this.postsService.posts;
  }
}
