import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SplashScreenModule } from './splash-screen/splash-screen.module';
import { SidenavComponent } from './navbar/sidenav/sidenav.component';
import { HeadersComponent } from './headers/headers.component';
import { MaterialModule } from './material.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { BodyComponent } from './body/body.component';
import { CellFileModule } from './cell-file/cell-file.module';
import { EmployeeService } from './services/employee.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';



@NgModule({
  declarations: [
    AppComponent,SidenavComponent,HeadersComponent, BodyComponent, ConfirmDialogComponent, ],

  imports: [
   CommonModule,
    AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,
    SplashScreenModule,MaterialModule, MatInputModule,
    MatSelectModule, NgbModule, BrowserModule, MatIconModule, CellFileModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
