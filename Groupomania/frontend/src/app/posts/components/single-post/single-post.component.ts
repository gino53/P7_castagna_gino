import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../../@core/models/post.model';
import { PostsService } from '../../../@core/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  
  post$!: Observable<Post>;
  liked!: number;
  disliked!: number;
  userId!: string;
  errorMessage!: string;

  constructor(private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    const postId = +this.route.snapshot.params['id'];
    this.post$ = this.postsService.getPostById(postId);
  }

  onLike(postId: number) {
    if (this.liked) {
      this.post$ = this.postsService.likePost(postId, 'like');
    } else {
      this.post$ = this.postsService.likePost(postId, 'unlike');
    }
  }

  onDislike(postId: number) {
    if (this.disliked) {
      this.post$ = this.postsService.dislikePost(postId, 'dislike');
    } else {
      this.post$ = this.postsService.dislikePost(postId, 'undislike');
    }
  }
}