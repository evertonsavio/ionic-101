import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, from } from "rxjs";
import { map, tap } from "rxjs/operators";
import { User } from "./user.model";
import { Plugins } from "@capacitor/core";

export interface SignUpData {
  email: string;
  userId: string;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private _user = new BehaviorSubject<User>(null);
  private _userId = null;

  constructor(private http: HttpClient) {}

  get userIsAuthenticated() {
    return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          return !!user.token;
        } else {
          return false;
        }
      })
    );
  }

  get userId() {
    return this._userId;
    /*     return this._user.asObservable().pipe(
      map((user) => {
        if (user) {
          (user) => user.id;
        } else {
          return null;
        }
      })
    ); */
  }

  autoLogin() {
    return from(Plugins.Storage.get({ key: "authData" })).pipe(
      map((storedData) => {
        if (!storedData || !storedData.value) {
          return null;
        }
        //const parsedData = JSON.parse(storedData.value) as { token: string };
        const user = new User(storedData.value);
        return user;
      }),
      tap((user) => {
        this._user.next(user);
      }),
      map((user) => {
        return !!user;
      })
    );
  }

  signUp(email: string, password: string) {
    /*     const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }; */
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
    /*     const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    }; */
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
        tap((resData) => {
          this._user.next(new User(resData.headers.get("authorization")));
          this.storeAuthData(resData.headers.get("authorization"));
        }),
        //map((res) => console.log(res))
        map((res) => res.headers.get("authorization"))
      );
  }

  private storeAuthData(token: string) {
    const data = JSON.stringify({ token: token });
    Plugins.Storage.set({ key: "authData", value: token });
  }

  login() {
    //this._userIsAuthenticated = true;
  }
  logout() {
    this._user.next(null);
  }
}
