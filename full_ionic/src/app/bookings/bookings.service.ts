import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";

@Injectable({ providedIn: "root" })
export class BookingsService {
  private _bookings: Booking[] = [
    {
      id: "xsa",
      placeId: "p1",
      placeTitle: "Booking 1",
      guestNumber: 1,
      userId: "1u",
    },
    {
      id: "xs2",
      placeId: "p2",
      placeTitle: "Booking 2",
      guestNumber: 2,
      userId: "1u",
    },
  ];

  get bookings() {
    return [...this._bookings];
  }
}
