import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post!: Post;

  buttonText!: string;

  constructor(private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buttonText = 'Like';
    const postId = +this.route.snapshot.params['id'];
    this.post = this.postsService.getPostById(postId);
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