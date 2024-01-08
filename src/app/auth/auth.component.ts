import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    
  }
  showHead: boolean = false;



  
  hideNavbarAndFooterForLogin() {
    this.showHead = false;
  }
  showNavbarAndFooterForOtherComponents() {
    this.showHead = true;
  }

}
