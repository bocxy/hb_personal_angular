import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  
  empNmniFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;
 
  id:any;
  data:any;

 
  modeOfNominee = [
    { 'modeOfNominee': "Mother", 'value': true },
    { 'modeOfNominee': "Father", 'value': false },
    { 'modeOfNominee': "Spouse", 'value': false },
    { 'modeOfNominee': "Daughter", 'value': false },
    { 'modeOfNominee': "Son", 'value': false },
   
  ]

  relatinshipWithEmp = [
    { 'relatinshipWithEmp': "Mother", 'value': true },
    { 'relatinshipWithEmp': "Father", 'value': false },
    { 'relatinshipWithEmp': "Spouse", 'value': false },
    { 'relatinshipWithEmp': "Daughter", 'value': false },
    { 'relatinshipWithEmp': "Son", 'value': false },
   
  ]
 
  selectedStatus: string;
  SelectedValue: string;

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    
    
    this.empNmniFormGrp = this.cb.group({
      empId:[''],
      empName:[''],
      cadreCode:[''],
      cadreName:[''],
      dateOfBirth:[''],
      dateOfJointService:[''],
      modeOfNominee:[''],
      nameOfNominee:[''],
      relatinshipWithEmp:[''],
      ageOfNominee:[''],
      shareOfDcrg:[''],
      addressOfNominee:[''],
      
    })

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getNominationBynId();
     
      console.log(this.id)
    });


  }



  applyTypeFilter() {
    if (this.selectedStatus?.length || this.SelectedValue?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.SelectedValue?.length && !this.SelectedValue?.includes(item.type[0])) {
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

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  


  getNominationBynId() {
    console.log(this.id);
        this.employeeService.getNominationBynId(this.id).subscribe(
          (response) => {
      this.data=response.data.employee[0];
      this.empNmniFormGrp.patchValue({
               
                empId:this.data.empId,
                empName:this.data.empName,
                cadreCode:this.data.cadreCode,
                cadreName:this.data.cadreName,
                dateOfBirth:this.data.dateOfBirth,
                dateOfJointService:this.data.dateOfJointService,
                modeOfNominee:this.data.modeOfNominee,
                nameOfNominee:this.data.nameOfNominee,
                relatinshipWithEmp:this.data.relatinshipWithEmp,
                ageOfNominee:this.data.ageOfNominee,
                shareOfDcrg:this.data.shareOfDcrg,
                addressOfNominee:this.data.addressOfNominee
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }


}
