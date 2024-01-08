import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CgaRegisterComponent } from './cga-register.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [

  {
    path: 'cga-register',
    component: CgaRegisterComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent }

    ]
  }
]

@NgModule({
  declarations: [CgaRegisterComponent, ViewComponent, ListComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class CgaRegisterModule { }
