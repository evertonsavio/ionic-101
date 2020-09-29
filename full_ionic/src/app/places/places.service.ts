import { Injectable } from "@angular/core";
import { Place } from "./offers/place.model";

@Injectable({
  providedIn: "root",
})
export class PlacesService {
  private _places: Place[] = [
    new Place(
      "1",
      "Manhatan",
      "asdsad",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&w=1000&q=80",
      132
    ),
    new Place(
      "2",
      "Maasdasdtan",
      "asasad",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROZed5WF_deArLvwsn5oqECGfkEfuOrPyMYg&usqp=CAU",
      132
    ),
    new Place(
      "3",
      "Maasdasdtan",
      "asasad",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROZed5WF_deArLvwsn5oqECGfkEfuOrPyMYg&usqp=CAU",
      132
    ),
    new Place(
      "4",
      "Maasdasdtan",
      "asasad",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROZed5WF_deArLvwsn5oqECGfkEfuOrPyMYg&usqp=CAU",
      132
    ),
    new Place(
      "5",
      "Maasdasdtan",
      "asasad",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcROZed5WF_deArLvwsn5oqECGfkEfuOrPyMYg&usqp=CAU",
      132
    ),
  ];

  get places() {
    return [...this._places];
  }

  getPlace(_id: string) {
    return { ...this._places.find((res) => res.id === _id) };
  }

  constructor() {}
}
