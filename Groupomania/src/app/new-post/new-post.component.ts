import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { Post } from '../models/post.model';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {

  postForm!: FormGroup;
  postPreview$!: Observable<Post>;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: [null],
      imageUrl: [null],
      location: [null],
      description: [null]
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
    console.log(this.postForm.value);
  }
}