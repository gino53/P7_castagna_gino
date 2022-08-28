import { Component, OnInit } from '@angular/core';
import { Post } from './models/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  myPost!: Post;

  ngOnInit() {
    this.myPost = new Post(
      'Manège',
      'Grande-roue',
      'https://cdn.pixabay.com/photo/2022/08/19/01/06/ferris-wheel-7395944_960_720.jpg',
      new Date(),
      0
    );
  }
}