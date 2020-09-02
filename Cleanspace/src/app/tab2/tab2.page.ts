import { Component } from '@angular/core';
import * as L from 'leaflet';
import 'mapbox-gl';
import 'mapbox-gl-leaflet';
import 'leaflet.markercluster';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
@Injectable()
export class Tab2Page {

  constructor(private http: HttpClient) {}

  private url: string;
  private countries: any[] = [];

    ionViewDidEnter(){
      this.loadMap();
    }

    getData(type: string) {
      this.url = "http://localhost:3000/measurements/";
      let uri: string;
      uri = this.url.concat(type.toString());
      console.log(uri)
      return this.http.get<any[]>(uri);
    }

    async loadMap() {

      let measure: any[] = [];
      this.getData("co").subscribe(measurements => {
        var token ="pk.eyJ1IjoiY3JpbXNvbnByaW5jZSIsImEiOiJjazQyejZmajAwMmN6M2tsa211bW42bm84In0.ygXb37nll4_Y7PqqQy9JFw";

        var map = L.map('map').setView([38.912753, -77.032194], 6).setMinZoom(2).setMaxZoom(25);
        var gl = L.mapboxGL({
            accessToken: token,
            style: 'mapbox://styles/mapbox/light-v10'
        }).addTo(map);


        var markers = L.markerClusterGroup({showCoverageOnHover: false});
        console.log(measurements)
        for (var i = 0; i < measurements.length; i++) {
          var a = measurements[i];
            if(a.coordinates) {
              var title = a.location;
              var marker = L.circleMarker(new L.LatLng(a.coordinates.latitude, a.coordinates.longitude));
              markers.addLayer(marker);
            }


        }
        map.addLayer(markers);
      } )

    }

}
