import { Component } from '@angular/core';
import { tileLayer, latLng, InvalidateSizeOptions, Map } from 'leaflet';
// import * as L from 'ngx-leaflet';

// import 'mapbox-gl';
// import 'mapbox-gl-leaflet';
// import '@ngi-digital/leaflet.markercluster';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 5,
    center: latLng(46.879966, -121.726909)
  };

  public map: Map = null;

  constructor() {}

    // The below function is added
    ionViewDidEnter(){
      this.loadMap();
    }


  onMapReady(map: Map) {
    this.map = map;
  }

  onResized() {
    if (this.map) {
      this.map.invalidateSize();
    }
  }
   // The below function is added
    loadMap() {

    //   var token ="pk.eyJ1IjoiY3JpbXNvbnByaW5jZSIsImEiOiJjazQyejZmajAwMmN6M2tsa211bW42bm84In0.ygXb37nll4_Y7PqqQy9JFw"; // replace with your Mapbox API Access token. Create a Mapbox account and find it on https://account.mapbox.com/

    //   var map = L.map('map').setView([38.912753, -77.032194], 15);
    //   L.marker([38.912753, -77.032194])
    //       .bindPopup("Hello <b>Leaflet GL</b>!<br>Whoa, it works!")
    //       .addTo(map)
    //       .openPopup();
    //   var gl = L.mapboxGL({
    //       accessToken: token,
    //       style: 'mapbox://styles/mapbox/light-v10'
    //   }).addTo(map);

    //   var markers = L.markerClusterGroup();
    //   // markers.addLayer(L.marker());
    //   map.addLayer(markers);

    // // this.map = new Map("mapId").setView([17.3850,78.4867], 13);

    // // tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    // //   { attribution: 'Map data © <a href="https://www.openstreetmap.org/"> OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY- SA</a>'}).addTo(this.map);
    // // }
    }

}
