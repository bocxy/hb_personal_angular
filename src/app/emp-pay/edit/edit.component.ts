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

  payfixFrmGrp: FormGroup;
  data:any;
  id:any;
 
  types: string[] = [];
  submitted = false;

 
  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {

    this.payfixFrmGrp = this.fb.group({
      employeeId:[''],
      modeofpayFixation:[''],
      employeeName:[''],
      scaleOfpay:[''],
      gender:[''],
      basicPay:[''],
      cadreCode:[''],
      levelpaymatrix:[''],
      cadreName:[''],
      cellInPayMatrix:[''],
      category:[''],
      witheffectfrom:[''],
      orderdate:[''],
      incrementduedate:[''],
      remarkspayfixation:['']
     
    
    })

    this.activeRoute.paramMap.subscribe(params => {
      console.log("Working4");
      this.id = params.get('id');
      this.getPayFixationRecordBynId();
     
      console.log(this.id)
    });

  }

  getPayFixationRecordBynId() {
    console.log("Working5")
    this.employeeService.getPayFixationRecordBynId(this.id).subscribe(
      (response) => {
        this.data = response.data; // Update 'data' with the response data
  
        this.payfixFrmGrp.patchValue({
        
          employeeId:this.data.employeeId,
          modeofpayFixation:this.data.modeofpayFixation,
          employeeName:this.data.employeeName,
          scaleOfpay:this.data.scaleOfpay,
          gender:this.data.gender,
          basicPay:this.data.basicPay,
          cadreCode:this.data.cadreCode,
          levelpaymatrix:this.data.levelpaymatrix,
          cadreName:this.data.cadreName,
          cellInPayMatrix:this.data.cellInPayMatrix,
          category:this.data.category,
          witheffectfrom:this.data.witheffectfrom,
          orderdate:this.data.orderdate,
          incrementduedate:this.data.incrementduedate,
          remarkspayfixation:this.data.remarkspayfixation
        });
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
        // Handle the error, show an error message, etc.
      }
    );
  }

  onUpdate(id: number) {
    if (this.payfixFrmGrp.valid) {
      const updatedData = {
        // Include the ID of the existing record
        nid: this.id,
        "employeeId": this.payfixFrmGrp.value.employeeId,
        "modeofpayFixation": this.payfixFrmGrp.value.modeofpayFixation,
        "employeeName": this.payfixFrmGrp.value.employeeName,
        "scaleOfpay": this.payfixFrmGrp.value.scaleOfpay,
        "gender": this.payfixFrmGrp.value.gender,
        "basicPay": this.payfixFrmGrp.value.basicPay,
        "cadreCode": this.payfixFrmGrp.value.cadreCode,
        "levelpaymatrix": this.payfixFrmGrp.value.levelpaymatrix,
        "cadreName": this.payfixFrmGrp.value.cadreName,
        "cellInPayMatrix": this.payfixFrmGrp.value.cellInPayMatrix,
        "category": this.payfixFrmGrp.value.category,
        "witheffectfrom": this.payfixFrmGrp.value.witheffectfrom,
        "orderdate": this.payfixFrmGrp.value.orderdate,
        "incrementduedate": this.payfixFrmGrp.value.incrementduedate,
        "remarkspayfixation": this.payfixFrmGrp.value.remarkspayfixation,
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.savePayFixation(updatedData).subscribe(
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
        this.getPayFixationRecordBynId();
      }, 1000);
      this.router.navigate(['/emp-pay/list']);

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
