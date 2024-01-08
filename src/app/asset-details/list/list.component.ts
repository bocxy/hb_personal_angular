import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';
import { DialogComponent } from '../dialog/dialog.component';


export interface AdditionalRows {
  sno: number;
  empId: string;
  empName: string;
  cadCod: string;
  cadName : string;
  movImmov:string;
  action: string;

}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {
  
  id:any;
  data:any;
  myForm: FormGroup;
  

  examHistoryFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  couponId: string;
  view = false;
  employeeListData: any;


  dataSource = new MatTableDataSource<any>([]);
  

  columnsToDisplay = ['sno', 'empId', 'empName', 'cadreCode', 'cadreName', 'moveImmove', 'action'];

   status = [
    { 'status': "Movable", 'value': true },
    { 'status': "Immovable", 'value': false }
  ]
  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[];
 
  // columns = [
  //   { columnDef: 'sno', header: 'S.No',    cell: (element: any) => element['sno'] },
  //   { columnDef: 'empId',     header: 'Emp Id',   cell: (element: any) => 'empId'     },
  //   { columnDef: 'empName',   header: 'Employee Name', cell: (element: any) => `${element.weight}`   },
  //   { columnDef: 'cadCode',   header: 'Cade Code', cell: (element: any) => `${element.symbol}`   },
  //   { columnDef: 'cadName', header: 'Cade Name',    cell: (element: any) => element['sno'] },
  //   { columnDef: 'movImmov',     header: 'Cade Category',   cell: (element: any) => 'empId'     },
  //   { columnDef: 'action',   header: 'Present Office Code', cell: (element: any) => `${element.weight}`   },
  //   { columnDef: 'tranOffcCode',   header: 'Transfer Office Code', cell: (element: any) => `${element.symbol}`   },
  // ];
 

  constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router, private employeeService:EmployeeService) {
    
    // this.dataSource= new MatTableDataSource([{ sno: 1, empId: '12345', empName: 'John Doe', cadCod: '12AS', cadName: 'Part', movImmov: 'movable', action:'view'},
    // { sno: 2, empId: '12346', empName: 'John', cadCod: '12BS', cadName: 'PartA', movImmov: 'Immovable', action:'next'}]);
   }

 
  
  
  ngOnInit(): void {
    // this.dataSource.data = [];
    // this.dataSource.data = this.couponsListData;
    this.filteredData = [];
    this.noData = true;
    let tableData=[];
    this.getAllEmployeeMovableDetails();
    this.getAllEmployeeImmovableDetails();

    
    this.dataSource.data = [];
    this.dataSource.data = this.couponsListData;
    this.filteredData = [];
    this.noData = true;
    this.noData = this.dataSource.data.length === 0;
  

    
    
    // tableData=[
    //   { sno: 1, empId: '12345', empName: 'John Doe', ca dCod: '12AS', cadName: 'Part', movImmov: 'movable', action:'view'},
    //   { sno: 2, empId: '12346', empName: 'John', cadCod: '12BS', cadName: 'PartA', movImmov: 'Immovable', action:'next'},
    //   // Add more data for additional rows as needed
    // ];
    
    // this.dataSource.data = [...this.dataSource.data, ...this.additionalRows];
    // this.dataSource.data = tableData;

    // this.noData = this.dataSource.data.length === 0;
    
  }

  getAllEmployeeMovableDetails(): void {
    const id = 1; // Replace with the actual employee ID
    this.employeeService.getAllEmployeeMovableDetails(id).subscribe(
      (response) => {
        // Handle the response here, e.g., update your component's data
        console.log(response);

        if (response && Array.isArray(response.data)) {
          this.dataSource.data = this.dataSource.data.concat(response.data);
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


  
  getAllEmployeeImmovableDetails(): void {
    const id = 1; // Replace with the actual employee ID
    this.employeeService.getAllEmployeeImmovableDetails(id).subscribe(
      (response) => {
        // Handle the response here, e.g., update your component's data
        console.log(response);

        if (response && Array.isArray(response.data)) {
          this.dataSource.data = this.dataSource.data.concat(response.data);
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

  goToView(request:any){
    if(request && request.movImmov=='Immovable'){
      this.router.navigateByUrl('/asset-details/view2');
    }else{
      
      this.router.navigateByUrl('/asset-details/view');

    }
  }

  deleteEmpImmovable(id: any) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure to delete this asset details data?',
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
        this.employeeService.deleteEmpImmovable(id).subscribe(
          () => {
            // Data successfully deleted, no specific 'success' property
            this.openDialog(true, 'Exam data deleted successfully!');
            // this.getAllEmployeeMovableDetails();
            // this.getAllEmployeeImmovableDetails();

          
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

  deleteEmpMovable(id: any) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure to delete this asset details data?',
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
        this.employeeService.deleteEmpMovable(id).subscribe(
          () => {
            // Data successfully deleted, no specific 'success' property
            this.openDialog(true, 'Exam data deleted successfully!');
            // this.getAllEmployeeMovableDetails();
            // this.getAllEmployeeImmovableDetails();
            this.router.navigate([], { queryParamsHandling: 'merge' });

          
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


  openDialog(arg0: boolean, arg1: string) {
    // Implement your own dialog logic or use MatSnackBar here
    // You can show success or error messages to the user
  }
  
}
