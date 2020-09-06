import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import * as d3 from 'd3-selection';
import * as d3Scale from 'd3-scale';
import * as d3Array from 'd3-array';
import * as d3Axis from 'd3-axis';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  barData = [
    { season: '1hr', viewers: 1.72 },
    { season: '2hr', viewers: 2.33825 },
    { season: '3hr', viewers: 3.9217603 },
    { season: '4hr', viewers: 3.3 },
    { season: '5hr', viewers: 3.6392103 },
    { season: '6hr', viewers: 2.86216995 },
    { season: '7hr', viewers: 5.44915933 },
    { season: '8hr', viewers: 0.348 },
    { season: '9hr', viewers: 1.72 },
    { season: '10hr', viewers: 2.33825 },
    { season: '11hr', viewers: 3.9217603 },
    { season: '12hr', viewers: 3.3 },
    { season: '13hr', viewers: 3.6392103 },
    { season: '14hr', viewers: 2.86216995 },
    { season: '15hr', viewers: 5.44915933 },
    { season: '16hr', viewers: 0.348 }
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

  constructor(private _platform: Platform) {
    this.width = 900 - this.margin.left - this.margin.right;
    this.height = 500 - this.margin.top - this.margin.bottom;
  }

  ionViewDidEnter() {
    this.init();
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

  initAxes() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.barData.map((d) => d.season));
    this.y.domain([0, d3Array.max(this.barData, (d) => d.viewers)]);
  }

  drawAxes() {
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
      .text('No2');
  }

  drawChart() {
    this.g.selectAll('.bar')
      .data(this.barData)
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


