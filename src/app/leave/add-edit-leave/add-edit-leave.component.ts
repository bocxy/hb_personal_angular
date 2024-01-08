import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-edit-leave',
  templateUrl: './add-edit-leave.component.html',
  styleUrls: ['./add-edit-leave.component.scss']
})
export class AddEditLeaveComponent implements OnInit {
  leaveFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {
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

  onSubmit() {
    
    if (this.leaveFormGrp.valid) {
      console.log("Working1")
      let data={
        "employeeId": this.leaveFormGrp.value.employeeId,
        "employeeName": this.leaveFormGrp.value.employeeName,
        "date": this.leaveFormGrp.value.date,
        "gender": this.leaveFormGrp.value.gender,
        "cadreCode": this.leaveFormGrp.value.cadreCode,
        "cadreName": this.leaveFormGrp.value.cadreName,
        "modeOfLeave": this.leaveFormGrp.value.modeOfLeave,
        "noOfDaysApplied": this.leaveFormGrp.value.noOfDaysApplied,
        "leaveAvailable": this.leaveFormGrp.value.leaveAvailable,
        "leaveStartDate": this.leaveFormGrp.value.leaveStartDate,
        "category": this.leaveFormGrp.value.category,
        "leaveEndDate": this.leaveFormGrp.value.leaveEndDate,
        "leaveBalance": this.leaveFormGrp.value.leaveBalance,
        "exemptedDays": this.leaveFormGrp.value.exemptedDays,
        "leavePurpose": this.leaveFormGrp.value.leavePurpose,
        "dateOfJoin":  this.leaveFormGrp.value.dateOfJoin,
       
        
    }
      // this.employeeService.saveEmpExamHistory(this.leaveFormGrp.value).subscribe(
        this.employeeService.applyForLeave(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/leave/list']);
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

}
