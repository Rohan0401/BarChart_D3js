import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import {BarChartDTO , BarChartDTOoutput} from './shared/bar-chart/bar-chart.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private chartData: Array<any>;
  private chartDTO: BarChartDTO;
  private eventDTO : BarChartDTOoutput;
  constructor() {
    
  } ; 
  countChange(event) {  console.log("The height of the bar is "+ event);
  }

  // Input data for the bar Chart 

  demo_data = [
    {
      "Letter": "A",
      "Freq": 20	
    },
    {
      "Letter" : "B",
      "Freq": 12
    },
    {
      "Letter" : "C",
      "Freq": 47
    },
    {
      "Letter" : "D",
      "Freq": 34
    },
    {
      "Letter" : "E",
      "Freq": 5
    },
    {
      "Letter" : "F",
      "Freq": 8 
    },
    {
      "Letter" : "G",
      "Freq": 25
    }
  
    ]
  

  ngOnInit() {
    // this.chartDTO = this.chartDTO || new BarChartDTO();
    this.generateData()
    this.chartDTO = new BarChartDTO( this.chartData , {left : 40 , right : 20 , top : 20 , bottom : 30 } )
    
    
    
  
   
  }



  
// TODO remove this
generateData() {
  this.chartData = [];
  for (let i = 0; i < (this.demo_data.length); i++) {
    this.chartData.push([
      `Letter ${this.demo_data[i].Letter}`,
      this.demo_data[i].Freq
    ]);
  }
}


}