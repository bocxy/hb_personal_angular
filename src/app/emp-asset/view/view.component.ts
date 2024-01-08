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

  id:any;
  data:any;
 
  empAssetFrmGrp: FormGroup;
  
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService:EmployeeService) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getEmpFileDetailBynId();
     
      console.log(this.id)
    });

    this.empAssetFrmGrp = this.fb.group({
      employeeId: [''],
      officeCode: [''],
      officeName: [''],
      employeeName: [''],
      cadreCode: [''],
      seatNo: [''],
      fileNo: [''],
      fileGist: [''],
      fileStatus: [''],
      typeOfDisposal: [''],
      fileDisposalDate: ['']

    }) 

}

getEmpFileDetailBynId() {
  console.log(this.id);
      this.employeeService.getEmpFileDetailBynId(this.id).subscribe(
        (response) => {
    this.data=response.data;
    this.empAssetFrmGrp.patchValue({
              
              employeeId: this.data.employeeId,
              officeCode: this.data.officeCode,
              officeName: this.data.officeName,
              employeeName: this.data.employeeName,
              cadreCode: this.data.cadreCode,
              seatNo: this.data.seatNo,
              fileNo: this.data.fileNo,
              fileGist: this.data.fileGist,
              fileStatus: this.data.fileStatus,
              typeOfDisposal: this.data.typeOfDisposal,
              fileDisposalDate: this.data.fileDisposalDate
            });
    
          console.log('Response:', response);
    
        },
        (error) => {
    
          console.error('Error:', error);
    
        }
      );
    }


}
