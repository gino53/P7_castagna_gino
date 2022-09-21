import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    public constructor(private http: HttpClient) { }

    public getAllPost(): Observable<Post[]> {
        return this.http.get<Post[]>('/api/posts');
    }

    public getPostById(postId: number): Observable<Post> {
        return this.http.get<Post>(`http://localhost:3000/api/posts/${postId}`)
    }

    public createPost(formValue: { title: string, imageUrl: string, location?: string, description: string }): Observable<Post> {
        return this.http.post<Post>('http://localhost:3000/api/posts', formValue);
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