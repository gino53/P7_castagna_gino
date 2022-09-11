import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../@core/guards/auth.guard";
import { ProfilComponent } from "./components/login/profil.component";

const routes: Routes = [
    { path: '', component: ProfilComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class ProfilRoutingModule { }