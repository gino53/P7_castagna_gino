import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { SignUpComponent } from "./components/signup/signup.component";

const routes: Routes = [
    { path: 'auth/login', component: LoginComponent },
    { path: 'auth/signup', component: SignUpComponent }
]

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AuthRoutingModule { }