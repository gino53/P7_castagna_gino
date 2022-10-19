import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, switchMap } from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public errorMsg!: string;

  public constructor(private auth: AuthService,
    private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required)
    });
  }

  public onLogin(): void {
    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;
    this.auth.loginUser(email, password).pipe(
      switchMap(() => this.auth.loginUser(email, password)),
      first()
    ).subscribe({
      next: () => this.router.navigate(['/posts']),
      error: (error: any) => this.errorMsg = error.message
    });
  }

  public onSignup(): void {
    this.router.navigateByUrl('signup');
  }

}