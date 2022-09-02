import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post$!: Observable<Post>;
  buttonText!: string;

  constructor(private postsService: PostsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.buttonText = 'Like';
    const postId = +this.route.snapshot.params['id'];
    this.post$ = this.postsService.getPostById(postId);
  }

  onAddLike(postId: number) {
    if (this.buttonText === 'Like') {
      this.post$ = this.postsService.likePostById(postId, 'like').pipe(
        tap(() => this.buttonText = 'Like !')
      )
    } else {
      this.post$ = this.postsService.likePostById(postId, 'dislike').pipe(
        tap(() => this.buttonText = 'Like')
      );
    }
  }
}