import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    posts: Post[] = [
        {
            id: 1,
            title: 'Manège',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
            createdDate: new Date(),
            description: 'Grande-roue',
            likes: 0,
            location: 'Paris'
        },

        {
            id: 2,
            title: 'Papillon',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/15/12/47/moth-7387787_960_720.jpg',
            createdDate: new Date(),
            description: 'Insecte',
            likes: 0,
            location: 'Bordeaux'
        },

        {
            id: 3,
            title: 'Chien',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/07/17/12/12/pembroke-welsh-corgi-7327285_960_720.jpg',
            createdDate: new Date(),
            description: 'Animal de compagnie',
            likes: 0,
            location: 'Lyon'
        },

        {
            id: 4,
            title: 'Manège',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
            createdDate: new Date(),
            description: 'Grande-roue',
            likes: 0,
            location: 'Paris'
        },

        {
            id: 5,
            title: 'Papillon',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/15/12/47/moth-7387787_960_720.jpg',
            createdDate: new Date(),
            description: 'Insecte',
            likes: 0,
            location: 'Bordeaux'
        },

        {
            id: 6,
            title: 'Chien',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/07/17/12/12/pembroke-welsh-corgi-7327285_960_720.jpg',
            createdDate: new Date(),
            description: 'Animal de compagnie',
            likes: 0,
            location: 'Lyon'
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
        likeType === 'like' ? post.likes-- : post.likes++;
    }
}