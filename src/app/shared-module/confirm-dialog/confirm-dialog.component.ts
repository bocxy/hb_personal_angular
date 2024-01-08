import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss']
})
export class ConfirmDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
  public dialogRef: MatDialogRef<ConfirmDialogComponent>){
  }

  ngOnInit(): void {
    console.log(this.data.from)
  }
  confirmDelete(){
    this.dialogRef.close(true);
  }

  cancelDelete(){
    this.dialogRef.close(false);
  }
}
