import {Component, Input, ElementRef} from "@angular/core";
import {DatapointUtil} from "../services/datapointutil";
import {Datapoint} from "../services/generic_datapoints";

@Component({
  selector: 'omh-chart',
  templateUrl: 'chart.html',
  providers: [DatapointUtil]
})
export class OmhChart {
  @Input() datapoints: Datapoint[] = [];
  private chart: any;
  private chartElement: any;
  private chartableProperties: string = 'blood-glucose';
  private chartOptions: any = {
    'measures': {
      'blood-glucose' : {
        'valueKeyPath': 'body.blood_glucose.value',
        'range': undefined,
        'units': 'mmol/L',
        'chart': {
          'pointFillColor' : '#4a90e2',
          'pointStrokeColor' : '#0066d6',
        },
        'thresholds': [
          { name: 'Desirable', max: 5.8 },
          { name: 'Borderline high', min: 5.8, max: 7.8 },
          { name: 'High', min: 7.8 },
        ]
      },
    }
  };

  constructor(public datapointUtil: DatapointUtil, public element: ElementRef) {
    this.chartElement = d3.select(element.nativeElement);
  }

  ngOnChanges(changes) {
    if(changes.datapoints) {
      this.initChart();
    }
  }

  initChart() {
    // If no events are loaded, don't show a chart
    if (!this.datapoints || this.datapoints.length == 0) {
      return
    }

    // Sort by date ascending
    let sortedEvents = this.datapointUtil.sortByDate(this.datapoints).map((datapoint) => {
      return DatapointUtil.convertDates(datapoint, (d) => {
        return d.toJSON();
      });
    });

    this.createChart(sortedEvents);
    this.showChart();
  }

  // Create a new chart
  createChart(omhDataPoints) {
    if (this.chart)
      this.chart.destroy();

    this.chart = new OMHWebVisualizations.Chart(omhDataPoints, this.chartElement, this.chartableProperties, this.chartOptions);
  }

  // Show the chart
  showChart() {
    if (this.chart) {
      var svg = this.chartElement.select('svg');
      svg.style('display', 'block');
      this.chart.renderTo(svg.node());
    }
  }
}
