import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, map, Observable, of, switchMap, take, tap } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Post } from '../../../@core/models/post.model';
import { PostsService } from '../../../@core/services/posts.service';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent {

  public post$!: Observable<Post>;
  public userId!: string;
  public likePending!: boolean;
  public liked!: boolean;
  public disliked!: boolean;
  public errorMessage!: string;

  public constructor(private postsService: PostsService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router) {
    this.userId = this.auth.getUserId();
    this.post$ = this.route.params.pipe(
      map(params => params['id']),
      switchMap(id => this.postsService.getPostById(id)),
      tap(post => {
        if (post.usersLiked.find(user => user === this.userId)) {
          this.liked = true;
        } else if (post.usersDisliked.find(user => user === this.userId)) {
          this.disliked = true;
        }
      })
    );
  }

  public onModify() {
    this.post$.pipe(take(1)).subscribe(
      post => this.router.navigate(['/modify-post', post._id]));
  }

  public onDelete() {
    this.post$.pipe(
      take(1),
      switchMap(post => this.postsService.deletePost(post._id))
    ).subscribe({
      next: () => { this.router.navigate(['/posts']) },
      error: (error: any) => {
        this.errorMessage = error.message;
        return EMPTY
      }
    });
  }

  public onLike() {
    if (this.disliked) {
      return;
    }
    this.likePending = true;
    this.post$.pipe(
      take(1),
      switchMap((post: Post) => this.postsService.likePost(post._id, !this.liked).pipe(
        tap(liked => {
          this.likePending = false;
          this.liked = liked;
        }),
        map(liked => ({ ...post, likes: liked ? post.likes + 1 : post.likes - 1 })),
        tap(post => this.post$ = of(post))
      )),
    ).subscribe();
  }

  public onDislike() {
    if (this.liked) {
      return;
    }
    this.likePending = true;
    this.post$.pipe(
      take(1),
      switchMap((post: Post) => this.postsService.dislikePost(post._id, !this.disliked).pipe(
        tap(disliked => {
          this.likePending = false;
          this.disliked = disliked;
        }),
        map(disliked => ({ ...post, dislikes: disliked ? post.dislikes + 1 : post.dislikes - 1 })),
        tap(post => this.post$ = of(post))
      )),
    ).subscribe();
  }

}