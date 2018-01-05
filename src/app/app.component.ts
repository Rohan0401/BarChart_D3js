import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { Observable } from 'rxjs/Observable';
import {BarChartDTO} from './shared/bar-chart/bar-chart-DTO';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private chartData: Array<any>;
  private chartDTO: BarChartDTO
  data ; 
  constructor() {} ; 




  ngOnInit() {
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    setTimeout(() => {
      this.generateData();

      // change the data periodically
      setInterval(() => this.generateData(), 3000);
    }, 1000);
  }
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
    "Freq" : 54
  },
  {
    "Letter" : "F",
    "Freq" : 21
  },
  {
    "Letter" : "G",
    "Freq" : 57
  },
  {
    "Letter" : "H",
    "Freq" : 31
  },
  {
    "Letter" : "I",
    "Freq" : 17
  },
  {
    "Letter" : "J",
    "Freq" : 5
  },
  {
    "Letter" : "K",
    "Freq" : 23
  },
  {
    "Letter" : "L",
    "Freq" : 39
  },
  {
    "Letter" : "M",
    "Freq" : 29
  },
  {
    "Letter" : "N",
    "Freq" : 33
  },
  {
    "Letter" : "O",
    "Freq" : 18
  },
  {
    "Letter" : "P",
    "Freq" : 35
  },
  {
    "Letter" : "Q",
    "Freq" : 11
  },
  {
    "Letter" : "R",
    "Freq" : 45
  },
  {
    "Letter" : "S",
    "Freq" : 43
  },
  {
    "Letter" : "T",
    "Freq" : 28
  },
  {
    "Letter" : "U",
    "Freq" : 26
  },
  {
    "Letter" : "V",
    "Freq" : 30
  },
  {
    "Letter" : "X",
    "Freq" : 5
  },
  {
    "Letter" : "Y",
    "Freq" : 4
  },
  {
    "Letter" : "Z",
    "Freq" : 2
  }
  ]

  generateData() {
    this.chartData = [];
    for (let i = 0; i < (this.demo_data.length); i++) {
      this.chartData.push([
        `Letter ${this.demo_data[i].Letter}`,
        this.demo_data[i].Freq
      ]);
    }
    this.chartDTO = new BarChartDTO({
      data: this.chartData,
      margin: 20,
      width: 500,
      height: 500
    })

 /*  generateData_dep() {
    this.chartData = [];
    for (let i = 0; i < (10 + Math.floor(Math.random() * 100)); i++) {
      this.chartData.push([
        `Index ${i}`,
        Math.floor(Math.random() * 100)
      ]);
    } */
  } 
}