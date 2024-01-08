import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialogComponent } from '../shared-module/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-office-data',
  templateUrl: './office-data.component.html',
  styleUrls: ['./office-data.component.scss']
})
export class OfficeDataComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  selectedValue: string[] = [];
  types: string[] = ['Option 1', 'Option 2', 'Option 3'];
  errorMessage: string | null = null;

  constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.dataSource.data = [];
  }

  
}
