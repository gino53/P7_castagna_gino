import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './components/landing-page/landing-page.component.html',
  styleUrls: ['./components/landing-page/landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
}

  onContinue(): void {
    this.router.navigateByUrl('posts');
  }

}