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
      this.url = "https://api.r4.ie/measurements/";
      let uri: string;
      uri = this.url.concat(type.toString());
      console.log(uri)
      return this.http.get<any[]>(uri);
    }

    async loadMap() {

      var token ="pk.eyJ1IjoiY3JpbXNvbnByaW5jZSIsImEiOiJjazQyejZmajAwMmN6M2tsa211bW42bm84In0.ygXb37nll4_Y7PqqQy9JFw";

      var map = L.map('map').setView([38.912753, -77.032194], 6).setMinZoom(2).setMaxZoom(25);
      var gl = L.mapboxGL({
          accessToken: token,
          style: 'mapbox://styles/mapbox/light-v10'
      }).addTo(map);

      this.getData("co").subscribe(measurements => {

        var o3 = L.markerClusterGroup({showCoverageOnHover: false});
        var co = L.markerClusterGroup({showCoverageOnHover: false});
        var pm25 = L.markerClusterGroup({showCoverageOnHover: false});
        var pm10 = L.markerClusterGroup({showCoverageOnHover: false});
        console.log(measurements)
        for (var i = 0; i < measurements.length; i++) {
          var a = measurements[i];
            if(a.coordinates) {
              var title = a.location;
              // var marker = L.circleMarker(new L.LatLng(a.coordinates.latitude, a.coordinates.longitude), {fill: true, color: '#3388ff'});
              var marker = L.circle(new L.LatLng(a.coordinates.latitude, a.coordinates.longitude), {
                color: 'red',
                fillOpacity: 0.5,
                radius: 500
            }).bindPopup("Location: " + a.location + "<br>" + "City: " + a.city + "<br>" + a.parameter + ": " + a.value +  a.unit)
              if(a.parameter == "o3") {
                o3.addLayer(marker);
              }
              if(a.parameter == "co") {
                co.addLayer(marker);
              }
              if(a.parameter == "pm25") {
                pm25.addLayer(marker);
              }
              if(a.parameter == "pm10") {
                pm10.addLayer(marker);
              }
            }


        }
        console.log(o3)


            var baseMaps = {
               "Pm10": pm10,
              "PM2.5" : pm25,
              "CO": co,
              "O3": o3
    };
    L.control.layers(baseMaps).addTo(map);
    pm10.addTo(map);

      })
  }
}
