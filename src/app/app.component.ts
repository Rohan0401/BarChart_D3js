import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import {BarChartDTO } from './shared/bar-chart/bar-chart.dto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private chartData: Array<any>;
  private chartDTO: BarChartDTO;
  
  constructor() {
    
  } ; 
  
  countChange(event) {  
    console.log("The height of the bar is "+ event);
  
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
    }, {
      "Letter" : "G",
      "Freq": 34
    },
    {
      "Letter" : "H",
      "Freq": 5
    },
    {
      "Letter" : "I",
      "Freq": 8 
    }, {
      "Letter" : "C",
      "Freq": 34
    },
    {
      "Letter" : "B",
      "Freq": 5
    },
    {
      "Letter" : "A",
      "Freq": 8 
    }
  
    ]
  

  ngOnInit() {
    // this.chartDTO = this.chartDTO || new BarChartDTO();
    

    this.chartDTO = new BarChartDTO( this.demo_data ,"Letters", "Frequency" , {left : 10 , right : 10 , top : 20 , bottom : 30 } )
    
    
    
  
   
  }



  
// TODO remove this




}