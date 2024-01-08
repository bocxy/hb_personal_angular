import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id:any;
  data:any;
  myForm: FormGroup;
  details: any;
  nid: any


  movableFormGrp: FormGroup;
 
 
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;
  onFileSelected: any;
  fileInput:any;


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


  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {
   
    this.activeRoute.paramMap.subscribe(params => {
      console.log("Working4");
      this.id = params.get('id');
      this.getMovableDetailsBynId();
     
      console.log(this.id)
    });

    
    this.movableFormGrp = this.fb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      sourceOfIncome: [''],
      valueOfProperty: [''],
      propRegisteredName: [''],
      dateOfPurchase: [''],
      descOfProperty: [''],
      incomeFromProp: [''],
      propertyDocumentName: [''],
      propertyDocumentPath: ['']
          
      
    })

   

}


openFileInNewTab(propertyDocumentPath: string): string {
  return 'file://' + propertyDocumentPath;
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

getMovableDetailsBynId() {
  console.log("Working5")
  this.employeeService.getMovableDetailsBynId(this.id).subscribe(
    (response) => {
      this.data = response.data; // Update 'data' with the response data

      this.movableFormGrp.patchValue({
        empId:this.data.empId,
        empName: this.data.empName,
      cadreCode: this.data.cadreCode,
      cadreName: this.data.cadreName,
      dateOfBirth: this.data.dateOfBirth,
      dateOfJointService: this.data.dateOfJointService,
      districtOfProperty:this.data.districtOfProperty,
      divisionOfProperty:this.data.divisionOfProperty,
      sourceOfIncome: this.data.sourceOfIncome,
      valueOfProperty: this.data.valueOfProperty,
      propRegisteredName: this.data.propRegisteredName,
      dateOfPurchase: this.data.dateOfPurchase,
      descOfProperty: this.data.descOfProperty,
      incomeFromProp: this.data.incomeFromProp,
      propertyDocumentName: this.data.propertyDocumentName,
      propertyDocumentPath: this.data.propertyDocumentPath,
      propertyDocumentfile:this.data.propertyDocumentfile,
      moveImmove:this.data.moveImmove
            
      });
      console.log('Response:', response);
    },
    (error) => {
      console.error('Error:', error);
      // Handle the error, show an error message, etc.
    }
  );
}

}
