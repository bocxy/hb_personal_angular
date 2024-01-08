import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpPayComponent } from './emp-pay.component';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { PopupComponent } from './popup/popup.component';



const routes: Routes = [

  {
    path: 'emp-pay',
    component: EmpPayComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent }
    ]
  }
]

@NgModule({
  declarations: [EmpPayComponent, ViewComponent, ListComponent, AddComponent, EditComponent, PopupComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class EmpPayModule { }
