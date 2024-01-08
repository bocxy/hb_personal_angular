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

  id:any;
  data:any;
  tenureFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  nid:any;
  

  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
      
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getTenureRecordBynId();
     
      console.log(this.id)
    });

    this.tenureFormGrp = this.cb.group({
      employeeId:[''],
      presentOfficeCode:[''],
      presentOfficeName:[''],
      employeeName:[''],
      gender:[''],
      transferOfficeCode:[''],
      cadreCode:[''],
      transferOfficeName:[''],
      cadreName:[''],
      dateOfJoined:[''],
      category:[''],
      dateOfRelieved:[''],
      modeOfTransfer:[''],
      joiningTimeElCredit:[''],
      dateOfTransferOrder:[''],
      remarks:['']

  })
}


getTenureRecordBynId() {
  console.log(this.id);
  console.log("Working1");
      this.employeeService.getTenureRecordBynId(this.id).subscribe(
        (response) => {
          console.log('res',response);
          this.data = response.data;
          
    // this.data=response.data[0];
    console.log('data',this.data);
    
    this.tenureFormGrp.patchValue({
     
      
      employeeId:this.data.employeeId,
      presentOfficeCode:this.data.presentOfficeCode,
      presentOfficeName:this.data.presentOfficeName,
      employeeName:this.data.employeeName,
      gender:this.data.gender,
      transferOfficeCode:this.data.transferOfficeCode,
      cadreCode:this.data.cadreCode,
      transferOfficeName:this.data.transferOfficeName,
      cadreName:this.data.cadreName,
      dateOfJoined:this.data.dateOfJoined,
      category:this.data.category,
      dateOfRelieved:this.data.dateOfRelieved,
      modeOfTransfer:this.data.modeOfTransfer,
      joiningTimeElCredit:this.data.joiningTimeElCredit,
      dateOfTransferOrder:this.data.dateOfTransferOrder,
      remarks:this.data.remarks
            });
    
          console.log('Response:', response);
    
        },
        (error) => {
    
          console.error('Error:', error);
    
        }
      );
    }


  onUpdate(id: any) {
    if (this.tenureFormGrp.valid) {
      console.log(this.tenureFormGrp);
      const updatedData = {
        // Include the ID of the existing record
         
        nid: this.id, 
                       
       
        employeeId:this.tenureFormGrp.value.employeeId,
        presentOfficeCode:this.tenureFormGrp.value.presentOfficeCode,
        presentOfficeName:this.tenureFormGrp.value.presentOfficeName,
        employeeName:this.tenureFormGrp.value.employeeName,
        gender:this.tenureFormGrp.value.gender,
        transferOfficeCode:this.tenureFormGrp.value.transferOfficeCode,
        cadreCode:this.tenureFormGrp.value.cadreCode,
        transferOfficeName:this.tenureFormGrp.value.transferOfficeName,
        cadreName:this.tenureFormGrp.value.cadreName,
        dateOfJoined:this.tenureFormGrp.value.dateOfJoined,
        category:this.tenureFormGrp.value.category,
        dateOfRelieved:this.tenureFormGrp.value.dateOfRelieved,
        modeOfTransfer:this.tenureFormGrp.value.modeOfTransfer,
        joiningTimeElCredit:this.tenureFormGrp.value.joiningTimeElCredit,
        dateOfTransferOrder:this.tenureFormGrp.value.dateOfTransferOrder,
        remarks:this.tenureFormGrp.value.remarks

      };
     
    
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.postingATransfer(updatedData).subscribe(
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
        this.getTenureRecordBynId();
      }, 1000);
      this.router.navigate(['/emp-tenure/list']);

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


}
