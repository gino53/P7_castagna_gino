import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../@core/guards/auth.guard";
import { NewPostComponent } from "./components/new-post/new-post.component";
import { PostListComponent } from "./components/post-list/post-list.component";

const routes: Routes = [
    { path: 'create', component: NewPostComponent, canActivate: [AuthGuard] },
    { path: '', component: PostListComponent, canActivate: [AuthGuard] },
    { path: 'modify-post/:id', component: NewPostComponent, canActivate: [AuthGuard] },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
    providers: [AuthGuard]
})
export class PostsRoutingModule { }