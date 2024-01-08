import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

export interface dataSource {

  v_Office_Code:string,
  v_HeadOffice_Name:string,
  v_HeadOffice_Place:string,
  v_Address:string,
  n_Pincode:string,
  v_Phone:string,
  v_Email:string
}

@Component({
  selector: 'app-list-head-data',
  templateUrl: './list-head-data.component.html',
  styleUrls: ['./list-head-data.component.scss']
})
export class ListHeadDataComponent  {

  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['SNo','v_Office_Code', 'v_HeadOffice_Name', 'v_HeadOffice_Place','v_Address','n_Pincode','v_Phone','v_Email','action'];
  @ViewChild('officeSelect') officeSelect!: MatSelect;

  ngAfterViewInit(): void {
    this.officeSelect.value = 'headoffice';
  }

  constructor(private router: Router,private employeeService:EmployeeService,){
    this.getAllHeadOffice();
  }
  exportExcel() {

  }
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllHeadOffice() {
    const id = 123;
    this.employeeService.getAllHeadOffice(id).subscribe(
      (response) => {
        console.log('Response:', response);

        if (response && Array.isArray(response.data)) {
          this.dataSource.data = response.data;
        } else {
          console.error('Invalid response format or missing data array.');
        }
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  Delete(id: number): void {


    this.employeeService.deleteHeadOffice(id)
      .subscribe(
        () => {
          alert('The HeadOffice data was Deleted successfully!');
          window.location.reload();

        },
        error => {
          console.log(error);
        });
  }


}
