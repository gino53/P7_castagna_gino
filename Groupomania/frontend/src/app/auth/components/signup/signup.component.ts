import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public signupForm!: FormGroup;
  public errorMsg!: string;

  public constructor(private auth: AuthService,
    private router: Router) {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public onSignup(): void {
    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    this.auth.createUser(email, password).pipe(
      switchMap(() => this.auth.loginUser(email, password)),
      first()
    ).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: (error: any) => this.errorMsg = error.message
    });
  }

  public onLogin(): void {
    this.router.navigateByUrl('login');
  }

}