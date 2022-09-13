import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingComponent } from "./landing-page/components/landing-page.component";

const routes: Routes = [
    { path: 'profil', loadChildren: () => import('./profil/profil.module').then(m => m.ProfilModule) },
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
    { path: 'form', loadChildren: () => import('./landing-page/landing-page.module').then(m => m.LandingModule) },
    { path: '', component: LandingComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }