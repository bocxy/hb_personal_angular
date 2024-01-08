import { Component, Output, EventEmitter, OnInit, HostListener } from '@angular/core';
import { navMenuBar } from '../navdata';
interface SideNavToggle {
  screenWidth: number;
  collapsed: boolean;
}
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() onToogleSideNav: EventEmitter<SideNavToggle> = new EventEmitter
  screenWidth = 0;
  collapsed = false;
  navData = navMenuBar;
  currentSubMenu: any;

  isSubMenuVisible: boolean = false;

@HostListener('window:resize',['$event'])
onResize(event:any){
  this.screenWidth=window.innerWidth;
  if(this.screenWidth <= 768){
    this.collapsed = false;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
   }
}

  ngOnInit(): void {
  this.screenWidth=window.innerWidth;
}
  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }
  closeSidenav(): void {
    this.collapsed = false;
    this.onToogleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth })
  }

  toggleSubMenu(data: any) {
    this.isSubMenuVisible = !this.isSubMenuVisible;
    this.currentSubMenu = data;
  }

}
