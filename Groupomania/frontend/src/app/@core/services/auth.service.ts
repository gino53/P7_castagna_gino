import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private token!: string;

    public login(): void {
        this.token = 'Token'
    }

    public signup() {
        this.token = 'Token'
    }

    public getToken(): string {
        return this.token;
    }

}