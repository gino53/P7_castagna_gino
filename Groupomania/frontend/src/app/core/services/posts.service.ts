import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostsService {

    constructor(private http: HttpClient) { }

    getAllPosts(): Observable<Post[]> {
        return this.http.get<Post[]>('http://localhost:3000/posts');
    }

    getPostById(postId: number): Observable<Post> {
        return this.http.get<Post>(`http://localhost:3000/posts/${postId}`)
    }

    likePost(postId: number, likeType: 'like' | 'unlike'): Observable<Post> {
        return this.getPostById(postId).pipe(
            map(post => ({
                ...post,
                likes: post.likes + (likeType === 'like' ? 1 : -1)
            })),
            switchMap(updatedPost => this.http.put<Post>(
                `http://localhost:3000/posts/${postId}`, updatedPost)
            )
        );
    }

    dislikePost(postId: number, dislikeType: 'dislike' | 'undislike'): Observable<Post> {
        return this.getPostById(postId).pipe(
            map(post => ({
                ...post,
                dislikes: post.dislikes + (dislikeType === 'dislike' ? 1 : -1)
            })),
            switchMap(updatedPost => this.http.put<Post>(
                `http://localhost:3000/posts/${postId}`, updatedPost)
            )
        );
    }

    addPost(formValue: { title: string, imageUrl: string, location?: string, description: string }): Observable<Post> {
        return this.getAllPosts().pipe(
            map(posts => [...posts].sort((a: Post, b: Post) => a.id - b.id)),
            map(sortedPosts => sortedPosts[sortedPosts.length - 1]),
            map(previousPost => ({
                ...formValue,
                id: previousPost.id + 1,
                createdDate: new Date(),
                likes: 0
            })),
            switchMap(newPost => this.http.post<Post>('http://localhost:3000/posts', newPost))
        );
    }
}