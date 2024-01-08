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

  promotionFrmGrp:FormGroup;
  submitted = false;
  id:any;
  data:any;
  types: string[] = [];
  cadreCodes: string[] = [];
  officeCodes: string[] = [];
  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
     
     
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

    this.getPromotionRecordBynId();

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

  onUpdate(id: number) {
    if (this.promotionFrmGrp.valid) {
      const updatedData = {
        nid:this.id,
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
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.savePromotion(updatedData).subscribe(
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
        this.getPromotionRecordBynId();
      }, 1000);
      this.router.navigate(['/emp-promotion/list']);

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

onButtonClicked(){

  // console.log(id);
  
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
