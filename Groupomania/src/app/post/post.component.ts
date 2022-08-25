import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  title!: string;
  description!: string;
  createdDate!: Date;
  like!: number;

  constructor() { }

  ngOnInit(): void {
    this.title = 'Post';
    this.description = 'Premier post';
    this.createdDate = new Date();
    this.like = 5;
  }

}
