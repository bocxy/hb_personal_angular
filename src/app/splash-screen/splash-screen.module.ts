import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashScreenComponent } from './splash-screen.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [SplashScreenComponent],
  imports: [CommonModule,MaterialModule],
  exports: [SplashScreenComponent],
})
export class SplashScreenModule {}
