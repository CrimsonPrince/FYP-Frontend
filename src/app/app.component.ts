import { Component } from '@angular/core';
import { latLng, tileLayer, rectangle } from 'leaflet';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FYP-Frontend';
    options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
        rectangle([[30.05, -24.95 ], [ 71.95, 44.95 ], [ 71.95, -24.95 ], [30.05, 44.95]]),
      ],
      zoom: 4.5,
      center: latLng(56.17, 9.55)
    };
}
