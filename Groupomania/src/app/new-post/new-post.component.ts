import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { PostsService } from '../services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm!: FormGroup;
  postPreview$!: Observable<Post>;
  urlRegex!: RegExp;

  constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router) { }

  ngOnInit(): void {
    this.urlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
      location: [null],
      description: [null, Validators.required]
    }, {
      updateOn: 'blur'
    });

    this.postPreview$ = this.postForm.valueChanges.pipe(
      map(formValue => ({
        ...formValue,
        id: 0,
        createdDate: new Date(),
        likes: 0
      }))
    );
  };

  onSubmitForm(): void {
    this.postService.addPost(this.postForm.value);
    this.router.navigateByUrl('/posts');
  }
}