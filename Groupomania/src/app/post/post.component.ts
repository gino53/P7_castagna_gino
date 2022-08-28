import { Component, OnInit, Input } from '@angular/core';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;

  buttonText!: string;

  constructor() { }

  ngOnInit(): void {
    this.buttonText = 'Like';
  }
  onLike() {
    if (this.buttonText === 'Like') {
      this.post.like++;
      this.buttonText = 'Like+';
    } else {
      this.post.like--;
      this.buttonText = 'Like';
    }
  }
}
