import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouteReuseStrategy } from "@angular/router";
<<<<<<< HEAD
=======
import { HttpClientModule } from "@angular/common/http";
>>>>>>> a8c75197e688eaeda85b6b86650253f45d1af2f9

import { IonicModule, IonicRouteStrategy } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
<<<<<<< HEAD
import { HttpClientModule } from "@angular/common/http";
=======
>>>>>>> a8c75197e688eaeda85b6b86650253f45d1af2f9

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
<<<<<<< HEAD
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
=======
    HttpClientModule,
    IonicModule.forRoot(),
    AppRoutingModule,
>>>>>>> a8c75197e688eaeda85b6b86650253f45d1af2f9
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
