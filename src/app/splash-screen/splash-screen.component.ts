import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { SplashScreenService } from './splash-screen.service';

@Component({
  selector: 'app-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
})
export class SplashScreenComponent implements OnInit {
  @ViewChild('splashScreen', { static: true }) splashScreen: ElementRef;
  hide=true;

  constructor(
    private el: ElementRef,
    private splashScreenService: SplashScreenService
  ) { }

  ngOnInit(): void {
    this.splashScreenService.init(this.splashScreen);
    setTimeout(() => {
      if (document.getElementById('splash-screen')) {
        document.getElementById('splash-screen').style.display = 'none';
        this.hide=false;
      }
    }, 2000);
  }
}
