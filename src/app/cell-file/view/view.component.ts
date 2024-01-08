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

  status = [
    { 'status': "5", 'value': true },
    { 'status': "10", 'value': false },
   
  ]
  selectedValue: string;
  selectedStatus:string;
  
  id:any;
  data:any

  personalForm: FormGroup; 
  submitted = false;
  types: string[] = [];
  filteredData: any[];
  dataSource: any;
  couponsListData: any;
  
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService:EmployeeService,) { }

  ngOnInit(): void {
   

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getDCellFileById();
     
      console.log(this.id)
    });


    this.personalForm = this.fb.group({
      fileNo:[''],
      natureOfCase:[''],
      modeOfCharge:[''],
      noOfPersons:[''],
      currentStatus:['']
     
    
    })   

}


getDCellFileById() {
  console.log(this.id);
      this.employeeService.getDCellFileById(this.id).subscribe(
        (response) => {
    this.data=response.data;
    this.personalForm.patchValue({
                           
              fileNo:this.data.fileNo,
              natureOfCase:this.data.natureOfCase,
              modeOfCharge:this.data.modeOfCharge,
              noOfPersons:this.data.noOfPersons,
              currentStatus:this.data.currentStatus

            });
    
          console.log('Response:', response);
    
        },
        (error) => {
    
          console.error('Error:', error);
    
        }
      );
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

}