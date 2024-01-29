import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatExpansionPanel } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
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
  // cadCate:string;
  action: string;

}


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  panelOpenState: boolean = false;


  dataSource = new MatTableDataSource<any>([]);


  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[] = [];
  selectedData: any;
  id: any;
  data: any;

  selectedFilter: string = '';
  familyDetailFrmGrp: FormGroup;


  columnsToDisplay = ['sno', 'empId', 'empName', 'cadreCode', 'cadreName', 'action'];

  row: any;



  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService: EmployeeService, private http: HttpClient, private dialog: MatDialog,) { }


  additionalRows: AdditionalRows[] = [

  ];


  ngOnInit(): void {
    this.getAllEmpFamilyDetails();

    this.dataSource.data = [];
    this.dataSource.data = this.couponsListData;
    this.filteredData = [];
    this.noData = true;
    this.dataSource.data = [...this.dataSource.data, ...this.additionalRows];
    this.noData = this.dataSource.data.length === 0;

    this.familyDetailFrmGrp = this.fb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      remarks: [''],

    })


    this.activeRoute.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.deleteEmpFamilyDetails;

      console.log(this.id)
    });



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
        this.getEmpFamilyDetailsBynId(filteredData[0].empId);
      }
    }
  }

  togglePanel(panel: MatExpansionPanel): void {
    panel.toggle();
  }

  openExpansionPanel(empId: string): void {
    // Load details for the selected empId
    this.getEmpFamilyDetailsBynId(+empId);
  }

  getEmpFamilyDetailsBynId(empId: number) {
    this.employeeService.getEmpFamilyDetailsBynId(empId).subscribe(
      (response) => {
        this.data = response.data.employee[0];
        // Update your form group or any other logic to show the details
        this.familyDetailFrmGrp.patchValue({
          empId: this.data.empId,
          empName: this.data.empName,
          cadreCode: this.data.cadreCode,
          cadreName: this.data.cadreName,
          dateOfBirth: this.data.dateOfBirth,
          dateOfJointService: this.data.dateOfJointService,
          remarks: this.data.remarks
        });
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  columnsToDisplayMainTable = ['sno', 'empId', 'empName', 'action'];
  expandedElement: any | null;
  expandRow(row: any): void {
    this.expandedElement = this.expandedElement === row ? null : row;
  }

  clearFilter(): void {
    this.dataSource.filter = '';
    (document.getElementById('search-input') as HTMLInputElement).value = '';
    this.getAllEmpFamilyDetails();
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


  getAllEmpFamilyDetails(): void {
    const id = 123;
    this.employeeService.getAllEmpFamilyDetails(id).subscribe(
      (response: any) => {
        const mergedArray = response.data.employee.map(item1 => {
          const correspondingItem = response.data.members.find(item2 => item2.empId === item1.empId);
          return { ...item1, ...correspondingItem };
        });
        console.log(mergedArray)
        this.dataSource.data = response.data.employee.map((employee: any) => ({
          empId: employee.empId,
          empName: employee.empName,
          cadreCode: employee.cadreCode,
          cadreName: employee.cadreName,
          nid: employee.nid,
          members: response.data.members.filter((member: any) => member.empId === employee.empId)
        }));

        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  printScreen(): void {
    window.print();
  }

  deleteEmpFamilyDetails(id: number) {
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
        this.employeeService.deleteEmpFamilyDetails(id).subscribe(
          () => {
            // Data successfully deleted, no specific 'success' property
            this.openDialog(true, 'Exam data deleted successfully!');
            this.getAllEmpFamilyDetails(); // Refresh the data after successful deletion

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
