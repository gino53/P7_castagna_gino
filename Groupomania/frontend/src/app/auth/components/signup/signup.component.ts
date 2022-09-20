import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent {

  constructor(private auth: AuthService,
    private router: Router) { }

  onSignUp(): void {
    this.auth.signup(),
      this.router.navigateByUrl('/posts');
  }

  onLogin(): void {
    this.router.navigateByUrl('auth/login');
  }

}