import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { NewPostComponent } from "./posts/components/new-post/new-post.component";
import { PostListComponent } from "./posts/components/post-list/post-list.component";
import { SinglePostComponent } from "./posts/components/single-post/single-post.component";

const routes: Routes = [
    { path: 'posts/:id', component: SinglePostComponent},
    { path: 'posts', component: PostListComponent },
    { path: 'create', component: NewPostComponent },
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