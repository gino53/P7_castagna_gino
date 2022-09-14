import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private auth: AuthService,
    private router: Router) { }

  onLogin(): void {
    this.auth.login(),
      this.router.navigateByUrl('/posts');
  }

}