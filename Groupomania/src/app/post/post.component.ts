import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  title!: string;
  imageUrl!: string;
  createdDate!: Date;
  description!: string;
  like!: number;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Post';
    this.imageUrl = 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg';
    this.createdDate = new Date();
    this.description = 'Premier post';
    this.like = 5;
  }

  onAddLike() {
    this.like++;
  }
}
