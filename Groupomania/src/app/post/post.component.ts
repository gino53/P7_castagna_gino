import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  buttonText!: string;

  constructor(private postsService: PostsService,
    private router: Router) { }

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

  onViewPost() {
    this.router.navigateByUrl(`posts/${this.post.id}`);
  }
}
