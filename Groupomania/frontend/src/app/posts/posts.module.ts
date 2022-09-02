import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from './components/post/post.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { NewPostComponent } from './components/new-post/new-post.component';
import { SinglePostComponent } from './components/single-post/single-post.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PostComponent,
    PostListComponent,
    NewPostComponent,
    SinglePostComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    PostComponent,
    PostListComponent,
    NewPostComponent,
    SinglePostComponent
  ]
})
export class PostsModule { }
