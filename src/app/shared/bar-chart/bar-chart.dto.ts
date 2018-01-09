

// Create an interface for Data Transfer Object 
export interface IBarChartDTO {

  data: Array<any>;
  xLabel : string;
  yLabel : string;
  margin?: {left : number , right : number , top : number , bottom : number } ; 
 
}



// Create a Class for the DTO
export class BarChartDTO implements IBarChartDTO{
   
  public data: Array<any>;
  public xLabel: string;
  public yLabel: string;
  public margin:{left : number , right : number , top : number , bottom : number };

constructor (data,  xLabel, yLabel , margin? ) {
    
    this.data = data;
    this.margin = margin; 
    this.xLabel = xLabel;
    this.yLabel = yLabel;
    if(this.margin){
      this.margin =  {left : 40 , right : 20 , top : 20 , bottom : 30 }
    }
     
     
   }
}



