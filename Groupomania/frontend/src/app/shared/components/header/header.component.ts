import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public constructor(private router: Router) { }

  public onAddNewPost(): void {
    this.router.navigateByUrl('posts/create');
  }

  public onProfil(): void {
    this.router.navigateByUrl('/profil');
  }

}