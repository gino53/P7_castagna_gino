import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Post } from '../../../@core/models/post.model';
import { PostsService } from '../../../@core/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {

  public post$!: Observable<Post>;
  public liked!: number;
  public disliked!: number;
  public userId!: string;
  public errorMessage!: string;

  public constructor(private postsService: PostsService,
    private route: ActivatedRoute) {
    const postId = +this.route.snapshot.params['id'];
    this.post$ = this.postsService.getPostById(postId);
  }

  public onLike(postId: number) {
    if (this.liked) {
      this.post$ = this.postsService.likePost(postId, 'like');
    } else {
      this.post$ = this.postsService.likePost(postId, 'unlike');
    }
  }

  public onDislike(postId: number) {
    if (this.disliked) {
      this.post$ = this.postsService.dislikePost(postId, 'dislike');
    } else {
      this.post$ = this.postsService.dislikePost(postId, 'undislike');
    }
  }
  
}