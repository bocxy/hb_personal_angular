import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FamilyDetailsComponent } from './family-details.component';
import { ViewComponent } from './view/view.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PersonComponent } from './person/person.component';
import { AddComponent } from './add/add.component';
import { EditComponent } from './edit/edit.component';
import { MatSelectModule } from '@angular/material/select';


const routes: Routes = [

  {
    path: 'family-details',
    component: FamilyDetailsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'person', component: PersonComponent },
      { path: 'add', component: AddComponent },
      { path: 'edit/:id', component: EditComponent },
    ]
  }
]

@NgModule({
  declarations: [FamilyDetailsComponent, ViewComponent, ListComponent, PersonComponent, AddComponent, EditComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    FormsModule,
    MatSelectModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class FamilyDetailsModule { }
