import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

interface SignUpData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(private http: HttpClient) {}

  private _userIsAuthenticated = false;
  private _userId = null;

  get userIsAuth() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  signUp(email: string, password: string) {
    return this.http.post<SignUpData>(
      `http://172.16.106.14:8101/users/signup`,
      {
        email: email,
        password: password,
      }
    );
  }

  login() {
    this._userIsAuthenticated = true;
  }
  logout() {
    this._userIsAuthenticated = false;
  }
}
