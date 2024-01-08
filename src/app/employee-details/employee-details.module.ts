import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { EmployeeDetailsComponent } from './employee-details.component';
import { AddeditEmpComponent } from './addedit-emp/addedit-emp.component';
import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  {
    path: 'employee',
    component: EmployeeDetailsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component: AddeditEmpComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'edit/:id', component: EditComponent },
     


    ]
  }
]
@NgModule({
  declarations: [EmployeeDetailsComponent, ListComponent,AddeditEmpComponent, ViewComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class EmpDetModule { }
