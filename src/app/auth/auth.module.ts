import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { AuthComponent } from './auth.component';
const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      { path: 'login', component: LoginComponent },
    ]
  }
]
@NgModule({
  declarations: [LoginComponent, AuthComponent],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule.forChild(routes), ReactiveFormsModule
  ]
})
export class AuthModule { }
