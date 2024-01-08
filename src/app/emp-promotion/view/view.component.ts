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

  promotionFrmGrp:FormGroup;
  submitted = false;
  id:any;
  data:any;
  types: string[] = [];

  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {

   
    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getPromotionRecordBynId();
     
      console.log(this.id)
    });
    
    this.promotionFrmGrp = this.cb.group({
      employeeId:[''],
      promotedCadreCode:[''],
      employeeName:[''],
      promotedCadreName:[''],
      gender:[''],
      promotedCadreCategory:[''],
      cadreCode:[''],
      postOfficeCode:[''],
      cadreName:[''],
      postOfficeName:[''],
      category:[''],
      dateOfRelieved:[''],
      officeCode:[''],
      dateOfJoinPostPlace:[''],
      officeName:[''],
      joinTimeELCredit:[''],
      dateOfPromotion:[''],
      remarks:['']
    
    })

  }



  

  getPromotionRecord() {
    console.log(this.id);
        this.employeeService.getPromotionRecord(this.id).subscribe(
          (response) => {
      this.data=response.data[0];
      this.promotionFrmGrp.patchValue({
                
                employeeId:this.data.employeeId,
                promotedCadreCode:this.data.promotedCadreCode,
                employeeName:this.data.employeeName,
                promotedCadreName:this.data.promotedCadreName,
                gender:this.data.gender,
                promotedCadreCategory:this.data.promotedCadreCategory,
                cadreCode:this.data.cadreCode,
                postOfficeCode:this.data.postOfficeCode,
                cadreName:this.data.cadreName,
                postOfficeName:this.data.postOfficeName,
                category:this.data.category,
                dateOfRelieved:this.data.dateOfRelieved,
                officeCode:this.data.officeCode,
                dateOfJoinPostPlace:this.data.dateOfJoinPostPlace,
                officeName:this.data.officeName,
                joinTimeELCredit:this.data.joinTimeELCredit,
                dateOfPromotion:this.data.dateOfPromotion,
                remarks:this.data.remarks
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }
      getPromotionRecordBynId() {
          console.log(this.id);
              this.employeeService.getPromotionRecordBynId(this.id).subscribe(
                (response) => {
            this.data=response.data;
            this.promotionFrmGrp.patchValue({
                      
                      employeeId:this.data.employeeId,
                      promotedCadreCode:this.data.promotedCadreCode,
                      employeeName:this.data.employeeName,
                      promotedCadreName:this.data.promotedCadreName,
                      gender:this.data.gender,
                      promotedCadreCategory:this.data.promotedCadreCategory,
                      cadreCode:this.data.cadreCode,
                      postOfficeCode:this.data.postOfficeCode,
                      cadreName:this.data.cadreName,
                      postOfficeName:this.data.postOfficeName,
                      category:this.data.category,
                      dateOfRelieved:this.data.dateOfRelieved,
                      officeCode:this.data.officeCode,
                      dateOfJoinPostPlace:this.data.dateOfJoinPostPlace,
                      officeName:this.data.officeName,
                      joinTimeELCredit:this.data.joinTimeELCredit,
                      dateOfPromotion:this.data.dateOfPromotion,
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
