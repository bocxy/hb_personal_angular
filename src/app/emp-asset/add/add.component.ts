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

  empAssetFrmGrp: FormGroup; 
  submitted = false;
  types: string[] = [];
  data:any;
  id:any;
  officeCodes: string[] = [];

 
  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient) { }

  ngOnInit(): void {

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

    const id = 123;
    this.employeeService.getAllOfficeCode(id).subscribe(
      (response) => {
        // Assuming response.data is an array of office codes
        this.officeCodes = response.data;
  
        // Update the form control with the retrieved office codes
        this.empAssetFrmGrp.controls['officeCode'].setValue(this.officeCodes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );



  }

  onSubmit() {
    
    if (this.empAssetFrmGrp.valid) {
      console.log("Working1")
      let data={
        "employeeId": this.empAssetFrmGrp.value.employeeId,
        "officeCode": this.empAssetFrmGrp.value.officeCode,
        "officeName": this.empAssetFrmGrp.value.officeName,
        "employeeName": this.empAssetFrmGrp.value.employeeName,
        "cadreCode": this.empAssetFrmGrp.value.cadreCode,
        "seatNo": this.empAssetFrmGrp.value.seatNo,
        "fileNo": this.empAssetFrmGrp.value.fileNo,
        "fileGist": this.empAssetFrmGrp.value.fileGist,
        "fileStatus": this.empAssetFrmGrp.value.fileStatus,
        "typeOfDisposal": this.empAssetFrmGrp.value.typeOfDisposal,
        "fileDisposalDate": this.empAssetFrmGrp.value.fileDisposalDate
        
    }
    console.log(data);
      // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
        this.employeeService.saveEmpFile(data).subscribe(
  
        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/emp-asset/list']);
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

  onButtonClicked(){

    // console.log(id);
    
    let employeeId=this.empAssetFrmGrp.value.employeeId ?JSON.parse(this.empAssetFrmGrp.value.employeeId):'' 
    this.employeeService.getCommonDetails(employeeId).subscribe(
      (response) => {
        console.log('id',this.id);
        
  this.data=response.data;
  this.empAssetFrmGrp.patchValue({
           
           
    employeeName :this.data.employeeName,
            cadreCode:this.data.cadreCode,
            cadreName:this.data.cadreName,
           
           
          });
  
        console.log('Response:', response);
  
      },
      (error) => {
  
        console.error('Error:', error);
  
      }
    );
  }

  getOfficeName(): void {
    const officeCode = this.empAssetFrmGrp.value.officeCode;

    if (!officeCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getOfficeName(officeCode).subscribe(
      (response) => {
        console.log(response);
        this.empAssetFrmGrp.patchValue({
          officeName: response.data[0],
          // Update other form controls as needed
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
