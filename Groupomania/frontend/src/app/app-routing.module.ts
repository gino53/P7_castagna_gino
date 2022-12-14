import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./@core/guards/auth.guard";
import { LandingComponent } from "./landing-page/components/landing-page.component";
import { NewPostComponent } from "./posts/components/new-post/new-post.component";
import { SinglePostComponent } from "./posts/components/single-post/single-post.component";

const routes: Routes = [
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
    { path: 'create', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'post/:id', component: SinglePostComponent, canActivate: [AuthGuard] },
    { path: 'modify-post/:id', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: 'form', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingModule) },
    { path: '', component: LandingComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
        AuthGuard
    ]
})
export class AppRoutingModule { }