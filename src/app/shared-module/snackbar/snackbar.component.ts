import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.css']
})
export class SnackbarComponent implements OnInit {

  constructor(public snackBarRef: MatSnackBarRef<SnackbarComponent>, @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.dismiss()
    }, 10000);
  }

  dismiss(): void {
    this.snackBarRef.dismiss();
  }
}
