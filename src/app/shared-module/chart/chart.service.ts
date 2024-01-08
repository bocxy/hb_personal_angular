import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  @Output() emptyChartArrayDuringChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() emitSelectedData: EventEmitter<any> = new EventEmitter<any>();
  @Output() extraWidthforReportViewLoadingScreen: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  getextraWidthforReportView(wh: any): void {
    this.extraWidthforReportViewLoadingScreen.emit(wh);
  }

}
