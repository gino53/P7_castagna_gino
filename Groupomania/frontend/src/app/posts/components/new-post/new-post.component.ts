import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
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
  public urlRegex!: RegExp;
  public imagePreview!: string;

  public constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router) {
    this.postForm = this.formBuilder.group({
      title: [null, Validators.required],
      image: [null, [Validators.required]],
      location: [null],
      description: [null, Validators.required]
    }, {
      updateOn: 'blur'
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

  public onSubmitForm(): void {
    this.postService.createPost(this.postForm.value).pipe().subscribe(
      () => this.router.navigateByUrl('/posts'));
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