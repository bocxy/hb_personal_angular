import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

export interface dataSource {

  v_Circle_Code:string,
  v_Circle_Name:string,
  v_Circle_Place:string,
  v_Address:string,
  n_Pincode:string,
  v_Phone:string,
  v_Email:string
}


@Component({
  selector: 'app-list-circle-data',
  templateUrl: './list-circle-data.component.html',
  styleUrls: ['./list-circle-data.component.scss']
})
export class ListCircleDataComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['SNo','v_Circle_Code', 'v_Circle_Name', 'v_Circle_Place','v_Address','n_Pincode','v_Phone','v_Email','action'];

  @ViewChild('officeSelect') officeSelect!: MatSelect;

  ngAfterViewInit(): void {
    this.officeSelect.value = 'circleoffice';
   }
    selectedValue: string[] = [];
    types: string[] = ['Option 1', 'Option 2', 'Option 3'];
    errorMessage: string | null = null;

    // selectedValue: string;
    selectedStatus: string;
    noData = false;
    couponsListData: any;
    filteredData: any[];

    constructor(public dialog: MatDialog, private snackbar: MatSnackBar, private router: Router,private employeeService:EmployeeService,) {

      this.getAllCircleOffices();
     }

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

    getAllCircleOffices() {
      const id = 123;
      this.employeeService.getAllCircleOffices(id).subscribe(
        (response:any) => {
          console.log('Response:', response);

          if (response && Array.isArray(response.data)) {
            this.dataSource.data = response.data;
          } else {
            console.error('Invalid response format or missing data array.');
          }
        },
        (error:any) => {
          console.error('Error:', error);
        }
      );
    }

    Delete(id: number): void {


        this.employeeService.deleteCircleOffice(id)
          .subscribe(
            () => {
              alert('The Circle office data was Deleted successfully!');
              window.location.reload();

            },
            error => {
              console.log(error);
            });
      }


}
