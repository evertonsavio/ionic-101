import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ModalController, NavController } from "@ionic/angular";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { Place } from "../../offers/place.model";
import { PlacesService } from "../../places.service";

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"],
})
export class PlaceDetailPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController
  ) {}

  loadedPlace: Place;

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      if (!param.has("placeId")) {
        this.navCtrl.navigateBack("/places/discover");
        return;
      }
      this.loadedPlace = this.placesService.getPlace(param.get("placeId"));
    });
  }
  onBookPlace() {
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.loadedPlace },
      })
      .then((modalE) => {
        modalE.present();
        return modalE.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === "confirm") {
          console.log("Boooooked!!!");
        }
      });
  }
}
