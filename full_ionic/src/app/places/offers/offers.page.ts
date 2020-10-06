import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";
import { PlacesService } from "../places.service";
import { Place } from "../place.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.page.html",
  styleUrls: ["./offers.page.scss"],
})
export class OffersPage implements OnInit, OnDestroy {
  offers: Place[];
  private placesSub: Subscription;
  isLoading = false;

  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.placesSub = this.placesService.places.subscribe((places) => {
      this.offers = places;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.fetchPlaces().subscribe(() => {
      // Funcao executa quando o observable is done
      this.isLoading = false;
    });
  }

  //MEMORY LEEEEEAAAAK
  ngOnDestroy() {
    if (this.placesSub) {
      this.placesSub.unsubscribe();
    }
  }

  onEdit(offerId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    console.log(offerId);
  }
}
