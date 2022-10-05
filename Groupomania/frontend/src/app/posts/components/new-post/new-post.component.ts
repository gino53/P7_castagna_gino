import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, first, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';
import { Post } from '../../../@core/models/post.model';
import { PostsService } from '../../../@core/services/posts.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent {

  public postForm!: FormGroup;
  public postPreview$!: Observable<Post>;
  public imagePreview!: string;
  public mode!: string;
  public post!: Post;
  public errorMsg!: string;

  public constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) {
    this.route.params.pipe(
      switchMap(params => {
        if (!params['id']) {
          this.mode = 'new';
          this.initEmptyForm();
          return EMPTY;
        } else {
          this.mode = 'edit';
          return this.postService.getPostById(params['id'])
        }
      }),
      first()
    ).subscribe({
      next: (post: any) => {
        if (post) {
          this.post = post;
          this.initModifyForm(post);
        }
      },
      error: (error: any) => this.errorMsg = JSON.stringify(error)
    });

    this.postPreview$ = this.postForm.valueChanges.pipe(
      map((formValue: Post) => ({
        ...formValue,
        id: 0,
        createdDate: new Date(),
        likes: 0
      }))
    );
  }

  public initEmptyForm() {
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null, Validators.required],
      image: [null, [Validators.required]],
      location: [null, [Validators.required]]
    }, {
      updateOn: 'blur'
    });
  }

  public initModifyForm(post: Post) {
    this.postForm = this.formBuilder.group({
      title: [post.title, Validators.required],
      description: [post.description, Validators.required],
      image: [post.imageUrl, Validators.required],
      location: [post.location, Validators.required],
    });
  }

  public onSubmitForm(): void {
    const newPost = new Post();
    newPost.title = this.postForm.get('title')!.value;
    newPost.description = this.postForm.get('description')!.value;
    newPost.location = this.postForm.get('location')!.value;
    newPost.userId = this.auth.getUserId();
    if (this.mode === 'new') {
      this.postService.createPost(newPost, this.postForm.get('image')!.value).pipe().subscribe({
        next: () => this.router.navigate(['/posts']),
        error: (error: any) => this.errorMsg = error.message
      });
    } else if (this.mode === 'edit') {
      this.postService.modifyPost(this.post._id, newPost, this.postForm.get('image')!.value).pipe().subscribe({
        next: () => this.router.navigate(['/posts']),
        error: (error: any) => this.errorMsg = error.message
      });
    }
  }

  public onImageAdded(event: Event) {
    const file = (event.target as HTMLInputElement).files![0];
    this.postForm.get('image')!.setValue(file);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

}