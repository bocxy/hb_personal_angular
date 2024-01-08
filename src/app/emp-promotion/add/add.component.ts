import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  types: string[] = [];
  submitted = false;
  id:any;
  data:any;

  promotionFrmGrp:FormGroup;
  cadreCodes: string[] = [];
  officeCodes: string[] = [];

  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

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

const id=123;
  

this.employeeService.getAllCadreCode(id).subscribe(
  (response) => {
    // Assuming response.data is an array of office codes
    this.cadreCodes = response.data;

    // Update the form control with the retrieved office codes
    this.promotionFrmGrp.controls['promotedCadreCode'].setValue(this.cadreCodes);
  },
  (error) => {
    console.error('Error:', error);
  }
);


    this.employeeService.getAllOfficeCode(id).subscribe(
      (response) => {
        // Assuming response.data is an array of office codes
        this.officeCodes = response.data;
  
        // Update the form control with the retrieved office codes
        this.promotionFrmGrp.controls['postOfficeCode'].setValue(this.officeCodes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );


    this.employeeService.getAllOfficeCode(id).subscribe(
      (response) => {
        // Assuming response.data is an array of office codes
        this.officeCodes = response.data;
  
        // Update the form control with the retrieved office codes
        this.promotionFrmGrp.controls['postOfficeCode'].setValue(this.officeCodes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );

    
  
    


  }


 



  getOfficeName(): void {
    const officeCode = this.promotionFrmGrp.value.officeCode;

    if (!officeCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getOfficeName(officeCode).subscribe(
      (response) => {
        console.log(response);
        this.promotionFrmGrp.patchValue({
          officeName: response.data[0],
          // Update other form controls as needed
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  getOfficeName1(): void {
    const postOfficeCode = this.promotionFrmGrp.value.postOfficeCode;

    if (!postOfficeCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getOfficeName(postOfficeCode).subscribe(
      (response) => {
        console.log(response);
        this.promotionFrmGrp.patchValue({
          postOfficeName: response.data[0],
          // Update other form controls as needed
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  onButtonClicked(){

   
    
    let employeeId=this.promotionFrmGrp.value.employeeId ?JSON.parse(this.promotionFrmGrp.value.employeeId):'' 
    this.employeeService.getCommonDetails(employeeId).subscribe(
      (response) => {
        console.log('id',this.id);
        
  this.data=response.data;
  this.promotionFrmGrp.patchValue({
           
           
    employeeName :this.data.employeeName,
            cadreCode:this.data.cadreCode,
            cadreName:this.data.cadreName,
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
    
    if (this.promotionFrmGrp.valid) {
      console.log("Working1")
      let data={
       
        employeeId:this.promotionFrmGrp.value.employeeId,
        promotedCadreCode:this.promotionFrmGrp.value.promotedCadreCode,
        employeeName:this.promotionFrmGrp.value.employeeName,
        promotedCadreName:this.promotionFrmGrp.value.promotedCadreName,
        gender:this.promotionFrmGrp.value.gender,
        promotedCadreCategory:this.promotionFrmGrp.value.promotedCadreCategory,
        cadreCode:this.promotionFrmGrp.value.cadreCode,
        postOfficeCode:this.promotionFrmGrp.value.postOfficeCode,
        cadreName:this.promotionFrmGrp.value.cadreName,
        postOfficeName:this.promotionFrmGrp.value.postOfficeName,
        category:this.promotionFrmGrp.value.category,
        dateOfRelieved:this.promotionFrmGrp.value.dateOfRelieved,
        officeCode:this.promotionFrmGrp.value.officeCode,
        dateOfJoinPostPlace:this.promotionFrmGrp.value.dateOfJoinPostPlace,
        officeName:this.promotionFrmGrp.value.officeName,
        joinTimeELCredit:this.promotionFrmGrp.value.joinTimeELCredit,
        dateOfPromotion:this.promotionFrmGrp.value.dateOfPromotion,
        remarks:this.promotionFrmGrp.value.remarks
        
    }
      // this.employeeService.saveEmpExamHistory(this.promotionFrmGrp.value).subscribe(
        this.employeeService.savePromotion(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/emp-promotion/list']);
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


  // getCadreNameCategory(){

  //   let id=this.promotionFrmGrp.value.promotedCadreCode ?JSON.parse(this.promotionFrmGrp.value.promotedCadreCode):'' 
  //   this.employeeService.getCadreNameCategory(id).subscribe(
  //     (response) => {
  //       console.log('id',this.id);
        
  // this.data=response.data;
  // this.promotionFrmGrp.patchValue({
           
           
  //   promotedCadreName :this.data.cadreName,
  //   promotedCadreCategory:this.data.cadreCategory,
           
  //         });
  
  //       console.log('Response:', response);
  
  //     },
  //     (error) => {
  
  //       console.error('Error:', error);
  
  //     }
  //   );

  // }

  getCadreNameCategory() {
    const cadreCode = this.promotionFrmGrp.value.promotedCadreCode;
  
    this.employeeService.getCadreNameCategory(cadreCode).subscribe(
      (response) => {
        console.log('id', response);
        this.data = response.data;
        this.promotionFrmGrp.patchValue({
          promotedCadreName: this.data.Cadre_Name,
          promotedCadreCategory: this.data.Cadre_Category,
          // cadreName: this.data.promotedCadreName,
          // cadreCategory: this.data.promotedCadreCategory,
        });
  
        console.log('Response:', response);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }



}
