import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  constructor(  private router: Router,  public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
   ) {
    console.log('DATA',data);
    
    }

  ngOnInit(): void {
  }
  onConfirmClick(): void {
    this.dialogRef.close(true);
    // this.router.navigate([], { queryParamsHandling: 'merge' });
  }

  

  onCancelClick(): void {
    this.dialogRef.close(false);
  }


}
