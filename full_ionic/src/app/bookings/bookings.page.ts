import { Component, OnDestroy, OnInit } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";
import { Subscription } from "rxjs";
import { Booking } from "./booking.model";
import { BookingsService } from "./bookings.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit, OnDestroy {
  constructor(private bookingsService: BookingsService) {}

  loadedBookings: Booking[];
  private bookingSub: Subscription;

  ngOnInit() {
    this.bookingSub = this.bookingsService.bookings.subscribe(
      (bookings) => (this.loadedBookings = bookings)
    );
  }
  ngOnDestroy(): void {
    if (this.bookingSub) {
      this.bookingSub.unsubscribe();
    }
  }

  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }
}
