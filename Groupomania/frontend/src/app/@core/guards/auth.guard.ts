import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, take, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    public constructor(private auth: AuthService,
        private router: Router) { }

    public canActivate(route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> {
        return this.auth.isAuth$.pipe(
            take(1),
            tap(auth => {
                if (!auth) {
                    this.router.navigate(['/login']);
                }
            })
        );
    }
}