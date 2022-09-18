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
        return this.getAllPost().pipe(
            map(posts => [...posts].sort((a: Post, b: Post) => a.id - b.id)),
            map(sortedPosts => sortedPosts[sortedPosts.length - 1]),
            map(previousPost => ({
                ...formValue,
                id: previousPost.id + 1,
                createdDate: new Date(),
                likes: 0
            })),
            switchMap(newPost => this.http.post<Post>('http://localhost:3000/api/posts', newPost))
        );
    }

    public likePost(postId: number, likeType: 'like' | 'unlike'): Observable<Post> {
        return this.getPostById(postId).pipe(
            map(post => ({
                ...post,
                likes: post.likes + (likeType === 'like' ? 1 : -1)
            })),
            switchMap(updatedPost => this.http.put<Post>(
                `http://localhost:3000/api/posts/${postId}`, updatedPost)
            )
        );
    }

    public dislikePost(postId: number, dislikeType: 'dislike' | 'undislike'): Observable<Post> {
        return this.getPostById(postId).pipe(
            map(post => ({
                ...post,
                dislikes: post.dislikes + (dislikeType === 'dislike' ? 1 : -1)
            })),
            switchMap(updatedPost => this.http.put<Post>(
                `http://localhost:3000/api/posts/${postId}`, updatedPost)
            )
        );
    }
}