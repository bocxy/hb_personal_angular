import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

export interface AdditionalRows {
  sno: number;
  empId: string;
  empName: string;
  cadCode: string;
  cadName : string;
  fileNo:string;
  fileSts:string;
  action: string;
  
}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
 
  columnsToDisplay = ['sno', 'employeeId', 'employeeName', 'cadreCode', 'cadreName', 'fileNo', 'fileStatus', 'action'];

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
  id: any;

  // columns = [
  //   { columnDef: 'sno', header: 'S.No',    cell: (element: any) => element['sno'] },
  //   { columnDef: 'empId',     header: 'Emp Id',   cell: (element: any) => 'empId'     },
  //   { columnDef: 'empName',   header: 'Employee Name', cell: (element: any) => `${element.weight}`   },
  //   { columnDef: 'cadCode',   header: 'Cade Code', cell: (element: any) => `${element.symbol}`   },
  //   { columnDef: 'cadName', header: 'Cade Name',    cell: (element: any) => element['sno'] },
  //   { columnDef: 'cadCate',     header: 'Cade Category',   cell: (element: any) => 'empId'     },
  //   { columnDef: 'preOffCode',   header: 'Present Office Code', cell: (element: any) => `${element.weight}`   },
  //   { columnDef: 'tranOffcCode',   header: 'Transfer Office Code', cell: (element: any) => `${element.symbol}`   },
  // ];
 

  
  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, private dialog: MatDialog,) { }


  additionalRows: AdditionalRows[] = [
    
  ];
  
  
  ngOnInit(): void {
    this.dataSource.data = [];
    this.dataSource.data = this.couponsListData;
    this.filteredData = [];
    this.noData = true;
    this.dataSource.data = [...this.dataSource.data, ...this.additionalRows];
    this.noData = this.dataSource.data.length === 0;


   this.getAllEmpFile();

   this.activeRoute.paramMap.subscribe(params => {
    this.id = params.get('id');
    this.deleteEmpFile;
   
    console.log(this.id)
  });
    
  }

  openExportDialog(): void {

  }

  generateExcel(headers: string[]) {

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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

  getAllEmpFile(): void {
    const id = 123; // Replace with the actual employee ID
    this.employeeService.getAllEmpFile(id).subscribe(
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


  deleteEmpFile(id: number) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure to delete this file data?',
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
        this.employeeService.deleteEmpFile(id).subscribe(
          () => {
            // Data successfully deleted, no specific 'success' property
            this.openDialog(true, 'Exam data deleted successfully!');
            this.getAllEmpFile(); // Refresh the data after successful deletion
          
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
