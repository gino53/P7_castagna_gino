import { Component } from '@angular/core';
import { Post } from '../../../@core/models/post.model';
import { PostsService } from '../../../@core/services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent {

  public posts$!: Observable<Post[]>;

  public constructor(private postsService: PostsService) {
    this.posts$ = this.postsService.getAllPost();
  }
  
}