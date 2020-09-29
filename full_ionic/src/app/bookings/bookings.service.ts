import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";

@Injectable({ providedIn: "root" })
export class BookingsService {
  private _bookings: Booking[] = [
    {
      id: "xsa",
      placeId: "p1",
      placeTitle: "asd",
      guestNumber: 1,
      userId: "1u",
    },
  ];

  get bookings() {
    return [...this._bookings];
  }
}
