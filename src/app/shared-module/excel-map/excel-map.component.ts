import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-excel-map',
  templateUrl: './excel-map.component.html',
  styleUrls: ['./excel-map.component.scss']
})
export class ExcelMapComponent {
  headerMap: string[];

  constructor(
  public dialogRef: MatDialogRef<ExcelMapComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { headers: string[], dataSource: any[] }
  ) {
    this.headerMap = new Array<string>(this.data.headers.length);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
