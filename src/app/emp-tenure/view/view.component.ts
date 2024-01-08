import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
 
  dataSource = new MatTableDataSource<any>([]);

  tenureFormGrp: FormGroup;
  
  id:any;
  data:any;
 
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;;

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,private employeeService:EmployeeService) { }

  ngOnInit(): void {
    

    this.activeRoute.paramMap.subscribe(params => {
      
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getTenureRecordBynId();
     
      console.log(this.id)
    });


    this.tenureFormGrp = this.fb.group({
      employeeId:[''],
      presentOfficeCode:[''],
      presentOfficeName:[''],
      employeeName:[''],
      gender:[''],
      transferOfficeCode:[''],
      cadreCode:[''],
      transferOfficeName:[''],
      cadreName:[''],
      category:[''],
      dateOfRelieved:[''],
      modeOfTransfer:[''],
      joiningTimeElCredit:[''],
      dateOfTransferOrder:[''],
      dateOfJoined:[''],
      remarks:['']


    })
   

}


getTenureRecordBynId() {
  console.log(this.id);
  console.log("Working1");
      this.employeeService.getTenureRecordBynId(this.id).subscribe(
        (response) => {
          console.log('res',response);
          this.data = response.data;
          
    // this.data=response.data[0];
    console.log('data',this.data);
    
    this.tenureFormGrp.patchValue({
     
      
      employeeId:this.data.employeeId,
      presentOfficeCode:this.data.presentOfficeCode,
      presentOfficeName:this.data.presentOfficeName,
      employeeName:this.data.employeeName,
      gender:this.data.gender,
      transferOfficeCode:this.data.transferOfficeCode,
      cadreCode:this.data.cadreCode,
      transferOfficeName:this.data.transferOfficeName,
      cadreName:this.data.cadreName,
      dateOfJoined:this.data.dateOfJoined,
      category:this.data.category,
      dateOfRelieved:this.data.dateOfRelieved,
      modeOfTransfer:this.data.modeOfTransfer,
      joiningTimeElCredit:this.data.joiningTimeElCredit,
      dateOfTransferOrder:this.data.dateOfTransferOrder,
      remarks:this.data.remarks
            });
    
          console.log('Response:', response);
    
        },
        (error) => {
    
          console.error('Error:', error);
    
        }
      );
    }



}
