import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AddEditLeaveComponent } from './add-edit-leave/add-edit-leave.component';
import { LeaveComponent } from './leave.component';
import { ListComponent } from './list/list.component';

import { ViewComponent } from './view/view.component';
import { EditComponent } from './edit/edit.component';
const routes: Routes = [
  {
    path: 'leave',
    component: LeaveComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'add', component:AddEditLeaveComponent  },
      { path: 'edit/:id', component: EditComponent },
      { path: 'view/:id', component:ViewComponent  },

    ]
  }
]
@NgModule({
  declarations: [LeaveComponent, AddEditLeaveComponent, ListComponent,  ViewComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class LeaveModule { }
