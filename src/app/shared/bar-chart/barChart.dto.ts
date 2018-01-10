export interface TitleOrSubtitle {
    text: string;
    enabled: boolean;
  }
  
  export interface Legend {
    /**
     *  verticle or horizontal
     */
    layout: string;
    /**
     * left | right
     */
    align: string;
    /**
     * middle
     */
    verticalalign: string;
    cssClass: string;
    enabled: boolean;
  }
  
  export interface SeriesEntity {
    name: string;
    color: string;
    data: Data[];
    /* TODO : this can be an object instead of array e.g. Array<Data>  OR any[] */
    connectorType?: string;
    /* it may be shape like circle, triangle, square, arrow etc, */
  }
  
  export class Data {
    id: string;
    name: string;
    value: string;
    parent: string;
  }
  
  export class Chart {
    type: string;
  }
  
  export class ToolTip {
    /**
     * attr of Data may be provided here
     */
    headerFormat: string;
    /**
     * <point>.x or <point>.y
     */
    pointFormat: string;
  }
  
  export interface ChartDetailsDTO {
    chart: Chart;
    title: TitleOrSubtitle;
    subtitle: TitleOrSubtitle;
    /**
     * XAxis or YAsix may contain js function
     */
    xAxis: TitleOrSubtitle;
    yAxis: TitleOrSubtitle;
    legend: Legend;
    tooltip: ToolTip;
    seriesEntity: SeriesEntity[];
    printEnabled: boolean;
    downloadPdfEnabled: boolean;
  }