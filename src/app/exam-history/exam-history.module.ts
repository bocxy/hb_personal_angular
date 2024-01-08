import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamHistoryComponent } from './exam-history.component';
import { ListComponent } from './list/list.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewComponent } from './view/view.component';

import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DialogComponent } from './dialog/dialog.component';


const routes: Routes = [
  {
    path: 'exam-history',
    component: ExamHistoryComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component:  ViewComponent},
      { path: 'add', component:  AddComponent},
      { path: 'edit/:id', component:  EditComponent},
      { path: 'confirm-dialog', component:  ConfirmDialogComponent},
    ]
  }
]
@NgModule({
  declarations: [ExamHistoryComponent, ListComponent,ViewComponent, AddComponent, EditComponent, ConfirmDialogComponent, DialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})

export class ExamHistoryModule { }
