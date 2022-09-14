import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingComponent {

  constructor(private auth: AuthService,
    private router: Router) { }

  public onLogin(): void {
    this.auth.login(),
      this.router.navigateByUrl('/posts');
  }
  
}