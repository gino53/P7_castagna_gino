import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first, switchMap} from 'rxjs';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public loginForm!: FormGroup;
  public errorMsg!: string;

  public constructor(private formBuilder: FormBuilder,
    private auth: AuthService,
    private router: Router) {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required]
    });
  }

  public onLogin() {
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