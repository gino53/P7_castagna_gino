import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken = '';
  private userId = '';

  public constructor(private http: HttpClient,
    private router: Router) { }

  public createUser(email: string, password: string) {
    return this.http.post<{ message: string }>('http://localhost:3000/api/auth/signup', { email: email, password: password });
  }

  public getToken() {
    return this.authToken;
  }

  public getUserId() {
    return this.userId;
  }

  public loginUser(email: string, password: string) {
    return this.http.post<{ userId: string, token: string }>('http://localhost:3000/api/auth/login', { email: email, password: password }).pipe(
      tap(({ userId, token }) => {
        this.userId = userId;
        this.authToken = token;
        this.isAuth$.next(true);
      })
    );
  }

  public logout() {
    this.authToken = '';
    this.userId = '';
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}