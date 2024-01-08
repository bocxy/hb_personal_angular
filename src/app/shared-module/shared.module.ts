import { NgModule } from "@angular/core";
import { MaterialModule } from "../material.module";
import { ChartComponent } from "./chart/chart.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CreatedAtSortPipe } from './created-at.pipe';
import { ExcelMapComponent } from './excel-map/excel-map.component';

@NgModule({
    declarations: [
        ChartComponent,SnackbarComponent, ConfirmDialogComponent, CreatedAtSortPipe, ExcelMapComponent
    ],
    exports: [
        ChartComponent,SnackbarComponent,ConfirmDialogComponent,CreatedAtSortPipe,ExcelMapComponent
    ],
    imports: [
        MaterialModule,FormsModule,CommonModule
    ]
})
export class SharedModule { }