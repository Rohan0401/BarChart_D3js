import { Component, OnInit, ViewChild, ElementRef, Input,Output, ViewEncapsulation, EventEmitter} from '@angular/core';
import * as d3 from 'd3';
import { BarChartDTO } from './bar-chart.dto'
import { constructDependencies } from '@angular/core/src/di/reflective_provider';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None // To include the global CSS 
})
export class BarChartComponent implements OnInit {
  @ViewChild('chart') private chartContainer: ElementRef;  // To provide the first element with the ID 
  @Input() private chartAttributes: BarChartDTO;
  @Output() private outputAttribute : EventEmitter<number> = new EventEmitter<number>();
  private data:   any;
  private chartData : Array<any>;
  private margin: any; // Provide properties for the chart 
  private chart:  any;
  private width:  number;
  private height: number;
  private xScale: any;
  private yScale: any;
  private colors: any;
  private xAxis:  any;
  private yAxis:  any;
  private legend: any;
  private xLabelText: any;
  private yLabelText: any;
 

  constructor() { 

  }

  ngOnInit() { 
    
    
    if (this.chartAttributes.data) {

      this.createChart();
      
      
    }
    this.updateChart(); 
    
    
    
  }
  generateData() {
    this.chartData = []
    //console.log(this.chartAttributes.data)
    for (let i = 0; i < (this.chartAttributes.data.length); i++) {
      this.chartData.push([
        `Letter ${this.chartAttributes.data[i].Letter}`,
        this.chartAttributes.data[i].Freq
      ]);
    }
    return this.chartData
  }


  createChart() {
    const element = this.chartContainer.nativeElement;

    this.chartAttributes.data = this.generateData();
    
    // Set the Width and Height 
    this.width = element.offsetWidth - this.chartAttributes.margin.left - this.chartAttributes.margin.right;
    this.height = element.offsetHeight - this.chartAttributes.margin.top - this.chartAttributes.margin.bottom;
    
    const svg = d3.select(element).append('svg')
      .attr('width', element.offsetWidth)
      .attr('height', element.offsetHeight);

    // chart plot area
    this.chart = svg.append('g')
      .attr('class', 'bars')
      .attr('transform', `translate(${this.chartAttributes.margin.left}, ${this.chartAttributes.margin.top})`);
      
    

    console.log(d3.range(this.chartData.length)) ;

    // define X & Y domains
    const xDomain = this.chartAttributes.data.map(d => d[0]);
    const yDomain = [0, d3.max(this.chartAttributes.data, d => d[1])];

    //console.log("This is x domain " + xDomain);
    //console.log("This is yDomain" + yDomain);
    //this.xScale = d3.range(this.data)
    // create scales
    this.xScale = d3.scaleBand().padding(0.1).domain(xDomain).rangeRound([0, this.width]);
    this.yScale = d3.scaleLinear().domain(yDomain).range([this.height, 0]);
    //console.log("This is X Scale " + this.xScale);
    //console.log("This is y Scale" + this.yScale);
    // bar colors
    this.colors = d3.scaleLinear().domain([0, this.chartAttributes.data.length]).range(<any[]>['red', 'blue']);
    console.log(this.colors)
    // x & y axis
    this.xAxis = svg.append('g')
      .attr('class', 'axis axis-x')
      .attr('transform', `translate(${this.chartAttributes.margin.left}, ${this.chartAttributes.margin.top + this.height})`)
      .call(d3.axisBottom(this.xScale));
    this.yAxis = svg.append('g')
      .attr('class', 'axis axis-y')
      .attr('transform', `translate(${this.chartAttributes.margin.left}, ${this.chartAttributes.margin.top})`)
      .call(d3.axisLeft(this.yScale));

    // Adding legend 

    this.legend = svg.selectAll(".legend")
    .data(this.chartAttributes.data.slice())
    .enter().append("g")
    .attr("class", "legend")
    .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    // Adding Labels to X and Y axis


    this.xLabelText = svg.append("text")             
    .attr("transform",
          "translate(" + (this.width/2) + " ," + 
                         (this.height + this.chartAttributes.margin.top + 20) + ")")
    .style("text-anchor", "middle")
    .style("font-family" ,  "Helvetica Neue, Helvetica, Arial, sans-serif")
    .style("font-size" ,  "80%" )
    .text(this.chartAttributes.xLabel);

    this.yLabelText = svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y",   this.chartAttributes.margin.left )
    .attr("x",0 - (this.height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .style("font-family" ,  "Helvetica Neue, Helvetica, Arial, sans-serif")
    .style("font-size" ,  "80%" )
    .text(this.chartAttributes.yLabel);

    
  

    
  }

  updateChart() {
    // update scales & axis
   
    this.xScale.domain(this.chartAttributes.data.map(d => d[0]));
    this.yScale.domain([0, d3.max(this.chartAttributes.data, d => d[1])]);
    this.colors.domain([0, this.chartAttributes.data.length]);
    this.xAxis.transition().call(d3.axisBottom(this.xScale));
    this.yAxis.transition().call(d3.axisLeft(this.yScale));
    

  
    // this binds the data 
    const update = this.chart.selectAll('.bar')
      .data(this.chartAttributes.data);

      this.legend.append("rect")
      .attr("x", this.width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => this.colors(i));
  
      this.legend.append("text")
      .attr("x", this.width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d[0]; });

      

      
  
    
    
    // remove exiting bars
    update.exit().remove();


  

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
      .attr('y', d => this.yScale(d[1]))
      .attr('height', d => this.height - this.yScale(d[1]))
      .on("click" , (d => this.outputAttribute.emit(this.height - this.yScale(d[1]))));
      
  }
}