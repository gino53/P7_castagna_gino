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

    likePostById(postId: number, likeType: 'like' | 'dislike'): Observable<Post> {
        return this.getPostById(postId).pipe(
            map(post => ({
                ...post,
                likes: post.likes + (likeType === 'like' ? 1 : -1)
            })),
            switchMap(updatedPost => this.http.put<Post>(
                `http://localhost:3000/facesnaps/${postId}`,
                updatedPost)
            )
        );
    }

    //addPost(formValue: { title: string, imageUrl: string, location?: string, description: string }): void {
        //const post: Post = {
            //...formValue,
            //createdDate: new Date(),
            //likes: 0,
            //id: this.posts[this.posts.length - 1].id + 1
       // };
        //this.posts.push(post);
    //}
}