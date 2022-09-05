import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { FormComponent } from "./landing-page/components/form/form.component";

const routes: Routes = [
    { path: 'posts', loadChildren: () => import('./posts/posts.module').then(m => m.PostsModule) },
    { path: 'form', loadChildren: () => import('./landing-page/components/form.module').then(m => m.FormModule) },
    { path: '', component: FormComponent }
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