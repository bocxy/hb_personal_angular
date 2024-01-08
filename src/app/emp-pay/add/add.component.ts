import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { PopupComponent } from '../popup/popup.component';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  payfixFrmGrp: FormGroup;
  submitted = false;
  types: string[] = [];
  id:any;
  data:any;


  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    this.payfixFrmGrp = this.cb.group({
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
  }

  onButtonClicked(){

    // console.log(id);
    
    let employeeId=this.payfixFrmGrp.value.employeeId ?JSON.parse(this.payfixFrmGrp.value.employeeId):'' 
    this.employeeService.getCommonDetails(employeeId).subscribe(
      (response) => {
        console.log('id',this.id);
        
  this.data=response.data;
  this.payfixFrmGrp.patchValue({
           
           
    employeeName :this.data.employeeName,
            cadreCode:this.data.cadreCode,
            cadreName:this.data.cadreName,
            dateOfBirth:this.data.dateOfBirth,
            dateOfJointService:this.data.dateOfJointService,
            gender:this.data.gender,
            category:this.data.cadreCategory
          });
  
        console.log('Response:', response);
  
      },
      (error) => {
  
        console.error('Error:', error);
  
      }
    );
  }
  

  onSubmit() {

    console.log("Working")
    if (this.payfixFrmGrp.valid) {
      console.log("Working1")
      let data={
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
        
    }
      // this.employeeService.saveEmpExamHistory(this.payfixFrmGrp.value).subscribe(
        this.employeeService.savePayFixation(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/emp-pay/list']);
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
