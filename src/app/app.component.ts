import { Component, OnInit } from '@angular/core';
import { latLng, tileLayer, rectangle, Marker, Icon, icon } from 'leaflet';
import * as L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'FYP-Frontend';
    options = {
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 12, attribution: '...' }),
      ],
      zoom: 4.5,
      center: latLng(56.17, 9.55)
    };

    private defaultIcon: Icon = icon({
      iconUrl: "assets/marker-icon.png",
      shadowUrl: "assets/marker-shadow.png"
    });



  ngOnInit() {
    Marker.prototype.options.icon = this.defaultIcon;
  }


  onMapReady(map: L.Map) {
    let control = L.Routing.control({
      routeWhileDragging: true
    }).addTo(map);

    function createButton(label, container) {
      var btn = L.DomUtil.create("button", "", container);
      btn.setAttribute("type", "button");
      btn.innerHTML = label;
      return btn;
    }

    map.on("click", <LeafletMouseEvent>(e) => {
      var container = L.DomUtil.create("div"),
        startBtn = createButton("Start from this location", container),
        destBtn = createButton("Go to this location", container);

      L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

        L.DomEvent.on(startBtn, "click", function() {
          control.spliceWaypoints(0, 1, e.latlng);
          map.closePopup();
        });

        L.DomEvent.on(destBtn, "click", function() {
          control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
          map.closePopup();
        });
    });
  }

}
