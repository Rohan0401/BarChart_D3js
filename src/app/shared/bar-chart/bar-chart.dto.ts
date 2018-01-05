

// Create an interface for Data Transfer Object 
export interface IBarChartDTO {

   data: Array<any>;
   width: number;
   height: number;
   margin?: {left : number , right : number , top : number , bottom : number } ; 
}

// Create a Class for the DTO
export class BarChartDTO implements IBarChartDTO{
   public data: Array<any>;
   public width: number;
   public height: number;
   public margin?:{left : number , right : number , top : number , bottom : number };

   constructor (dtoInterface?: IBarChartDTO) {
     (dtoInterface && dtoInterface.margin)
       ? this.margin = dtoInterface.margin
       : this.margin = {left : 10 , right : 10 , top : 10 , bottom : 10   }
   }
}
