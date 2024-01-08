import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

 
  payfixFrmGrp: FormGroup;
  data:any;
  id:any;
 
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;

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

}
