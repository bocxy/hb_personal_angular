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

  leaveFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  id:any;
  data:any;


 
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getLeaveRecordBynId();
     
      console.log(this.id)
    });
    
    this.leaveFormGrp = this.cb.group({
      employeeId:[''],
      employeeName:[''],
      date:[''],
      gender:[''],
      cadreCode:[''],
      cadreName:[''],
      modeOfLeave:[''],
      noOfDaysApplied:[''],
      leaveAvailable:[''],
      leaveStartDate:[''],
      category:[''],
      leaveEndDate:[''],
      leaveBalance:[''],
      exemptedDays:[''],
      leavePurpose:[''],
      dateOfJoin:['']

    })
  }

  getLeaveRecordBynId() {
    console.log(this.id);
    const nid =this.id;
        this.employeeService.getLeaveRecordBynId(nid).subscribe(
          (response) => {
      this.data=response.data;
      this.leaveFormGrp.patchValue({
        employeeId:this.data.employeeId,
        employeeName: this.data.employeeName,
        date: this.data.date,
        gender: this.data.gender,
        cadreCode: this.data.cadreCode,
        cadreName: this.data.cadreName,
        modeOfLeave: this.data.modeOfLeave,
        noOfDaysApplied:this.data.noOfDaysApplied,
        leaveAvailable:this.data.leaveAvailable,
        leaveStartDate: this.data.leaveStartDate,
        category: this.data.category,
        leaveEndDate: this.data.leaveEndDate,
        leaveBalance:this.data.leaveBalance,
        exemptedDays: this.data.exemptedDays,
        leavePurpose: this.data.leavePurpose,
        dateOfJoin:this.data.dateOfJoin,
        
               
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }
  


  onUpdate(id: number) {
    if (this.leaveFormGrp.valid) {
      const data = {
        // Include the ID of the existing record
        nid: this.id,
        employeeId: this.leaveFormGrp.value.employeeId,
        employeeName:this.leaveFormGrp.value.employeeName,
        date: this.leaveFormGrp.value.date,
        gender: this.leaveFormGrp.value.gender,
        cadreCode: this.leaveFormGrp.value.cadreCode,
        cadreName: this.leaveFormGrp.value.cadreName,
        modeOfLeave: this.leaveFormGrp.value.modeOfLeave,
        noOfDaysApplied: this.leaveFormGrp.value.noOfDaysApplied,
        leaveAvailable: this.leaveFormGrp.value.leaveAvailable,
        leaveStartDate: this.leaveFormGrp.value.leaveStartDate,
        category: this.leaveFormGrp.value.category,
        leaveEndDate: this.leaveFormGrp.value.leaveEndDate,
        leaveBalance: this.leaveFormGrp.value.leaveBalance,
        exemptedDays: this.leaveFormGrp.value.exemptedDays,
        leavePurpose: this.leaveFormGrp.value.leavePurpose,
        dateOfJoin: this.leaveFormGrp.value.dateOfJoin,
        
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.applyForLeave(data).subscribe(
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
        this.getLeaveRecordBynId();
      }, 1000);
      this.router.navigate(['/leave/list']);

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
