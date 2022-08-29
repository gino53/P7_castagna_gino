import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts!: Post[];

  ngOnInit(): void {
    this.posts = [
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
  }

}
