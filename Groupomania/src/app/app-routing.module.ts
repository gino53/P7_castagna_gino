import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { PostListComponent } from "./post-list/post-list.component";
import { SinglePostComponent } from "./single-post/single-post.component";

const routes: Routes = [
    { path: 'posts/:id', component: SinglePostComponent},
    { path: 'posts', component: PostListComponent },
    { path: '', component: LandingPageComponent }
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {}