import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgForm } from "@angular/forms";
import { AlertController, LoadingController } from "@ionic/angular";

import { AuthService } from "./auth.service";
import { Observable } from "rxjs";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"],
})
export class AuthPage implements OnInit {
  isLoading = false;
  isLogin = true;

  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  authenticate(email: string, password: string) {
    this.isLoading = true;
    this.authService.login();
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in..." })
      .then((loadingEl) => {
        loadingEl.present();
        if (this.isLogin) {
          // Send a request to login servers
          this.authService.signIn(email, password).subscribe(
            (resData) => {
              this.isLoading = false;
              loadingEl.dismiss();
              console.log(resData);
            },
            (errResponse) => {
              loadingEl.dismiss();
              console.log(errResponse);
              this.showAlert("Invalido, por favor tente de novo!");
            }
          );
        } else {
          this.authService.signUp(email, password).subscribe(
            (resData) => {
              this.isLoading = false;
              loadingEl.dismiss();
              //console.log(resData);
              //this.isLogin = true;
            },
            (errResponse) => {
              loadingEl.dismiss();
              console.log(errResponse);
              this.showAlert("Invalido, por favor tente de novo!");
            }
          );
        }
        //this.router.navigateByUrl("/places/discover");
      });
  }

  onSwitchAuthMode() {
    this.isLogin = !this.isLogin;
  }

  onSubmit(form: NgForm) {
    console.log(form);
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    console.log(email, password);

    this.authenticate(email, password);

    /*     if (this.isLogin) {
      // Send a request to login servers
      this.authService.signIn(email, password).subscribe((resData) => {
        console.log(resData);
      });
    } else {
      this.authService.signUp(email, password).subscribe((resData) => {
        console.log(resData);
        //this.isLogin = true;
      });
    } */
  }
  private showAlert(message: string) {
    this.alertCtrl
      .create({
        header: "A requisição falhou!",
        message: message,
        buttons: ["ok"],
      })
      .then((alertEl) => {
        alertEl.present();
      });
  }
}
