import { Component } from '@angular/core';
import { Geolocation} from '@capacitor/core';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
@Injectable()
export class Tab3Page {

  constructor(private http: HttpClient) {
    this.loadCountries();
  }

  private url: string;
  private countries: any[] = [];

  getData() {
    this.url = "http://localhost:3000/countries";
    return this.http.get<any[]>(this.url);
  }

  loadCountries(){

    this.getData().subscribe(country => {
      this.countries = [...country];
      console.log(this.countries)
    });

  }

  // latitude: number;
  // longitude: number;

  // async getLocation() {
  //   const position = await Geolocation.getCurrentPosition();
  //   this.latitude = position.coords.latitude;
  //   this.longitude = position.coords.longitude;
  // }

}
