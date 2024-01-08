import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

export interface Leave {
 
    sno: number;
    date: any;
    employeeId: number;
    employeeName: string;
    modeOfLeave: string;
    leaveStartDate: string;
    leaveEndDate: string;
    noOfDaysApplied: string;
    status: string;
    action: string;
  
}



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  dataSource = new MatTableDataSource<any>([]);
  columnsToDisplay = ['sno', 'date', 'employeeId', 'employeeName', 'modeOfLeave', 'leaveStartDate', 'leaveEndDate', 'noOfDaysApplied', 'status', 'action'];

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
  
  // dataSource =ELEMENT_DATA;
  
  
  
  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, private dialog: MatDialog,) { }


  // dataSource = ELEMENT_DATA;

  ngOnInit(): void {
    this.dataSource.data = [];
    this.filteredData = [];
    this.noData = true;

    this.getAllLeaveRecord();
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

  
  getAllLeaveRecord(): void {
    const id = 123; // Replace with the actual employee ID
    this.employeeService.getAllLeaveRecord(id).subscribe(
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

}
// const ELEMENT_DATA: any[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
// ]
