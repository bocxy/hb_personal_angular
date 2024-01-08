import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { OfficeDataComponent } from './office-data.component';
import { CreateOfficeDataComponent } from './create-office-data/create-office-data.component';
import { ListOfficeDataComponent } from './list-office-data/list-office-data.component';
import { MaterialModule } from '../material.module';
import { AddCircleOfficeComponent } from './add/add-circle-office/add-circle-office.component';
import { AddDivisionOfficeComponent } from './add/add-division-office/add-division-office.component';
import { AddHeadOfficeComponent } from './add/add-head-office/add-head-office.component';
import { EditCircleOfficeComponent } from './edit/edit-circle-office/edit-circle-office.component';
import { EditDivisionOfficeComponent } from './edit/edit-division-office/edit-division-office.component';
import { EditHeadOfficeComponent } from './edit/edit-head-office/edit-head-office.component';
import { ViewDivisionOfficeComponent } from './view/view-division-office/view-division-office.component';
import { ViewCircleOfficeComponent } from './view/view-circle-office/view-circle-office.component';
import { ViewHeadOfficeComponent } from './view/view-head-office/view-head-office.component';
import { ListCircleDataComponent } from './list/list-circle-data/list-circle-data.component';
import { ListDivisionDataComponent } from './list/list-division-data/list-division-data.component';
import { ListHeadDataComponent } from './list/list-head-data/list-head-data.component';

// const routes: Routes = [
//   {
//     path: 'office-data',
//     component: OfficeDataComponent,

//     children: [
//       { path: 'list', component: ListOfficeDataComponent },
//     ]
//   },
// ];

const routes: Routes = [
  {
    path: 'office-data',
    component: OfficeDataComponent,
    children: [
      { path:'add-circle-office', component: AddCircleOfficeComponent},
      { path:'add-division-office', component: AddDivisionOfficeComponent},
      { path:'add-head-office', component: AddHeadOfficeComponent},
      { path:'edit-circle-office/:id', component: EditCircleOfficeComponent},
      { path:'edit-division-office/:id', component: EditDivisionOfficeComponent},
      { path:'edit-head-office/:id', component: EditHeadOfficeComponent},
      { path:'view-head-office/:id', component: ViewHeadOfficeComponent},
      { path:'view-division-office/:id', component: ViewDivisionOfficeComponent},
      { path:'view-circle-office/:id', component: ViewCircleOfficeComponent},
      { path:'list-circle-office', component: ListCircleDataComponent},
      { path:'list-division-office', component: ListDivisionDataComponent},
      { path:'list-head-office', component: ListHeadDataComponent},


    ]
  }
]

@NgModule({
  declarations: [OfficeDataComponent, ListOfficeDataComponent, CreateOfficeDataComponent, AddCircleOfficeComponent, AddDivisionOfficeComponent, AddHeadOfficeComponent,
    EditCircleOfficeComponent,EditDivisionOfficeComponent,EditHeadOfficeComponent,ViewHeadOfficeComponent,ViewDivisionOfficeComponent,ViewCircleOfficeComponent,
    ListCircleDataComponent, ListDivisionDataComponent, ListHeadDataComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule

  ],
})
export class OfficeModule {}
