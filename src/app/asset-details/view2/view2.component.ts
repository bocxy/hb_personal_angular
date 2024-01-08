import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';


import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view2',
  templateUrl: './view2.component.html',
  styleUrls: ['./view2.component.scss']
})
export class View2Component implements OnInit {

  id:any;
  data:any;
  myForm: FormGroup;
  details: any;
  nid: any

 
    
    immovableFormGrp: FormGroup;
   
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
      this.getImmovableDetailsBynId();
     
      console.log(this.id)
    });

      
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
  
  getImmovableDetailsBynId() {
    console.log(this.id);
    console.log("Working1");
        this.employeeService.getImmovableDetailsBynId(this.id).subscribe(
          (response) => {
            console.log('res',response);
            this.data = response.data;
            
      // this.data=response.data[0];
      console.log('data',this.data);
      
      this.immovableFormGrp.patchValue({
       
        empId:this.data.empId,
        empName: this.data.empName,
        cadreCode: this.data.cadreCode,
        cadreName: this.data.cadreName,
        dateOfBirth: this.data.dateOfBirth,
        dateOfJointService: this.data.dateOfJointService,
        descOfProperty: this.data.descOfProperty,
        districtOfProperty:this.data.districtOfProperty,
        divisionOfProperty:this.data.divisionOfProperty,
        talukOfProperty: this.data.talukOfProperty,
        villageOfProperty: this.data.villageOfProperty,
        surveyNo: this.data.surveyNo,
        areaOfProperty:this.data.areaOfProperty,
        natureOfLand: this.data.natureOfLand,
        acquiredEmployee: this.data.acquiredEmployee,
        buyerName:this.data.buyerName,
        buyerRelationship:this.data.buyerRelationship,
        dateOfAcquisition:this.data.dateOfAcquisition,
        modeOfAcquired:this.data.modeOfAcquired,
        sellerName:this.data.sellerName,
        valueOfProperty:this.data.valueOfProperty,
        sanctionedDetails:this.data.sanctionedDetails,
        annualIncome:this.data.annualIncome,
        moveImmove:this.data.moveImmove,
        remarks:this.data.remarks
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }



}
