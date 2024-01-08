import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit } from '@angular/core';
import { ChartService } from './chart.service';

declare let google: any;

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, AfterViewInit {
  dynamicResize = true;
  selectedLang: any;
  chart: any;
  updateFlag = false;
  chartConstructor = "chart";
  chartCallback;
  showChart = false;
  @Input() indexs: any;
  @Input() chartTypeg: string;
  @Input() title: string;
  @Input() ifDrillDown = false;
  chartData: any[];
  chartColumns: any[];
  chartDataArray = [];
  chartColumnsArray = [];
  isLoad = true;
  chartOptionsg: any = {
    // title: '',
    // width: '400',
    // height: '270',
    // legend: { position: 'right', alignment: 'start' },
    // color: ['#b23392', '#cc9fc1', '#2F847C']
  };
  isHide: boolean;
  id: string;
  constructor(private chartService: ChartService, private cdr: ChangeDetectorRef, private element: ElementRef) {
    this.chartCallback = chart => {
      this.chart = chart;

    };
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  ngOnInit(): void {
    console.log(this.chartTypeg)
    this.emptyChartArrayDuringChange();
    // this.setextraWidthforReportView();
    // if (this.chartTypeg === 'PieChart') {
    //   this.chartOptionsg = {
    //     title: '',
    //     width: '400',
    //     height: '270',
    //     color: ['#b23392', '#cc9fc1', '#2F847C'],
    //     pieSliceText: 'value',
    //     sliceVisibilityThreshold: 0,
    //     fontSize: 12,
    //     is3D: true,
    //     legend: {
    //       position: 'labeled'
    //     },
    //     chartArea: {
    //       backgroundColor: '#333333'
    //     },
    //   }
    // }
    this.id = Math.floor(Math.random() * (999 - 100 + 1) + 100).toString();
  }

  drawChart() {
    if (this.chartColumns && this.chartData) {
      google.charts.load('current', { 'packages': ['bar'] });
      google.charts.setOnLoadCallback(() => {
        const chartData = JSON.parse(JSON.stringify(this.chartData));
        chartData.unshift(this.chartColumns);
        const wrapper = new google.visualization.ChartWrapper({
          container: document.querySelector('#initial_chart_div_' + this.id),
          chartType: this.chartTypeg,
          dataTable: chartData,
          options: this.chartOptionsg
        });
        console.log(wrapper)
        wrapper.draw();
        google.visualization.events.addListener(wrapper.getChart(), 'select', () => {
          const selection = wrapper.getChart()?.getSelection();
          this.onSelect(selection);
        });
      });

    }
  }

  showLoading(): void {
    if (this.chart) {
      this.chart.showLoading();

    }
  }

  hideLoading(): void {
    if (this.chart) {
      this.chart.hideLoading();
    }
  }

  loadChartWithDelay(): void {
    this.isLoad = false;
    setTimeout(() => {
      this.isLoad = true;
    }, 200);
  }

  emptyChartArrayDuringChange(): void {
    this.chartService.emptyChartArrayDuringChange.subscribe(data => {
      if (data === true) {
        this.chartDataArray = [];
        this.chartColumnsArray = [];
      }
    })
  }

  // setextraWidthforReportView(): void {
  //   this.chartService.extraWidthforReportViewLoadingScreen.subscribe(data => {
  //     if (data) {
  //       this.chartOptionsg.width = data.width;
  //       this.chartOptionsg.height = data.height;
  //     }
  //   })
  //   this.cdr.detectChanges();

  // }


  refreshForLastLength(): void {

    this.chartData = this.chartDataArray[this.chartDataArray.length - 1];
    this.chartColumns = this.chartColumnsArray[this.chartColumnsArray.length - 1];
    this.drawChart();
    this.cdr.detectChanges();
  }

  onSelect(event: any): void {
    if (this.ifDrillDown) {
      let row: any
      let coloumn: any
      // const a = this.googleChart.chartWrapper.draw
      this.chartData.forEach((data, k) => {
        if (event[0].row === k) {
          // row = event.row;
          // coloumn = event.selection[0].coloumn;
          this.drillDown(data)
        }
      });
    }
  }

  onReady($event: any): void {
    // console.log("qw", $event);
  }

  backDrillDown(): void {
    if (this.chartDataArray.length > 1 && this.chartDataArray.length > 1) {
      this.chartDataArray.pop();
      this.chartColumnsArray.pop();
      this.refreshForLastLength();
    }
  }

  drillDown(selectedData: any[]): void {
    this.chartService.emitSelectedData.emit(selectedData);
  }
}
