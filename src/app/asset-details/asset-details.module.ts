import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AssetDetailsComponent } from './asset-details.component';
import { ListComponent } from './list/list.component';
import { ViewComponent } from './view/view.component';
import { MaterialModule } from '../material.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { View2Component } from './view2/view2.component';
import { AddComponent } from './add/add.component';
import { AddImmovableComponent } from './add-immovable/add-immovable.component';
import { EditMovableComponent } from './edit-movable/edit-movable.component';
import { EditImmovableComponent } from './edit-immovable/edit-immovable.component';
import { DialogComponent } from './dialog/dialog.component';




const routes: Routes = [

  {
    path: 'asset-details',
    component: AssetDetailsComponent,
    children: [
      { path: 'list', component: ListComponent },
      { path: 'view/:id', component: ViewComponent },
      { path: 'view2/:id', component: View2Component },
      { path: 'add', component: AddComponent },
      { path: 'add-immovable', component: AddImmovableComponent },
      { path: 'edit-movable/:id', component: EditMovableComponent },
      { path: 'edit-immovable/:id', component: EditImmovableComponent }
    
    ]
  }
]

@NgModule({
  declarations: [AssetDetailsComponent, ViewComponent, ListComponent, View2Component, AddComponent, AddImmovableComponent, EditMovableComponent, EditImmovableComponent, DialogComponent],
  imports: [
    CommonModule,
    MaterialModule,
    MatIconModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class AssetDetailsModule { }
