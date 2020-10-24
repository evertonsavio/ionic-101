import { HttpClient } from "@angular/common/http";
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { of } from "rxjs";
import { map, switchMap, tap } from "rxjs/operators";
import { PlaceLocation } from "src/app/places/location.model";
import { environment } from "src/environments/environment";
import { MapModalComponent } from "../../map-modal/map-modal.component";

@Component({
  selector: "app-location-picker",
  templateUrl: "./location-picker.component.html",
  styleUrls: ["./location-picker.component.scss"],
})
export class LocationPickerComponent implements OnInit {
  constructor(private modalCtrl: ModalController, private http: HttpClient) {}

  @Output() locationPick = new EventEmitter<PlaceLocation>();
  selectedLocationImage: string;
  isLoading: boolean = false;

  ngOnInit() {}

  onPickLocation() {
    this.modalCtrl
      .create({
        component: MapModalComponent,
      })
      .then((modalEl) => {
        modalEl.onDidDismiss().then((modalData) => {
          console.log(modalData.data);
          if (!modalData.data) {
            return;
          }
          /*           this.getAdress(modalData.data.lat, modalData.data.lng).subscribe(
            (address) => {
              console.log(address);
            }
          ); */
          const pickedLocation: PlaceLocation = {
            lat: modalData.data.lat,
            lng: modalData.data.lng,
            address: null,
            staticMapImageUrl: null,
          };
          this.isLoading = true;
          this.getAdress(modalData.data.lat, modalData.data.lng)
            .pipe(
              switchMap((address) => {
                pickedLocation.address = address;
                return of(
                  this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
                );
              })
            )
            .subscribe((staticMapImageUrl) => {
              pickedLocation.staticMapImageUrl = staticMapImageUrl;
              this.selectedLocationImage = staticMapImageUrl;
              this.isLoading = false;
              this.locationPick.emit(pickedLocation);
            });
        });
        modalEl.present();
      });
  }
  private getAdress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsApiKey}`
      )
      .pipe(
        tap((geoData) => {
          console.log(geoData);
        }),
        map((geoData: any) => {
          if (!geoData || !geoData.results || geoData.results.length == 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }
  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=480x360&maptype=roadmap
    &markers=color:red%7Clabel:S%7C${lat},${lng}
    &key=${environment.googleMapsApiKey}`;
  }
}
