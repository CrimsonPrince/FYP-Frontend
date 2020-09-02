import { Component } from '@angular/core';
import { Geolocation} from '@capacitor/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {
    // this.getCountries();
  }

  // latitude: number;
  // longitude: number;

  // async getLocation() {
  //   const position = await Geolocation.getCurrentPosition();
  //   this.latitude = position.coords.latitude;
  //   this.longitude = position.coords.longitude;
  // }

}
