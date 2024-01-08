import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StaffreportComponent } from './staffreport.component';
import { AgGridModule } from '@ag-grid-community/angular';


const routes: Routes = [

  {
    path: 'staffreport',
    component: StaffreportComponent,
    children: [
      { path: 'list', component: StaffreportComponent }
    ]
  },

]


@NgModule({
  declarations: [StaffreportComponent, ],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FormsModule,
    AgGridModule

  ],
  providers: [  ]

})

export class  StaffreportModule { }
