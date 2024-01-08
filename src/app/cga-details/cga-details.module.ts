import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CgaDetailsComponent } from './cga-details.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [

  {
    path: 'cga-details',
    component: CgaDetailsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent }
    ]
  }
]

@NgModule({
  declarations: [CgaDetailsComponent, ViewComponent, ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class CgaDetailsModule { }
