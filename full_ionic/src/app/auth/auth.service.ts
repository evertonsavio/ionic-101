import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor() {}

  private _userIsAuthenticated = false;
  private _userId = "abc";

  get userIsAuth() {
    return this._userIsAuthenticated;
  }

  get userId() {
    return this._userId;
  }

  login() {
    this._userIsAuthenticated = true;
  }
  logout() {
    this._userIsAuthenticated = false;
  }
}
