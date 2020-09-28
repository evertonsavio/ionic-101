import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { PlacesService } from "../../places.service";
import { Place } from "../place.model";

@Component({
  selector: "app-offer-bookings",
  templateUrl: "./offer-bookings.page.html",
  styleUrls: ["./offer-bookings.page.scss"],
})
export class OfferBookingsPage implements OnInit {
  loadedPlace: Place;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has("placeId")) {
        this.navCtrl.navigateBack("/places/offers");
        return;
      }
      //this.loadedPlace = this.placesService.places.find(
      //  (res) => res.id === paramMap.get("placeId")
      //); CODIGO IMPLEMENTADO NO SERVICE
      this.loadedPlace = this.placesService.getPlace(paramMap.get("placeId"));
      console.log(this.loadedPlace);
    });
  }
}
