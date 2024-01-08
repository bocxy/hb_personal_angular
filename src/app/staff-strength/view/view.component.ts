import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  myForm: FormGroup;
  idToEdit:number;

  staffSancFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getSanctionEmployeeById();
     
      console.log(this.id)
    });

    this.staffSancFormGrp = this.cb.group({
      cadreCode:[''],
      cadreName:[''],
      cadreCategory:[''],
      sanctioned:[''],
      present:[''],
      vacant:['']
      
    
    })
  }

  getSanctionEmployeeById() {
    console.log(this.id);
        this.employeeService.getSanctionEmployeeById(this.id).subscribe(
          (response) => {
      this.data=response.data;
      this.staffSancFormGrp.patchValue({
               
        cadreCode: this.data.cadreCode,
        cadreName: this.data.cadreName,
        cadreCategory: this.data.cadreCategory,
        sanctioned: this.data.sanctioned,
        present: this.data.present,
        vacant: this.data.vacant,
        
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }

}
