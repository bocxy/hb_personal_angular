// import { DatePipe } from '@angular/common';
import { Component, Input, NgZone, OnInit } from '@angular/core';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})
export class HeadersComponent implements OnInit {
  @Input() collapsed = false;
  @Input() screenWidth = 0;
  customerList: any;
  noData: boolean;
  currentTimeString: string;

//   currentDate: string;
// currentTime: string;
// currentDay: string;
// currentYear: string;

  constructor(private zone: NgZone) { }

  ngOnInit(): void {
  

    this.updateCurrentTime();

    // Update the current time every second
    setInterval(() => {
      this.zone.run(() => {
        this.updateCurrentTime();
      });
    }, 1000);
  }
 
  

  updateCurrentTime() {
    const now = new Date();
    const hours = this.padZero(now.getHours());
    const minutes = this.padZero(now.getMinutes());
    const seconds = this.padZero(now.getSeconds());

    this.currentTimeString = `${hours}:${minutes}:${seconds}`;
  }

  // Add this method to pad a single digit number with a leading zero
  padZero(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }
  
  getHeadClass(): string {
    let styleClass = '';
    if (this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = "head-md-screen"
    }
    return styleClass;
  }
}
