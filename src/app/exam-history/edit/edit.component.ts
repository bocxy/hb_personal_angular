import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  id:any;
  data:any;
  myForm: FormGroup;
  idToEdit:number;

  conductedBy = [
    { 'conductedBy': "TNPSC", 'value': true },
    { 'conductedBy': "Others", 'value': false },
   
  ]

  nameOfTest = [
    { 'nameOfTest': "Test-1", 'value': true },
    { 'nameOfTest': "Test-2", 'value': false },
   
  ]
  
  // personalForm: FormGroup;
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

 
  // constructor(private cb: FormBuilder, private employeeService:EmployeeService, private router: Router) { }

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

   

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getEmpExamHistoryById();
     
      console.log(this.id)
    });
    
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
    debugger
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
  

  getEmpExamHistoryById() {
    console.log(this.id);
        this.employeeService.getEmpExamHistoryById(this.id).subscribe(
          (response) => {
      this.data=response.data;
      this.examHistoryFormGrp.patchValue({
                empId:this.data.empId,
                cadreName: this.data.cadreName,
                empName: this.data.empName,
                cadreCategory: this.data.cadreCategory,
                cadreCode: this.data.cadreCode,
                conductedBy: this.data.conductedBy,
                nameOfTest: this.data.nameOfTest,
                testCode:this.data.testCode,
                registerNo:this.data.registerNo,
                dateOfExam: this.data.dateOfExam,
                bulletinNo: this.data.bulletinNo,
                bulletinDate: this.data.bulletinDate,
                bulletinPageNo:this.data.bulletinPageNo,
                monthYearOfExam: this.data.monthYearOfExam,
                indexRegNo: this.data.indexRegNo,
                examResultRef:this.data.examResultRef,
                remarks:this.data.remarks,
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }
    
      onUpdate(id: number) {
        if (this.examHistoryFormGrp.valid) {
          const updatedData = {
            // Include the ID of the existing record
            nid: this.id,
            empName: this.examHistoryFormGrp.value.empName,
            empId:this.examHistoryFormGrp.value.empId,
            cadreCode: this.examHistoryFormGrp.value.cadreCode,
            cadreName: this.examHistoryFormGrp.value.cadreName,
            cadreCategory: this.examHistoryFormGrp.value.cadreCategory,
            nameOfTest: this.examHistoryFormGrp.value.nameOfTest,
            conductedBy: this.examHistoryFormGrp.value.conductedBy,
            testCode: this.examHistoryFormGrp.value.testCode,
            registerNo: this.examHistoryFormGrp.value.registerNo,
            dateOfExam: this.examHistoryFormGrp.value.dateOfExam,
            bulletinNo: this.examHistoryFormGrp.value.bulletinNo,
            bulletinDate: this.examHistoryFormGrp.value.bulletinDate,
            bulletinPageNo: this.examHistoryFormGrp.value.bulletinPageNo,
            monthYearOfExam: this.examHistoryFormGrp.value.monthYearOfExam,
            indexRegNo: this.examHistoryFormGrp.value.indexRegNo,
            examResultRef: this.examHistoryFormGrp.value.examResultRef,
            remarks: this.examHistoryFormGrp.value.remarks,
           
          };
         
            
           // Send an HTTP PUT request to update the data in the database
      this.employeeService.saveEmpExamHistory(updatedData).subscribe(
        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data updated:', response);

          // Fetch the updated data from the backend and update the form fields
          // this.getEmpExamHistoryById();

          // Optionally, you can display a success message.
          this.snackbar.open('Data updated successfully', 'Dismiss', {
            duration: 5000, // Adjust the duration as needed
          });

          setTimeout(() => {
            this.getEmpExamHistoryById();
          }, 1000);
          this.router.navigate(['/exam-history/list']);

        },
        (error) => {
          // Handle errors (e.g., show an error message)
          console.error('Error updating data:', error);

          if (error.status === 400) {
            // Handle specific 400 Bad Request errors, if needed
            // You can display a more informative error message here.
          } else {
            // Handle other error cases (e.g., network issues)
            // Display a generic error message to the user.
            this.snackbar.open('An error occurred while updating data. Please try again later.', 'Dismiss', {
              duration: 5000, // Adjust the duration as needed
            });
          }
        }
      );
    }
  }
      
        }


    
      
   
       

