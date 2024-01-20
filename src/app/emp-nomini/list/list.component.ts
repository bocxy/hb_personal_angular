import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
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
  cadreCode: string;
  cadreName: string;
  nameOfNominee ?: string;
  action: string;

}



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  dataSource = new MatTableDataSource<any>([]);

  columnsToDisplay = ['sno', 'empId', 'empName', 'cadreCode', 'cadreName',
  //  'nameOfNominee', 
   'action'];

  status = [
    { 'status': "Pending", 'value': true },
    { 'status': "Approved", 'value': false },
    { 'status': "Rejected", 'value': false }
  ]
  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[] = [];
  id: any;
  data: any;
  selectedFilter: string = '';
  empNmniFormGrp: FormGroup;


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


  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService: EmployeeService, private http: HttpClient, private dialog: MatDialog,) { }


  additionalRows: AdditionalRows[] = [

  ];


  ngOnInit(): void {
    this.dataSource.data = [];
    this.dataSource.data = this.couponsListData;
    this.filteredData = [];
    this.noData = true;
    this.dataSource.data = [...this.dataSource.data, ...this.additionalRows];
    this.noData = this.dataSource.data.length === 0;

    this.getAllEmpNomination();
    this.empNmniFormGrp = this.fb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      modeOfNominee: [''],
      // nameOfNominee: [''],
      relatinshipWithEmp: [''],
      ageOfNominee: [''],
      shareOfDcrg: [''],
      addressOfNominee: [''],

    })

    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.deleteEmpNomination;

      console.log(this.id)
    });


  }

  printScreen(): void {
    window.print();
  }

  openExportDialog(): void {

  }

  generateExcel(headers: string[]) {

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();

    if (this.selectedFilter === 'empId' || this.selectedFilter === 'empName' || this.selectedFilter === '') {
      const filteredData = this.dataSource.data.filter(item => {
        const empIdMatch = item.empId.toLowerCase().includes(filterValue);
        const empNameMatch = item.empName.toLowerCase().includes(filterValue);
        return this.selectedFilter === 'empId' ? empIdMatch : this.selectedFilter === 'empName' ? empNameMatch : empIdMatch || empNameMatch;
      });

      this.dataSource.data = filteredData;
      if (filteredData.length === 1) {
        this.getNominationBynId(filteredData[0].empId);
      }
    }
  }

  togglePanel(panel: MatExpansionPanel): void {
    panel.toggle();
  }

  openExpansionPanel(empId: string): void {
    // Load details for the selected empId
    this.getNominationBynId(+empId);
  }

  clearFilter(): void {
    this.dataSource.filter = '';
    (document.getElementById('search-input') as HTMLInputElement).value = '';
    this.getAllEmpNomination();
  }
  getNominationBynId(empId: number) {
    console.log(this.id);
    this.employeeService.getNominationBynId(empId).subscribe(
      (response) => {
        this.data = response.data.employee[0];
        this.empNmniFormGrp.patchValue({

          empId: this.data.empId,
          empName: this.data.empName,
          cadreCode: this.data.cadreCode,
          cadreName: this.data.cadreName,
          dateOfBirth: this.data.dateOfBirth,
          dateOfJointService: this.data.dateOfJointService,
          modeOfNominee: this.data.modeOfNominee,
          // nameOfNominee: this.data.nameOfNominee,
          relatinshipWithEmp: this.data.relatinshipWithEmp,
          ageOfNominee: this.data.ageOfNominee,
          shareOfDcrg: this.data.shareOfDcrg,
          addressOfNominee: this.data.addressOfNominee
        });

        console.log('Response:', response);

      },
      (error) => {

        console.error('Error:', error);

      }
    );
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



  getAllEmpNomination(): void {
    const id = 123; // Replace with the actual employee ID
    this.employeeService.getAllEmpNomination(id).subscribe({
      next: (response: any) => {
        if (response?.data) {
          const employeeData: any[] = response.data.employee;
          const nomineeData: any[] = response.data.nominee;
          const modifiedData = employeeData?.map((x) => {
            if (x) {
              x.nominee = nomineeData.filter((y) => x.empId === y.empId);
              return x;
            }
          });
          this.dataSource.data = [...modifiedData];
        } else {

        }
      }
    }

    );
  }

  deleteEmpNomination(id: number) {
    // Open the confirmation dialog
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure to delete this Nominee data?',
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
        this.employeeService.deleteEmpNominationInView(id).subscribe({
          next: (response: any) => {
            this.openDialog(true, 'Nominee data deleted successfully!');
            this.getAllEmpNomination(); // Refresh the data after successful deletion
          },
          error: (err: any) => {
            console.error('An error occurred:', err);
            this.openDialog(false, 'Error in deleting scheme data. Please try again later.');
          },
        });
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
