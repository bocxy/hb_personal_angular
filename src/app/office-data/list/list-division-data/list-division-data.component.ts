import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSelect } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

export interface dataSource {
  N_ID:number,
  v_Division_Code:string,
  v_Division_Name:string,
  v_Division_Place:string,
  v_Address:string,
  n_Pincode:string,
  v_Phone:string,
  v_Email:string
}

@Component({
  selector: 'app-list-division-data',
  templateUrl: './list-division-data.component.html',
  styleUrls: ['./list-division-data.component.scss']
})
export class ListDivisionDataComponent {

  id:any;
  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['SNo','v_Division_Code', 'v_Division_Name', 'v_Division_Place','v_Address','n_Pincode','v_Phone','v_Email','action'];
  @ViewChild('officeSelect') officeSelect!: MatSelect;

  ngAfterViewInit(): void {
    // this.officeSelect.value = 'divisionoffice';
  }

  constructor(private router: Router,private employeeService:EmployeeService,){
    this.getAllDivisions();
  }
  exportExcel() {

  }
  applyFilter(filterValue: string): void {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getAllDivisions() {
    const id = 123;
    this.employeeService.getAllDivisions(id).subscribe(
      (response) => {
        console.log('Response:', response);

        if (response && Array.isArray(response.data)) {
          this.dataSource.data = response.data;
          console.log(this.dataSource.data)
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


    this.employeeService.deleteDivisionOffice(id)
      .subscribe(
        () => {
          alert('The Division office data was Deleted successfully!');
          window.location.reload();

        },
        error => {
          console.log(error);
        });
  }


}
