import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { EmpNominiComponent } from './emp-nomini.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { MatSelectModule } from '@angular/material/select';


const routes: Routes = [

  {
    path: 'emp-nomini',
    component: EmpNominiComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent }
    ]
  }
]

@NgModule({
  declarations: [EmpNominiComponent, ViewComponent, ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class EmpNominiModule { }
