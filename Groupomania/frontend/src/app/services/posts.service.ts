import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    posts: Post[] = [
        {
            id: 1,
            createdDate: new Date(),
            title: 'Manège',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
            location: 'Paris',
            description: 'Grande-roue',
            likes: 0
        },

        {
            id: 2,
            createdDate: new Date(),
            title: 'Papillon',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/15/12/47/moth-7387787_960_720.jpg',
            location: 'Bordeaux',
            description: 'Insecte',
            likes: 0
        },

        {
            id: 3,
            createdDate: new Date(),
            title: 'Chien',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/07/17/12/12/pembroke-welsh-corgi-7327285_960_720.jpg',
            location: 'Lyon',
            description: 'Animal de compagnie',
            likes: 0
        },

        {
            id: 4,
            createdDate: new Date(),
            title: 'Manège',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
            location: 'Paris',
            description: 'Grande-roue',
            likes: 0
        },

        {
            id: 5,
            createdDate: new Date(),
            title: 'Papillon',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/15/12/47/moth-7387787_960_720.jpg',
            location: 'Bordeaux',
            description: 'Insecte',
            likes: 0
        },

        {
            id: 6,
            createdDate: new Date(),
            title: 'Chien',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/07/17/12/12/pembroke-welsh-corgi-7327285_960_720.jpg',
            location: 'Lyon',
            description: 'Animal de compagnie',
            likes: 0
        }
    ];

    getAllPosts(): Post[] {
        return this.posts;
    }

    getPostById(postId: number): Post {
        const post = this.posts.find(post => post.id === postId);
        if (!post) {
            throw new Error('Post not found');
        } else {
            return post;
        }
    }

    likePostById(postId: number, likeType: 'like' | 'dislike'): void {
        const post = this.getPostById(postId);
        likeType === 'like' ? post.likes++ : post.likes--;
    }

    addPost(formValue: { title:string, imageUrl: string, location?: string, description: string }): void {
        const post : Post = {
            ...formValue,
            createdDate: new Date(),
            likes: 0,
            id: this.posts[this.posts.length - 1].id + 1
        };
        this.posts.push(post);
    }
}