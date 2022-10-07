import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, tap } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public readonly tokenLocalStorageKey: string = 'token';
  public authToken: string | null = localStorage.getItem(this.tokenLocalStorageKey);
  public readonly isAuth$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(!!this.authToken);
  private userId: string = '';
  private isAdmin: string = '';

  public constructor(private http: HttpClient,
    private router: Router) {
    this.userId = this.authToken ? JSON.parse(Buffer.from(this.authToken.split('.')[1], 'base64').toString()) : '';
    console.log(this.userId);
  }

  public createUser(email: string, password: string) {
    return this.http.post<{ message: string }>('http://localhost:3000/api/auth/signup', { email: email, password: password });
  }

  public getToken() {
    return this.authToken;
  }

  public getUserId() {
    return this.userId;
  }

  public getAdmin() {
    return this.getUserId() === this.isAdmin === true;
  }

  public valueLocalStorage() {
    return [this.getUserId(), this.getToken()]
  }

  public loginUser(email: string, password: string) {
    return this.http.post<{ userId: string, token: string }>('http://localhost:3000/api/auth/login', { email: email, password: password }).pipe(
      tap(({ userId, token }) => {
        this.userId = userId;
        this.authToken = token;
        this.isAuth$.next(true);
        localStorage.setItem(this.tokenLocalStorageKey, token);
      })
    );
  }

  public logout() {
    this.authToken = '';
    this.userId = '';
    localStorage.removeItem(this.tokenLocalStorageKey);
    this.isAuth$.next(false);
    this.router.navigate(['login']);
  }

}