import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, EMPTY, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public signupForm!: FormGroup;
  public errorMsg!: string;

  public constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    this.signupForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  public onSignup() {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    this.auth.createUser(email, password).pipe(
      switchMap(() => this.auth.loginUser(email, password)),
      tap(() => {
        this.router.navigate(['/posts']);
      }),
      catchError(error => {
        this.errorMsg = error.message;
        return EMPTY;
      })
    ).subscribe();
  }

  public onLogin(): void {
    this.router.navigateByUrl('login');
  }

}