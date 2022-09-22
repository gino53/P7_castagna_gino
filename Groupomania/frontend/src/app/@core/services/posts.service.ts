import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { catchError, map, Observable, of, Subject, switchMap, tap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    public posts$ = new Subject<Post[]>();

    public constructor(private http: HttpClient) { }

    getAllPost() {
        this.http.get<Post[]>('http://localhost:3000/api/posts').pipe(
            tap(posts => this.posts$.next(posts)),
            catchError(error => {
                console.error(error.error.message);
                return of([]);
            })
        ).subscribe();
    }

    public getPostById(postId: number): Observable<Post> {
        return this.http.get<Post>(`http://localhost:3000/api/posts/${postId}`)
    }

    public createPost(post: Post, image: File) {
        const formData = new FormData();
        formData.append('post', JSON.stringify(post));
        formData.append('image', image);
        return this.http.post<{ message: string }>('http://localhost:3000/api/posts', formData).pipe();
    }

    public likePost(postId: number, likeType: 'like' | 'unlike'): Observable<Post> {
        return this.getPostById(postId).pipe(
            map((post: Post) => ({
                ...post,
                likes: post.likes + (likeType === 'like' ? 1 : -1)
            })),
            switchMap((updatedPost: Post) => this.http.put<Post>(
                `http://localhost:3000/api/posts/${postId}`, updatedPost)
            )
        );
    }

    public dislikePost(postId: number, dislikeType: 'dislike' | 'undislike'): Observable<Post> {
        return this.getPostById(postId).pipe(
            map((post: Post) => ({
                ...post,
                dislikes: post.dislikes + (dislikeType === 'dislike' ? 1 : -1)
            })),
            switchMap((updatedPost: Post) => this.http.put<Post>(
                `http://localhost:3000/api/posts/${postId}`, updatedPost)
            )
        );
    }
}