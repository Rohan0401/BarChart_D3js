import { Component, OnInit, OnChanges, ViewChild, ElementRef, Input, ViewEncapsulation } from '@angular/core';
import * as d3 from 'd3';
import { BarChartDTO } from './bar-chart.dto'
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None // To include the global CSS 
})
export class BarChartComponent implements OnInit, OnChanges {
  @ViewChild('chart') private chartContainer: ElementRef;  // To provide the first element with the ID 
  @Input() private chartAttributes: BarChartDTO; // Provide the input data bindings with array of any object
  private data: any;
  private margin: any; // Provide properties for the chart 
  private chart: any;
  private width: number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis: any;
  private yAxis: any;
  private onClick: any;

  constructor() { }

  ngOnInit() { 
    
    if (this.chartAttributes.data) {
      this.data = this.chartAttributes.data;
      this.updateChart();
    }
  }

  ngOnChanges() { // Change the trasition 
    if (this.chart) {
      this.updateChart();
    }
  }

  createChart() {
    const element = this.chartContainer.nativeElement;
    this.width = element.offsetWidth - this.chartAttributes.margin.left - this.chartAttributes.margin.right;
    this.height = element.offsetHeight - this.chartAttributes.margin.top - this.chartAttributes.margin.bottom;
    console.log(this.chartAttributes.data)
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.chartAttributes.margin.left}, ${this.chartAttributes.margin.top})`);
      
    

    // Make a on Click 

    // define X & Y domains
    const xDomain = this.chartAttributes.data.map(d => d[0]);
    const yDomain = [0, d3.max(this.chartAttributes.data, d => d[1])];

    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);

    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.data.length]).range(<any[]>['red', 'blue']);

    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.chartAttributes.margin.left}, ${this.chartAttributes.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.chartAttributes.margin.left}, ${this.chartAttributes.margin.top})`)
      .call(d3.axisLeft(this.yScale));
    
  

    
  }

  updateChart() {
    // update scales & axis
    this.xScale.domain(this.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.data, d => d[1])]);
    this.colors.domain([0, this.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));
  
    // this binds the data 
    const update = this.chart.selectAll('.bar')
      .data(this.data);

    // remove exiting bars
    update.exit().remove();

    // update existing bars
    this.chart.selectAll('.bar').transition()
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(d[1]))
      .attr('width', d => this.xScale.bandwidth())
      .attr('height', d => this.height - this.yScale(d[1]))
      .style('fill', (d, i) => this.colors(i));
    var toggleColor = (function(){
        var currentColor = "red";
     
         return function(){
             currentColor = currentColor == "black" ? "yellow" : "black";
             d3.select(this).style("fill", currentColor);
         }
     })();

    // add new bars
    update
      .enter()
      .append('rect')
      .attr('class', 'bar')
      .attr('x', d => this.xScale(d[0]))
      .attr('y', d => this.yScale(0))
      .attr('width', this.xScale.bandwidth())
      .attr('height', 0)
      .style('fill', (d, i) => this.colors(i))
      .on("click", toggleColor )
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]));
      
  }
}