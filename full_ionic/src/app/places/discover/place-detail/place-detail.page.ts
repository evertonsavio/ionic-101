import { Component, OnDestroy, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  NavController,
  ToastController,
} from "@ionic/angular";
import { Subscription } from "rxjs";
import { AuthService } from "src/app/auth/auth.service";
import { BookingsService } from "src/app/bookings/bookings.service";
import { CreateBookingComponent } from "../../../bookings/create-booking/create-booking.component";
import { Place } from "../../place.model";
import { PlacesService } from "../../places.service";

@Component({
  selector: "app-place-detail",
  templateUrl: "./place-detail.page.html",
  styleUrls: ["./place-detail.page.scss"],
})
export class PlaceDetailPage implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private bookingService: BookingsService,
    private loadCtrl: LoadingController,
    private router: Router,
    private authService: AuthService
  ) {}

  loadedPlace: Place;
  private placeSub: Subscription;
  private isBookable: boolean = false;

  get isBook() {
    return this.isBookable;
  }

  presentToast() {
    this.toastCtrl
      .create({
        message: "Detalhes Page",
        duration: 3000,
        position: "top",
      })
      .then((toastEl) => {
        toastEl.present();
      });
  }

  ngOnInit() {
    this.placeSub = this.route.paramMap.subscribe((param) => {
      if (!param.has("placeId")) {
        this.navCtrl.navigateBack("/places/discover");
        return;
      }
      this.presentToast();
      this.placesService.getPlace(param.get("placeId")).subscribe((place) => {
        this.loadedPlace = place;
        this.isBookable = place.userId !== this.authService.userId;
      });
    });
  }

  ngOnDestroy(): void {
    if (this.placeSub) {
      this.placeSub.unsubscribe();
    }
  }

  openBookingModal(mode: "select" | "random") {
    console.log(mode);
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: { selectedPlace: this.loadedPlace, selectedMode: mode },
      })
      .then((modalE) => {
        modalE.present();
        return modalE.onDidDismiss();
      })
      .then((resultData) => {
        console.log(resultData.data, resultData.role);
        if (resultData.role === "confirm") {
          this.loadCtrl
            .create({
              message: "booking place",
            })
            .then((loadingEl) => {
              loadingEl.present();
              console.log("Boooooked!!!");
              const data = resultData.data.BookingData;
              this.bookingService
                .addBooking(
                  this.loadedPlace.id,
                  this.loadedPlace.title,
                  this.loadedPlace.imageUrl,
                  data.firstName,
                  data.lastName,
                  data.guestNumber,
                  data.startDate,
                  data.endDate
                )
                .subscribe(() => {
                  loadingEl.dismiss();
                  this.router.navigate(["/bookings"]);
                });
            });
        }
      });
  }

  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: "Choose an Action",
        buttons: [
          {
            text: "Select Date",
            handler: () => {
              this.openBookingModal("select");
            },
          },
          {
            text: "Random Date",
            handler: () => {
              this.openBookingModal("random");
            },
          },
          {
            text: "Cancel",
            role: "destructive",
          },
        ],
      })
      .then((actionSheetEl) => {
        actionSheetEl.present();
      });
  }
}
