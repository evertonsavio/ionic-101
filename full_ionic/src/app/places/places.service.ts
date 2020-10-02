import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { Place } from "./place.model";
import { take, map, filter, tap, delay } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  constructor(private authService: AuthService) {}

  private _places = new BehaviorSubject<Place[]>([
    new Place(
      "1",
      "Manhatan",
      "asdsad",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80",
      132,
      new Date("2019-12-12"),
      new Date("2020-12-12"),
      `1`
    ),
    new Place(
      "2",
      "Maasdasdtan",
      "asasad",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROZed5WF_deArLvwsn5oqECGfkEfuOrPyMYg&usqp=CAU",
      132,
      new Date("2019-12-12"),
      new Date("2020-12-12"),
      `2`
    ),
  ]);

  get places() {
    return this._places.asObservable();
  }

  getPlace(_id: string) {
    return this.places.pipe(
      take(1),
      map((places) => {
        return { ...places.find((p) => p.id === _id) };
      })
    );
  }

  addPlace(
    title: string,
    description: string,
    price: number,
    dateFrom: Date,
    dateTo: Date
  ) {
    const newPlace = new Place(
      Math.random().toString(),
      title,
      description,
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROZed5WF_deArLvwsn5oqECGfkEfuOrPyMYg&usqp=CAU",
      price,
      dateFrom,
      dateTo,
      this.authService.userId
    );
    //this._places.push(newPlace);
    return this._places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        this._places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, desciption: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap((places) => {
        const updatedPlaceIndex = places.findIndex((pl) => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          desciption,
          oldPlace.imageUrl,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this._places.next(updatedPlaces);
      })
    );
  }
}
