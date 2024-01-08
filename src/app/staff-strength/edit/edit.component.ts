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
        vacant: this.data.vacant
        
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }


  onUpdate(id: number) {
    if (this.staffSancFormGrp.valid) {
      const updatedData = {
        // Include the ID of the existing record
        nid: this.id,
       
        cadreCode: this.staffSancFormGrp.value.cadreCode,
        cadreName: this.staffSancFormGrp.value.cadreName,
        cadreCategory: this.staffSancFormGrp.value.cadreCategory,
        sanctioned: this.staffSancFormGrp.value.sanctioned,
        present: this.staffSancFormGrp.value.present,
        vacant: this.staffSancFormGrp.value.sanctioned - this.staffSancFormGrp.value.present,
        
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.saveSanction(updatedData).subscribe(
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
        this.getSanctionEmployeeById();
      }, 1000);
      this.router.navigate(['/staff-strength/list']);

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
