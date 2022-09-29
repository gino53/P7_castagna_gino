import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { catchError, map, Observable, Subject, switchMap, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    public posts$ = new Subject<Post[]>();

    public constructor(private http: HttpClient) { }

    public getAllPosts() {
        this.http.get<Post[]>('http://localhost:3000/api/posts').pipe().subscribe({
            next: (posts) => this.posts$.next(posts),
            error: (error: any) => console.error(error.error.message)
        });
    }

    public getPostById(postId: string): Observable<Post> {
        return this.http.get<Post>(`http://localhost:3000/api/posts/${postId}`)
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

    public likePost(postId: string, likeType: 'like' | 'unlike'): Observable<Post> {
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

    public dislikePost(postId: string, dislikeType: 'dislike' | 'undislike'): Observable<Post> {
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