import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/@core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public constructor(private router: Router,
    private auth: AuthService) { }

  public onAddNewPost(): void {
    this.router.navigateByUrl('posts/create');
  }

  public onLogout(): void {
    this.auth.logout();
  }

}