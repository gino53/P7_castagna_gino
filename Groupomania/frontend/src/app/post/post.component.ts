import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() post!: Post;


  constructor(private router: Router) { }

  ngOnInit(): void { }

  onViewPost() {
    this.router.navigateByUrl(`posts/${this.post.id}`);
  }
}
