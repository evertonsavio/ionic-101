import { Component, OnInit } from "@angular/core";
import { IonItemSliding } from "@ionic/angular";
import { Booking } from "./booking.model";
import { BookingsService } from "./bookings.service";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"],
})
export class BookingsPage implements OnInit {
  constructor(private bookingsService: BookingsService) {}

  loadedBookings: Booking[];

  ngOnInit() {
    this.loadedBookings = this.bookingsService.bookings;
  }
  onCancelBooking(offerId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
  }
}
