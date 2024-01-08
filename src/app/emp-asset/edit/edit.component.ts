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

  empAssetFrmGrp: FormGroup; 
  submitted = false;
  id: any;
  data:any;

  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


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

    this.empAssetFrmGrp = this.cb.group({
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

  onUpdate(id: number) {
    if (this.empAssetFrmGrp.valid) {
      const updatedData = {
        // Include the ID of the existing record
        nid: this.id,
        
        employeeId: this.empAssetFrmGrp.value.employeeId,
        officeCode: this.empAssetFrmGrp.value.officeCode,
        officeName: this.empAssetFrmGrp.value.officeName,
        employeeName: this.empAssetFrmGrp.value.employeeName,
        cadreCode: this.empAssetFrmGrp.value.cadreCode,
        seatNo: this.empAssetFrmGrp.value.seatNo,
        fileNo: this.empAssetFrmGrp.value.fileNo,
        fileGist: this.empAssetFrmGrp.value.fileGist,
        fileStatus: this.empAssetFrmGrp.value.fileStatus,
        typeOfDisposal: this.empAssetFrmGrp.value.typeOfDisposal,
        fileDisposalDate: this.empAssetFrmGrp.value.fileDisposalDate
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.saveEmpFile(updatedData).subscribe(
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
        this.getEmpFileDetailBynId();
      }, 1000);
      this.router.navigate(['/emp-asset/list']);

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
