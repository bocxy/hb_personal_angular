import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([

  ]);

 
  columnsToDisplay = ['sno', 'cadreCode', 'cadreName', 'category', 'sanctioned', 'present', 'vacant','action'];

  types = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

  status = [
    { 'status': "Pending", 'value': true },
    { 'status': "Approved", 'value': false },
    { 'status': "Rejected", 'value': false }
  ]
  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[];
  presentInput: any;
request: any;

  constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router,private employeeService:EmployeeService) {

    this.getAllSanction();
   }

  ngOnInit(): void {
    this.dataSource.data = [];
    this.filteredData = [];
    this.noData = true;
  }

  getAllSanction(): void {
    const id = 123; // Replace with the actual employee ID
    this.employeeService.getAllSanctionRecord(id).subscribe(
      (response) => {
        // Handle the response here, e.g., update your component's data
        console.log(response);

        if (response && Array.isArray(response.data)) {
          this.dataSource.data = response.data;
        } else {
          console.error('Invalid response format or missing data array.');
        }
      },
      (error) => {
        // Handle any errors here
        console.error(error);
      }
    );
  }

  openExportDialog(): void {

  }

  generateExcel(headers: string[]) {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete(id: string): void {
    const dialog = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {
        from: "delete",
      }
    });
    dialog.afterClosed().subscribe(data => {
      if (data) {


      }
    })
  }

  edit(type, id) {
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


  

  deleteSanctionById(id: number) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure to delete this exam history data?',
        confirmBackgroundColor: 'red',
        cancelBackgroundColor: 'white',
        confirmTextColor: 'white',
        cancelTextColor: 'black',
        confirmText: 'Yes',
        cancelText: 'No',
        from: 'delete'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        // Call the delete service
        this.employeeService.deleteSanctionById(id).subscribe(
          () => {
            // Data successfully deleted, no specific 'success' property
            this.openDialog(true, 'Exam data deleted successfully!');
            this.getAllSanction(); // Refresh the data after successful deletion
          
          },
          (error) => {
            console.error('An error occurred:', error);
            this.openDialog(false, 'Error in deleting scheme data. Please try again later.');
            // Handle error (if needed)
          }
        );
      }
    });
  }
  
  hideLoadingIndicator() {
    // Implement your logic to hide the loading indicator here
    // You can use MatSnackBar or other methods to show messages or loading indicators
  }
  
  openDialog(arg0: boolean, arg1: string) {
    // Implement your own dialog logic or use MatSnackBar here
    // You can show success or error messages to the user
  }




  
}
