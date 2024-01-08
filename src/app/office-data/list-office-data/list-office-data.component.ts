
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';



@Component({
  selector: 'app-list-office-data',
  templateUrl: './list-office-data.component.html',
  styleUrls: ['./list-office-data.component.scss']
})
export class ListOfficeDataComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);

  
  columnsToDisplay = ['sno', 'offcode', 'offceName', 'headOfOff', 'OffcLoc', 'address', 'pincode', 'phone', 'email','action'];


    selectedValue: string[] = [];
    types: string[] = ['Option 1', 'Option 2', 'Option 3'];
    errorMessage: string | null = null;

    // selectedValue: string;
    selectedStatus: string;
    noData = false;
    couponsListData: any;
    filteredData: any[];
  
    constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router) { }
  
    ngOnInit(): void {
      this.dataSource.data = [];
      this.filteredData= [];
    }
  
    openExportDialog(): void {
      // Implement your logic for opening the export dialog here.
    }
  
    generateExcel(headers: string[]): void {
      // Implement your logic for generating Excel here.
    }
  
    applyFilter(filterValue: string): void {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
  
    delete(id: string): void {
      const dialog = this.dialog.open(ConfirmDialogComponent, {
        width: '250px',
        data: {
          from: 'delete',
        }
      });
  
      dialog.afterClosed().subscribe(data => {
        if (data) {
          // Handle deletion logic here.
        }
      });
    }
  
    edit(type: string, id: string): void {
      this.router.navigate(['/coupon/' + type, id]);
    }


    applyTypeFilter() {
      if (this.selectedStatus?.length || this.selectedValue?.length) {
        this.filteredData = this.dataSource.data.filter(item => {
          // Check if the item's category is included in the selectedValue array
          if (this.selectedValue?.length && !this.selectedValue?.includes(item.type[0])) {
            return false;
          }
  
          // Check if the item's colour is included in the selectedColourValue array
          if (this.selectedStatus?.length && !this.selectedStatus?.includes(item.couponStatus[0])) {
            return false;
          }
          // If the item passed both filters, return true
          return true;
        });
      } else {
        this.filteredData = [];
        this.dataSource.data = this.couponsListData;
      }
  
    }
  
}
