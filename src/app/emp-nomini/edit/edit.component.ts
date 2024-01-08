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

  empNmniFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;
  
  id:any;
  data:any;
  dataNominee:any;

  modeOfNominee = [
    { 'modeOfNominee': "Mother", 'value': true },
    { 'modeOfNominee': "Father", 'value': false },
    { 'modeOfNominee': "Spouse", 'value': false },
    { 'modeOfNominee': "Daughter", 'value': false },
    { 'modeOfNominee': "Son", 'value': false },
   
  ]

  relatinshipWithEmp = [
    { 'relatinshipWithEmp': "Mother", 'value': true },
    { 'relatinshipWithEmp': "Father", 'value': false },
    { 'relatinshipWithEmp': "Spouse", 'value': false },
    { 'relatinshipWithEmp': "Daughter", 'value': false },
    { 'relatinshipWithEmp': "Son", 'value': false },
   
  ]
 
  selectedStatus: string;
  SelectedValue: string;

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    
    
    this.empNmniFormGrp = this.cb.group({
      empId:[''],
      empName:[''],
      cadreCode:[''],
      cadreName:[''],
      dateOfBirth:[''],
      dateOfJointService:[''],
      modeOfNominee:[''],
      nameOfNominee:[''],
      relatinshipWithEmp:[''],
      ageOfNominee:[''],
      shareOfDcrg:[''],
      addressOfNominee:[''],
      
    })

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getNominationBynId();
     
      console.log(this.id)
    });


  }



  // applyTypeFilter() {
  //   if (this.selectedStatus?.length || this.SelectedValue?.length) {
  //     this.filteredData = this.dataSource.data.filter(item => {
  //       // Check if the item's category is included in the selectedValue array
  //       if (this.SelectedValue?.length && !this.SelectedValue?.includes(item.type[0])) {
  //         return false;
  //       }
  
  //       // Check if the item's colour is included in the selectedColourValue array
  //       if (this.selectedStatus?.length && !this.selectedStatus?.includes(item.couponStatus[0])) {
  //         return false;
  //       }
  //       // If the item passed both filters, return true
  //       return true;
  //     });
  //   } else {
  //     this.filteredData = [];
  //     this.dataSource.data = this.couponsListData;
  //   }
  
  // }

  applyTypeFilter() {
    if (!this.dataSource || !this.dataSource.data) {
      // Handle undefined or null cases
      return;
    }
  
    if (this.selectedStatus?.length || this.SelectedValue?.length) {
      // Existing logic
    } else {
      this.filteredData = [];
      this.dataSource.data = this.couponsListData;
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  


  getNominationBynId() {
    console.log(this.id);
        this.employeeService.getNominationBynId(this.id).subscribe(
          (response) => {
      this.data=response.data.employee[0];
      this.dataNominee=response.data.nominee[0];
      this.empNmniFormGrp.patchValue({
               
                empId:this.data.empId,
                empName:this.data.empName,
                cadreCode:this.data.cadreCode,
                cadreName:this.data.cadreName,
                dateOfBirth:this.data.dateOfBirth,
                dateOfJointService:this.data.dateOfJointService,
                modeOfNominee:this.dataNominee.modeOfNominee,
                nameOfNominee:this.dataNominee.nameOfNominee,
                relatinshipWithEmp:this.dataNominee.relationWithEmployee,
                ageOfNominee:this.dataNominee.ageOfNominee,
                shareOfDcrg:this.dataNominee.perOfDcrg,
                addressOfNominee:this.dataNominee.addressOfNominee
              });

             
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }



  onUpdate(id: number) {
    if (this.empNmniFormGrp.valid) {
      const updatedData = {
        // Include the ID of the existing record
        nid: this.id,
       
        empId:this.empNmniFormGrp.value.empId,
        empName:this.empNmniFormGrp.value.empName,
        cadreCode:this.empNmniFormGrp.value.cadreCode,
        cadreName:this.empNmniFormGrp.value.cadreName,
        dateOfBirth:this.empNmniFormGrp.value.dateOfBirth,
        dateOfJointService:this.empNmniFormGrp.value.dateOfJointService,
        modeOfNominee:this.empNmniFormGrp.value.modeOfNominee,
        nameOfNominee:this.empNmniFormGrp.value.nameOfNominee,
        relatinshipWithEmp:this.empNmniFormGrp.value.relatinshipWithEmp,
        ageOfNominee:this.empNmniFormGrp.value.ageOfNominee,
        shareOfDcrg:this.empNmniFormGrp.value.shareOfDcrg,
        addressOfNominee:this.empNmniFormGrp.value.addressOfNominee
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.saveEmpNomination(updatedData).subscribe(
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
        this.getNominationBynId();
      }, 1000);
      this.router.navigate(['/emp-nomini/list']);

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
