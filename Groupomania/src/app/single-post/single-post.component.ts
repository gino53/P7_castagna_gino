import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  @Input() post!: Post;

  buttonText!: string;

  constructor(private postsService: PostsService) {}

  ngOnInit(): void {
    this.buttonText = 'Like';
  }

  onAddLike() {
    if (this.buttonText === 'Like') {
      this.postsService.likePostById(this.post.id, 'like');
      this.buttonText = 'Like !';
    } else {
      this.postsService.likePostById(this.post.id, 'dislike');
      this.buttonText = 'Like';
    }
  }
}