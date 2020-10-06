import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonItemSliding, LoadingController } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Booking } from "./booking.model";
import { BookingsService } from "./bookings.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit, OnDestroy {
  constructor(
    private bookingsService: BookingsService,
    private loadCtrl: LoadingController
  ) {}

  isLoading = false;
  loadedBookings: Booking[];
  private bookingSub: Subscription;

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(
      (bookings) => (this.loadedBookings = bookings)
    );
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.bookingsService.fetchingBooks().subscribe(() => {
      this.isLoading = false;
    });
  }

  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  onCancelBooking(bookId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadCtrl
      .create({
        message: "caceling",
      })
      .then((loadEl) => {
        loadEl.present();
        this.bookingsService.cancelBooking(bookId).subscribe(() => {
          loadEl.dismiss();
        });
      });
  }
}
