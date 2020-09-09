import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import * as d3 from 'd3';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';
import * as d3Time from 'd3-time';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
@Injectable()
export class Tab1Page {

  pm25Data = [
    { season: '1hr', viewers: 1.72 },
    { season: '2hr', viewers: 2.33825 },
    { season: '3hr', viewers: 3.9217603 },
    { season: '4hr', viewers: 3.3 },
    { season: '5hr', viewers: 3.6392103 },
    { season: '6hr', viewers: 2.86216995 },
    { season: '7hr', viewers: 5.44915933 },
    { season: '8hr', viewers: 0.348 }
  ];

  coData = [
    { season: '1hr', viewers: 0.72 },
    { season: '2hr', viewers: 4.33825 },
    { season: '3hr', viewers: 1.9217603 },
    { season: '4hr', viewers: 6.3 },
    { season: '5hr', viewers: 1.6392103 },
    { season: '6hr', viewers: 0.86216995 },
    { season: '7hr', viewers: 0.44915933 },
    { season: '8hr', viewers: 7.348 }
  ];


  pm10Data = [
    { season: '1hr', viewers: 50 },
    { season: '2hr', viewers: 70 },
    { season: '3hr', viewers: 92 },
    { season: '4hr', viewers: 65 },
    { season: '5hr', viewers: 102 },
    { season: '6hr', viewers: 87 },
    { season: '7hr', viewers: 84 },
    { season: '8hr', viewers: 79 }
  ];

  o3Data = [
    { season: '1hr', viewers: 0.01 },
    { season: '2hr', viewers: 0.02 },
    { season: '3hr', viewers: 0.03 },
    { season: '4hr', viewers: 0.05 },
    { season: '5hr', viewers: 0.04 },
    { season: '6hr', viewers: 0.05 },
    { season: '7hr', viewers: 0.44915933 },
    { season: '8hr', viewers: 0.348 }
  ];

  title = 'Dublin';
  subtitle = 'Air Quality Data in last 8 Hours';
  width: number;
  height: number;
  margin = { top: 20, right: 20, bottom: 30, left: 40 };
  x: any;
  y: any;
  svg: any;
  g: any;
  url: any;
  private measurements: any[] = [];


  dataset = [];

  constructor(private _platform: Platform, private http: HttpClient) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  getData(type) {
    this.url = "https://api.r4.ie/cities/Dublin%20City/" + type;
    console.log(this.url)
    return this.http.get<any[]>(this.url);
  }

  ionViewDidEnter() {
    this.init();
    this.initAxes(this.coData);
    this.drawAxes("CO");

    this.getData("co").subscribe(measurement => {
      this.measurements = [...measurement];
      console.log(this.measurements)
    });

    this.drawChart(this.pm25Data);
  }

  ionViewDidLeave() {
    this.svg.remove();
  }

  onChange(value) {
    this.svg.remove();
    console.log(value)
    this.getData(value).subscribe(measurement => {
      this.measurements = [...measurement];
      console.log(this.measurements)
    });
    this.init();
    console.log(this.coData)
    if(value == "pm25") {
      this.initAxes(this.pm25Data);
      this.drawAxes("pm25");
      this.drawChart(this.pm25Data); }
    if(value == "co") {
      this.initAxes(this.coData);
      this.drawAxes("CO");
      this.drawChart(this.coData);}
    if(value == "pm10") {
      this.initAxes(this.pm10Data);
      this.drawAxes("pm10");
      this.drawChart(this.pm10Data);}
    if(value == "o3") {
      this.initAxes(this.o3Data);
      this.drawAxes("o3");
      this.drawChart(this.o3Data);}
  }

  init() {
    this.svg = d3.select('#barChart')
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('viewBox', '0 0 900 500');
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  initAxes(data) {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(data.map((d) => d.season));
    this.y.domain([0, d3Array.max(data, (d) => d.viewers)]);
  }

  drawAxes(type) {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x))
      .attr('font-size', '30');
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .style("font", "25px times")
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .attr('fill', 'rgb(34, 167, 240)')
      .attr('font-size', '50')
      .text(type);
  }

  drawChart(data) {
    this.g.selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('fill', 'rgb(34, 167, 240)')
      .attr('x', (d) => this.x(d.season))
      .attr('y', (d) => this.y(d.viewers))
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - this.y(d.viewers));

  }
}


