

// Create an interface for Data Transfer Object 
export interface IBarChartDTO {

   data: Array<any>;
 //  width: number;
 //  height: number;
   margin: {left : number , right : number , top : number , bottom : number } ; 
}

// Create an event for Output Data Transfer Object
export interface IBarChartDTOutput {
  height : number;

}

// Create a Class for the DTO
export class BarChartDTO implements IBarChartDTO{
   
  public data: Array<any>;
  public margin:{left : number , right : number , top : number , bottom : number };

constructor (data , margin ) {
    
    this.data = data;
    this.margin = margin; 
     
     
   }
}
// Remove DTO for events  
export class BarChartDTOoutput implements IBarChartDTOutput {
  public height : number;

}


