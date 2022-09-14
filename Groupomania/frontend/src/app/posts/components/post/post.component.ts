import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../@core/models/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {

  @Input() public post!: Post;

  public constructor(private router: Router) { }

  public onViewPost() {
    this.router.navigateByUrl(`posts/${this.post.id}`);
  }
  
}