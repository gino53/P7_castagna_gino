import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Subject, throwError } from 'rxjs';
import { Post } from '../models/post.model';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    public posts$ = new Subject<Post[]>();

    public constructor(private http: HttpClient,
        private auth: AuthService) { }

    public getAllPosts() {
        this.http.get<Post[]>('http://localhost:3000/api/posts').pipe().subscribe({
            next: (posts) => this.posts$.next(posts),
            error: (error: any) => console.error(error.error.message)
        });
    }

    public getPostById(id: string) {
        return this.http.get<Post>('http://localhost:3000/api/posts/' + id).pipe(
            catchError(error => throwError(() => error.error.message))
        );
    }

    public createPost(post: Post, image: File) {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        return this.http.post<{ message: string }>('http://localhost:3000/api/posts', formData).pipe();
    }

    public modifyPost(id: string, post: Post, image: string | File) {
        if (typeof image === 'string') {
            return this.http.put<{ message: string }>('http://localhost:3000/api/posts/' + id, post).pipe(
                catchError(error => throwError(() => error.error.message))
            );
        } else {
            const formData = new FormData();
            formData.append('post', JSON.stringify(post));
            formData.append('image', image);
            return this.http.put<{ message: string }>('http://localhost:3000/api/posts/' + id, formData).pipe(
                catchError(error => throwError(() => error.error.message))
            );
        }
    }

    public deletePost(id: string) {
        return this.http.delete<{ message: string }>('http://localhost:3000/api/posts/' + id).pipe(
            catchError(error => throwError(() => error.error.message))
        );
    }

    public likePost(id: string, like: boolean) {
        return this.http.post<{ message: string }>(
          'http://localhost:3000/api/posts/' + id + '/like',
          { userId: this.auth.getUserId(), like: like ? 1 : 0 }
        ).pipe(
          map(() => like),
          catchError(error => throwError(() => error.error.message))
        );
      }

      public dislikePost(id: string, dislike: boolean) {
        return this.http.post<{ message: string }>(
          'http://localhost:3000/api/posts/' + id + '/like',
          { userId: this.auth.getUserId(), like: dislike ? -1 : 0 }
        ).pipe(
          map(() => dislike),
          catchError(error => throwError(() => error.error.message))
        );
      }
}