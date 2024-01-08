import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})

export class AddComponent implements OnInit {

  status = [
    { 'status': "5", 'value': true },
    { 'status': "10", 'value': false },
   
  ]
  selectedValue: string;
  selectedStatus:string;

  personalForm: FormGroup; 
  submitted = false;
  types: string[] = [];
  filteredData: any[];
  dataSource: any;
  couponsListData: any;

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient) { }

  ngOnInit(): void {

    this.personalForm = this.fb.group({

      fileNo: [''],
      natureOfCase: [''],
      modeOfCharge: [''],
      noOfPersons: [''],
      currentStatus: [''],

      
    })   

  }

  
onSubmit() {
    
  if (this.personalForm.valid) {
    console.log("Working1")
    let data={
      "fileNo": this.personalForm.value.fileNo,
      "natureOfCase": this.personalForm.value.natureOfCase,
      "modeOfCharge": this.personalForm.value.modeOfCharge,
      "noOfPersons": this.personalForm.value.noOfPersons,
      "currentStatus": this.personalForm.value.currentStatus,
      
  }
  console.log(data);
    // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
      this.employeeService.saveDCellFile(data).subscribe(

      (response) => {
        // Handle the response from the server (e.g., show a success message)
        console.log('Data saved:', response);
        
        // Navigate to the "exam-history/list" page
        this.router.navigate(['/cell-file/list']);
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

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
