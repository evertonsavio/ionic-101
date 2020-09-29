import { Component, OnInit } from "@angular/core";
import { MenuController } from "@ionic/angular";
import { Place } from "../offers/place.model";
import { PlacesService } from "../places.service";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"],
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];

  public isOpened: boolean = false;

  constructor(
    private placesService: PlacesService,
    private menuCtrl: MenuController
  ) {}

  ngOnInit() {
    this.loadedPlaces = this.placesService.places;
    this.listedLoadedPlaces = this.loadedPlaces.slice(1);
  }
  onClick() {
    this.menuCtrl.toggle();
  }
  segmentChanged(event: CustomEvent) {
    this.isOpened = !this.isOpened;
    console.log(event.detail);
  }
}
