import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { Post } from '../../../@core/models/post.model';
import { PostsService } from '../../../@core/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {

  public post$!: Observable<Post>;
  public liked!: boolean;
  public disliked!: boolean;
  public errorMessage!: string;

  public constructor(private postsService: PostsService,
    private route: ActivatedRoute) {
    this.post$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.postsService.getPostById(id))
    );
  }

}