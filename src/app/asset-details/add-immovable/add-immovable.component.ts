import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-add-immovable',
  templateUrl: './add-immovable.component.html',
  styleUrls: ['./add-immovable.component.scss']
})
export class AddImmovableComponent implements OnInit {

  immovableFormGrp:FormGroup;
 
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;
  onFileSelected: any;
  fileInput:any;
  id:number;
  data:any;

  status = [
    { 'status': "Yes", 'value': true },
    { 'status': "No", 'value': false },
   
  ]
  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;



  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient) { }

  ngOnInit(): void {
   

    
    
    this.immovableFormGrp = this.fb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      descOfProperty: [''],
      districtOfProperty: [''],
      divisionOfProperty: [''],
      talukOfProperty: [''],
      villageOfProperty: [''],
      surveyNo: [''],
      areaOfProperty: [''],
      natureOfLand: [''],
      acquiredEmployee: [''],
      buyerName: [''],
      buyerRelationship: [''],
      dateOfAcquisition: [''],
      modeOfAcquired: [''],
      sellerName: [''],
      valueOfProperty: [''],
      sanctionedDetails: [''],
      annualIncome: [''],
      remarks: ['']
          
      
    })


}

onButtonClicked(){

  // console.log(id);
  
  let empId=this.immovableFormGrp.value.empId ?JSON.parse(this.immovableFormGrp.value.empId):'' 
  this.employeeService.getCommonDetails(empId).subscribe(
    (response) => {
      console.log('id',this.id);
      
this.data=response.data;
this.immovableFormGrp.patchValue({
         
         
  empName :this.data.employeeName,
          cadreCode:this.data.cadreCode,
          cadreName:this.data.cadreName,
          dateOfBirth:this.data.dateOfBirth,
          dateOfJointService:this.data.dateOfJointService,
         
        });

      console.log('Response:', response);

    },
    (error) => {

      console.error('Error:', error);

    }
  );
}
onSubmit() {
    
  if (this.immovableFormGrp.valid) {
    console.log("Working1")
    let data={
      "empId": this.immovableFormGrp.value.empId,
      "empName": this.immovableFormGrp.value.empName,
      "cadreCode": this.immovableFormGrp.value.cadreCode,
      "cadreName": this.immovableFormGrp.value.cadreName,
      "dateOfBirth": this.immovableFormGrp.value.dateOfBirth,
      "dateOfJointService": this.immovableFormGrp.value.dateOfJointService,
      "descOfProperty": this.immovableFormGrp.value.descOfProperty,
      "districtOfProperty": this.immovableFormGrp.value.descOfProperty,
      "divisionOfProperty": this.immovableFormGrp.value.divisionOfProperty,
      "talukOfProperty": this.immovableFormGrp.value.talukOfProperty,
      "villageOfProperty": this.immovableFormGrp.value.villageOfProperty,
      "surveyNo": this.immovableFormGrp.value.surveyNo,
      "areaOfProperty": this.immovableFormGrp.value.areaOfProperty,
      "natureOfLand": this.immovableFormGrp.value.natureOfLand,
      "acquiredEmployee": this.immovableFormGrp.value.acquiredEmployee,
      "buyerName": this.immovableFormGrp.value.buyerName,
      "buyerRelationship": this.immovableFormGrp.value.buyerRelationship,
      "dateOfAcquisition": this.immovableFormGrp.value.dateOfAcquisition,
      "modeOfAcquired": this.immovableFormGrp.value.modeOfAcquired,
      "sellerName": this.immovableFormGrp.value.sellerName,
      "valueOfProperty": this.immovableFormGrp.value.valueOfProperty,
      "sanctionedDetails": this.immovableFormGrp.value.sanctionedDetails,
      "annualIncome": this.immovableFormGrp.value.annualIncome,
      "moveImmove": "Immovable",
      "remarks": this.immovableFormGrp.value.remarks
     
      
  }
  console.log(data);
    // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
      this.employeeService.saveEmpImmovable(data).subscribe(

      (response) => {
        // Handle the response from the server (e.g., show a success message)
        console.log('Data saved:', response);
        
        // Navigate to the "exam-history/list" page
        this.router.navigate(['/asset-details/list']);
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



openExportDialog(): void {

}

generateExcel(headers: string[]) {

}

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

delete(id: string): void {
  const dialog = this.dialog.open(ConfirmDialogComponent, {
    width: '250px',
    data: {
      from: "delete",
    }
  });
  dialog.afterClosed().subscribe(data => {
    if (data) {


    }
  })
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
