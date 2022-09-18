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
  public image!: string;

  public constructor(private formBuilder: FormBuilder,
    private postService: PostsService,
    private router: Router) {
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
  }

  public onSubmitForm(): void {
    this.postService.createPost(this.postForm.value).pipe().subscribe(
      () => this.router.navigateByUrl('/posts'));
  }

  public onImageAdded(event: Event) {
    const image = (event.target as HTMLInputElement).files![0];
    this.postForm.get('image')!.setValue(this.image);
    this.postForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.image = reader.result as string;
    };
    reader.readAsDataURL(image);
  }

}