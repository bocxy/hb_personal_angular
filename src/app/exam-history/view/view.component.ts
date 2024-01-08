import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id:any;
  data:any;
  myForm: FormGroup;
  details: any;
 
  
  examHistoryFormGrp: FormGroup;
  
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;
  onFileSelected: any;
  fileInput:any;


 
  
  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;

  baseUrl: any;
  examData: any;
  dataService: any;



  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }



  ngOnInit(): void {

    console.log("Working3");

    this.activeRoute.paramMap.subscribe(params => {
      console.log("Working4");
      this.id = params.get('id');
      this.getEmpExamHistoryById();
     
      console.log(this.id)
    });

    


    this.examHistoryFormGrp = this.fb.group({
      empId: [''],
      cadreName: [''],
      empName: [''],
      cadreCategory: [''],
      cadreCode: [''],
      conductedBy: [''],
      nameOfTest: [''],
      testCode: [''],
      registerNo  : [''],
      dateOfExam:[''],
      bulletinNo:[''],
      bulletinDate:[''],
      bulletinPageNo:[''],
      monthYearOfExam:[''],
      indexRegNo:[''],
      examResultRef:[''],
      remarks:[''],
         
    })
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

// getEmpExamHistoryById() {
//   console.log(this.id);
//       this.employeeService.getEmpExamHistoryById(this.id).subscribe(
//         (response) => {
//     this.data=response.data;
//           console.log('Response:', response);
    
//         },
//         (error) => {
    
//           console.error('Error:', error);
    
//         }
//       );
//     }

getEmpExamHistoryById() {
  console.log("Working5")
  this.employeeService.getEmpExamHistoryById(this.id).subscribe(
    (response) => {
      this.data = response.data; // Update 'data' with the response data

      this.examHistoryFormGrp.patchValue({
        empId:this.data.empId,
        cadreName: this.data.cadreName,
        empName: this.data.empName,
        cadreCategory: this.data.cadreCategory,
        cadreCode: this.data.cadreCode,
        conductedBy: this.data.conductedBy,
        nameOfTest: this.data.nameOfTest,
        testCode: this.data.testCode,
        registerNo: this.data.registerNo,
        dateOfExam: this.data.dateOfExam,
        bulletinNo: this.data.bulletinNo,
        bulletinDate: this.data.bulletinDate,
        bulletinPageNo: this.data.bulletinPageNo,
        monthYearOfExam: this.data.monthYearOfExam,
        indexRegNo: this.data.indexRegNo,
        examResultRef:this.data.examResultRef,
        remarks: this.data.remarks
      });
      console.log('Response:', response);
    },
    (error) => {
      console.error('Error:', error);
      // Handle the error, show an error message, etc.
    }
  );
}

}



