import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  tenureFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  fileInput:any;
  id:any;
  data:any;
  personalInfoTabData: MatTableDataSource<any>;
  officeCodes: string[] = [];
  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {


//     this.activeRoute.paramMap.subscribe(params => {
      
//       let id= params.get('id');
// if(id){
//   this.id =JSON.parse(id);
// }
//       debugger
//       console.log('id',this.id);
      
//       this.getData();
     
//       console.log(this.id)
//     });

    this.tenureFormGrp = this.cb.group({
      employeeId:[''],
      presentOfficeCode:[''],
      presentOfficeName:[''],
      employeeName:[''],
      dateOfBirth:[''],

      gender:[''],
      transferOfficeCode:[''],
      cadreCode:[''],
      transferOfficeName:[''],
      cadreName:[''],
      dateOfJointService:[''],
      dateOfJoined:[''],
      category:[''],
      dateOfRelieved:[''],
      modeOfTransfer:[''],
      joiningTimeElCredit:[''],
      dateOfTransferOrder:[''],
      remarks:['']


    })

const id=123;
    this.employeeService.getAllOfficeCode(id).subscribe(
      (response) => {
        // Assuming response.data is an array of office codes
        this.officeCodes = response.data;
  
        // Update the form control with the retrieved office codes
        this.tenureFormGrp.controls['presentOfficeCode'].setValue(this.officeCodes);
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
        this.tenureFormGrp.controls['transferOfficeCode'].setValue(this.officeCodes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );


  }

  // getData() {
  //   console.log(this.id);
   
  //   this.employeeService.getCommonDetails(this.id).subscribe(
  //     (response) => {
  //       console.log('res', response);
  
  //       this.data = response.data;
  //       const updatedValues = this.findtenureFormGrp(response);
  
  //       this.tenureFormGrp.patchValue({ 
  //         ...updatedValues, // Spread the updatedValues into the patchValue object
  //         employeeName: this.data.employeeName,
  //         gender: this.data.gender,
  //         cadreCode: this.data.cadreCode,
  //         cadreName: this.data.cadreName,
  //         cadreCategory: this.data.cadreCategory,
  //       });
  
  //       console.log('Response:', response);
  //     },
  //     (error) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }

  onButtonClicked(){

    // console.log(id);
    
    let employeeId=this.tenureFormGrp.value.employeeId ?JSON.parse(this.tenureFormGrp.value.employeeId):'' 
    this.employeeService.getCommonDetails(employeeId).subscribe(
      (response) => {
        console.log('id',this.id);
        
  this.data=response.data;
  this.tenureFormGrp.patchValue({
           
           
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
    
    if (this.tenureFormGrp.valid) {
      console.log("Working1")
      let data={
        "employeeId": this.tenureFormGrp.value.employeeId,
        "presentOfficeCode": this.tenureFormGrp.value.presentOfficeCode,
        "presentOfficeName": this.tenureFormGrp.value.presentOfficeName,
        "employeeName": this.tenureFormGrp.value.employeeName,
        "dateOfBirth":this.tenureFormGrp.value.dateOfBirth,
        "gender": this.tenureFormGrp.value.gender,
        "transferOfficeCode": this.tenureFormGrp.value.transferOfficeCode,
        "cadreCode": this.tenureFormGrp.value.cadreCode,
        "transferOfficeName": this.tenureFormGrp.value.transferOfficeName,
        "cadreName": this.tenureFormGrp.value.cadreName,
        "dateOfJointService":this.tenureFormGrp.value.dateOfJointService,
        "dateOfJoined":this.tenureFormGrp.value.dateOfJoined,
        "category": this.tenureFormGrp.value.category,
        "dateOfRelieved": this.tenureFormGrp.value.dateOfRelieved,
        "modeOfTransfer": this.tenureFormGrp.value.modeOfTransfer,
        "joiningTimeElCredit": this.tenureFormGrp.value.joiningTimeElCredit,
        "dateOfTransferOrder": this.tenureFormGrp.value.dateOfTransferOrder,
        "remarks": this.tenureFormGrp.value.remarks
       
        
    }
    console.log(data);
      // this.employeeService.saveEmpExamHistory(this.tenureFormGrp.value).subscribe(
        this.employeeService.postingATransfer(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/emp-tenure/list']);
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

  findtenureFormGrp(response: any): any {
    if (response && response.tenureFormGrp) {
      return response.tenureFormGrp;
    }

    for (const key in response) {
      if (response.hasOwnProperty(key) && typeof response[key] === 'object') {
        const tenureFormGrp = this.findtenureFormGrp(response[key]);
        if (tenureFormGrp) {
          return tenureFormGrp;
        }
      }
    }

    return null;
  }


  getOfficeName(): void {
    const presentOfficeCode = this.tenureFormGrp.value.presentOfficeCode;

    if (!presentOfficeCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getOfficeName(presentOfficeCode).subscribe(
      (response) => {
        console.log(response);
        this.tenureFormGrp.patchValue({
          presentOfficeName: response.data[0],
          // Update other form controls as needed
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  getOfficeName1(): void {
    const transferOfficeCode = this.tenureFormGrp.value.transferOfficeCode;

    if (!transferOfficeCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getOfficeName(transferOfficeCode).subscribe(
      (response) => {
        console.log(response);
        this.tenureFormGrp.patchValue({
          transferOfficeName: response.data[0],
          // Update other form controls as needed
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }


  getOfficeNameforTransfer(){
    const transferOfficeCode = this.tenureFormGrp.value.transferOfficeCode;

    if (!transferOfficeCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getOfficeName(transferOfficeCode).subscribe(
      (response) => {
        this.tenureFormGrp.patchValue({
         transferOfficeName: response.data[0],
          // Update other form controls as needed
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }



}


