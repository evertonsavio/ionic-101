import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { PlacesService } from "../../places.service";
import { Place } from "../place.model";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"],
})
export class EditOfferPage implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  loadedPlace: Place;
  form: FormGroup;

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      if (!param.has("placeId")) {
        this.navCtrl.navigateBack("/places/offers");
        return;
      }
      this.loadedPlace = this.placesService.getPlace(param.get("placeId"));

      this.form = new FormGroup({
        title: new FormControl(this.loadedPlace.title, {
          updateOn: "blur",
          validators: [Validators.required],
        }),
        description: new FormControl(this.loadedPlace.description, {
          updateOn: "blur",
          validators: [Validators.required, Validators.maxLength(180)],
        }),
      });
    });
  }
  onEditOffer() {
    if (!this.form.valid) {
      return;
    }
    console.log(this.form.value);
  }
}
