import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, tap } from "rxjs/operators";

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
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http.post<SignUpData>(
      `http://172.16.106.14:8001/users/signup`,
      {
        email: email,
        password: password,
      }
      //httpOptions
    );
  }

  signIn(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };
    return this.http
      .post(
        `http://172.16.106.14:8001/users/signin`,
        {
          email: email,
          password: password,
        },
        //httpOptions
        {
          observe: "response",
          responseType: "text",
        }
      )
      .pipe(
        tap((res) => console.log(res)),
        //map((res) => console.log(res))
        map((res) => res.headers.get("authorization"))
      );
  }

  login() {
    this._userIsAuthenticated = true;
  }
  logout() {
    this._userIsAuthenticated = false;
  }
}
