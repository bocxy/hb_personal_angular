import { Component, Input, OnInit } from '@angular/core';
import { navModel } from './helper';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-sublevel-menu',
  template: `
    <ul *ngIf="collapsed && data.subItems && data.subItems.length > 0" [@submenu]="expanded
? {value: 'visible', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '*'}}
: {value: 'hidden', params: {transitionParams: '400ms cubic-bezier(0.86, 0, 0.07, 1)', height: '0'}}" class="sublevel-nav">
<li *ngFor="let item of data.subItems" class="sublevel-nav-item">
<a class="sublevel-nav-link" [routerLink]="[item.routeLink]"
routerLinkActive="active-sublevel"
[routerLinkActiveOptions]="{exact: true}" (click)="handleClick(item)" *ngIf="item. subItems && item. subItems. length> 0" >
<i class="sublevel-link-icon fa fa-circle"></i>
<span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
<mat-icon *ngIf="data.subItems && collapsed" class="menu-collapse-icon">{{!data.expanded? 'chevron_right': 'expand_more'}}</mat-icon>

</a>
<a class="sublevel-nav-link"
*ngIf="!item.subItems || (item.subItems && item.subItems.length === 0)"
[routerLink]="[item.routeLink]"
routerLinkActive="active-sublevel"
[routerLinkActiveOptions]="{exact: true}" >
<i class="sublevel-link-icon fa fa-circle"></i>
<span class="sublevel-link-text" *ngIf="collapsed">{{item.label}}</span>
</a>
<div *ngIf="item.subItems && item.subItems.length > 0">
<app-sublevel-menu
[collapsed]="collapsed"
[multiple]="multiple"
[expanded]="item.expanded"
></app-sublevel-menu>
</div>
</li>
</ul>
  `,
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('submenu', [
      state('hidden', style({
        height: '0',
        overflow: 'hidden'
      })),
      state('visible', style({
        height: '*'
      })),
      transition('visible <=> hidden', [style({ overflow: 'hidden' }),
      animate('{{transitionParams}}')]),
      transition('void => *', animate(0))
    ])
  ]
})
export class SublevelMenuComponent implements OnInit {

  @Input() data: navModel = {
    routeLink: '',
    icon: '',
    label: '',
    subItems: []
  }
  @Input() collapsed = false;
  @Input() animating: boolean | undefined;
  @Input() expanded: boolean | undefined;
  @Input() multiple: boolean | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  handleClick(item: any): void {
    if (!this.multiple) {
      if (this.data.subItems && this.data.subItems.length > 0) {
        for (let modelItem of this.data.subItems) {
          if (item !== modelItem && modelItem.expanded) {
            modelItem.expanded = false;
          }
        }
      }
      item.expanded = item.expanded;
    }
  }
}
