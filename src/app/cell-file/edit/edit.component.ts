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

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService, private http: HttpClient) { }


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

      
      
  onUpdate(id: number) {
    if (this.personalForm.valid) {
      const updatedData = {
        // Include the ID of the existing record
        nid: this.id,
        
        fileNo:this.personalForm.value.fileNo,
        natureOfCase:this.personalForm.value.natureOfCase,
        modeOfCharge:this.personalForm.value.modeOfCharge,
        noOfPersons:this.personalForm.value.noOfPersons,
        currentStatus:this.personalForm.value.currentStatus
       
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.saveDCellFile(updatedData).subscribe(
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
        this.getDCellFileById();
      }, 1000);
      this.router.navigate(['/cell-file/list']);

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
