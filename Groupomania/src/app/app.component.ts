import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myPost!: Post;
  myPost2!: Post;
  myPost3!: Post;

  ngOnInit() {
    this.myPost = new Post(
      'Manège',
      'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
      new Date(),
      'Grande-roue',
      0
    );

    this.myPost2 = new Post(
      'Papillon',
      'https://cdn.pixabay.com/photo/2022/08/15/12/47/moth-7387787_960_720.jpg',
      new Date(),
      'Insecte',
      0
    );

    this.myPost3 = new Post(
      'Chien',
      'https://cdn.pixabay.com/photo/2022/07/17/12/12/pembroke-welsh-corgi-7327285_960_720.jpg',
      new Date(),
      'Animal de compagnie',
      0
    );
  }
}