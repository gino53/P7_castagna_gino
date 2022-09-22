import { Component } from '@angular/core';
import { Post } from '../../../@core/models/post.model';
import { PostsService } from '../../../@core/services/posts.service';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  public posts$!: Observable<Post[]>;
  public errorMsg!: string;

  public constructor(private post: PostsService,
    private router: Router) {
    this.posts$ = this.post.posts$.pipe(
      tap(() => {
        this.errorMsg = '';
      }),
      catchError(error => {
        this.errorMsg = JSON.stringify(error);
        return of([]);
      })
    );
    this.post.getAllPost();
  }

  public onViewPost() {
    this.router.navigateByUrl(`posts/${this.post}`);
  }

}