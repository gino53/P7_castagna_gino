import { Injectable } from '@angular/core';
import { Post } from '../models/post.model';

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    posts: Post[] = [
        {
            title: 'Manège',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
            createdDate: new Date(),
            description: 'Grande-roue',
            like: 0,
            location: 'Paris'
        },

        {
            title: 'Papillon',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/15/12/47/moth-7387787_960_720.jpg',
            createdDate: new Date(),
            description: 'Insecte',
            like: 0,
            location: 'Bordeaux'
        },

        {
            title: 'Chien',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/07/17/12/12/pembroke-welsh-corgi-7327285_960_720.jpg',
            createdDate: new Date(),
            description: 'Animal de compagnie',
            like: 0,
            location: 'Lyon'
        },

        {
            title: 'Manège',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
            createdDate: new Date(),
            description: 'Grande-roue',
            like: 0,
            location: 'Paris'
        },

        {
            title: 'Papillon',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/08/15/12/47/moth-7387787_960_720.jpg',
            createdDate: new Date(),
            description: 'Insecte',
            like: 0,
            location: 'Bordeaux'
        },

        {
            title: 'Chien',
            imageUrl: 'https://cdn.pixabay.com/photo/2022/07/17/12/12/pembroke-welsh-corgi-7327285_960_720.jpg',
            createdDate: new Date(),
            description: 'Animal de compagnie',
            like: 0,
            location: 'Lyon'
        }
    ];

    getAllPosts(): Post[] {
        return this.posts;
    }
}