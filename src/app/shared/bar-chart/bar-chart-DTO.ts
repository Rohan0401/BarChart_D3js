import { Numeric } from "d3";


// Create an interface for Data Transfer Object 
export interface IBarChartDTO {
  
   data: Array<any>;  
   width: number;
   height: number;
   margin?: number; 
}

// Create a Class for the DTO
export class BarChartDTO implements IBarChartDTO{
   public data: Array<any>;
   public width: number;
   public height: number;
   public margin?: number;

   constructor (dtoInterface: IBarChartDTO) {
     (dtoInterface.margin)
       ? this.margin = dtoInterface.margin
       : this.margin = 20; 
   }
}
