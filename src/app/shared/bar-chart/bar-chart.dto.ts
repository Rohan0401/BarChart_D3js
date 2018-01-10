

// Create an interface for Data Transfer Object 
export interface IBarChartDTO {

  data: Array<any>; // Name and Value
  xLabel : string;
  yLabel : string;
  legend : boolean;
  margin?: {left : number , right : number , top : number , bottom : number } ; 
 
}



// Create a Class for the DTO
export class BarChartDTO implements IBarChartDTO{
   
  public data: Array<any>;
  public xLabel: string;
  public yLabel: string;
  public legend : boolean;
  public margin:{left : number , right : number , top : number , bottom : number };

constructor (data,  xLabel, yLabel ,legend, margin? ,  ) {
    
    this.data = data;
    this.margin = margin; 
    this.xLabel = xLabel;
    this.yLabel = yLabel;
    this.legend = legend; 
    this.margin =  {left : 40 , right : 20 , top : 20 , bottom : 30 }
    
     
     
   }
}



