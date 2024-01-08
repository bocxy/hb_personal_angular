import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';



@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  
  conductedBy = [
    { 'conductedBy': "TNPSC", 'value': true },
    { 'conductedBy': "AG", 'value': true },
    { 'conductedBy': "DOTE", 'value': true },
    { 'conductedBy': "Others", 'value': true },
   
  ]

  nameOfTest = [
    { 'nameOfTest': "Accounts Test Part-1", 'value': true },
    { 'nameOfTest': "PWD Account Test Part-1", 'value': true },
    { 'nameOfTest': "PWD Account Test Part-2", 'value': true },
    { 'nameOfTest': "Tamil eligibility Test", 'value': true },
    { 'nameOfTest': "Divisional Accountant Test", 'value': true },
    { 'nameOfTest': "Office Automation Test", 'value': true },
    { 'nameOfTest': "Others", 'value': true },
   
  ]
  
  selectedValue: string;
  selectedStatus: string;
  selectedTest:string;
  noData = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;

  examHistoryFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  employeeListData: any;
  id:any;
  data: any;

 

  // constructor(private cb: FormBuilder, private employeeService:EmployeeService, private router: Router) { }

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    
    
    this.examHistoryFormGrp = this.cb.group({
      empId:[''],
      empName:[''],
      cadreCode:[''],
      cadreName:[''],
      cadreCategory:[''],
      testCode:[''],
      registerNo:[''],
      dateOfExam:[''],
      bulletinNo:[''],
      bulletinDate:[''],
      bulletinPageNo:[''],
      monthYearOfExam:[''],
      indexRegNo:[''],
      examResultRef:[''],
      conductedBy:[''],
      nameOfTest:[''],
      remarks:[''],
    
    })
  }

  onSubmit() {
    
    if (this.examHistoryFormGrp.valid) {
      console.log("Working1")
      let data={
        "empId": this.examHistoryFormGrp.value.empId,
        "empName": this.examHistoryFormGrp.value.empName,
        "cadreCode": this.examHistoryFormGrp.value.cadreCode,
        "cadreName": this.examHistoryFormGrp.value.cadreName,
        "cadreCategory": this.examHistoryFormGrp.value.cadreCategory,
        "nameOfTest": this.examHistoryFormGrp.value.nameOfTest,
        "conductedBy": this.examHistoryFormGrp.value.conductedBy,
        "testCode": this.examHistoryFormGrp.value.testCode,
        "registerNo": this.examHistoryFormGrp.value.registerNo,
        "dateOfExam": this.examHistoryFormGrp.value.dateOfExam,
        "bulletinNo": this.examHistoryFormGrp.value.bulletinNo,
        "bulletinDate": this.examHistoryFormGrp.value.bulletinDate,
        "bulletinPageNo": this.examHistoryFormGrp.value.bulletinPageNo,
        "monthYearOfExam": this.examHistoryFormGrp.value.monthYearOfExam,
        "indexRegNo": this.examHistoryFormGrp.value.indexRegNo,
        "examResultRef":  this.examHistoryFormGrp.value.examResultRef,
        "remarks": this.examHistoryFormGrp.value.remarks,
        "createdOn": this.examHistoryFormGrp.value.createdOn,
        "updatedOn":  this.examHistoryFormGrp.value.updatedOn
        
    }
      // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
        this.employeeService.saveEmpExamHistory(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/exam-history/list']);
        },
        (error) => {
          // Handle errors (e.g., show an error message)
          console.error('Error saving data:', error);

          if (error.status === 400) {
            // Handle specific 400 Bad Request errors, if needed
            // You can display a more informative error message here.
          } else {
            // Handle other error cases (e.g., network issues)
            // Display a generic error message to the user.
            this.snackbar.open('An error occurred while saving data. Please try again later.', 'Dismiss', {
              duration: 5000, // Adjust the duration as needed
            });
          }
        }
      );
    }
  }  
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onButtonClicked(){

    // console.log(id);
    
    let empId=this.examHistoryFormGrp.value.empId ?JSON.parse(this.examHistoryFormGrp.value.empId):'' 
    this.employeeService.getCommonDetails(empId).subscribe(
      (response) => {
        console.log('id',this.id);
        
  this.data=response.data;
  this.examHistoryFormGrp.patchValue({
           
           
    // empName :this.data.employeeName,
    //         cadreCode:this.data.cadreCode,
    //         cadreName:this.data.cadreName,
    //         dateOfBirth:this.data.dateOfBirth,
    //         dateOfJointService:this.data.dateOfJointService,

    empName :this.data.employeeName,
            cadreCode:this.data.cadreCode,
            cadreName:this.data.cadreName,
            dateOfBirth:this.data.dateOfBirth,
            dateOfJointService:this.data.dateOfJointService,
           cadreCategory:this.data.cadreCategory
          });
  
        console.log('Response:', response);
  
      },
      (error) => {
  
        console.error('Error:', error);
  
      }
    );
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
  

  applyTypeFilter1(event:any) {
    debugger
    console.log('event',event);
    
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
  applyTypeFilter2(event:any) {
    let value=this.examHistoryFormGrp.controls['status'].value;
    debugger
    console.log('value',value);
    
  
  }




}
