import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  cellCaseFrmGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  selectedAuthority: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  id:any;
  data:any;
 
  additionalRows: any;
  selectedDocument: File;
  loader: any;
  base64SaleDeed:any;

  status = [
    { 'status': "Mother", 'value': true },
    { 'status': "Father", 'value': false },
    { 'status': "Spouse", 'value': false },
    { 'status': "Daughter", 'value': false },
    { 'status': "Son", 'value': false },
   
  ]

  authority=[
    { 'authority': "Managing Director", 'value': true},
        { 'authority': "Board & Govt", 'value': true },
    { 'authority': "Government", 'value': true },
  ]

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient) { }


  ngOnInit(): void {

    this.cellCaseFrmGrp = this.fb.group({
      empId: ['' ],
      empName: ['' ],
      gender: ['' ],
      cadreCode: ['' ],
      cadreName: ['' ],
      cadreCategory: ['' ],
      officeCode: ['' ],
      officeName: ['' ],
      fileNo: ['' ],
      natureOfCase: ['' ],
      modeOfCharge: ['' ],
      suspensionMade: ['' ],
      dateOfSuspension: ['' ],
      noOfCharges: ['' ],
      dateOfCharge: ['' ],
      replyReceived: ['' ],
      ioAppointedDate: ['' ],
      nameOfIo: ['' ],
      designationOfIo: ['' ],
      ioReportReceivedDate: ['' ],
      ioFindings: ['' ],
      noOfChargesProven: ['' ],
      noOfChargesNotProven: ['' ],
      noOfChargesPartlyProven: ['' ],
      frReceivedDate: ['' ],
      comptAuthority: ['' ],
      dateOfFinalOrder: ['' ],
      finalOrderProceedings: ['' ],
      appealPreferredTo: ['' ],
      appealStatus: ['' ],     
      finalOrderProceedings1: ['' ],  
      dcRecommendationStatus: ['' ],
      boardResolutionNo: ['' ],
      boardResolutionDate: ['' ],
      dateOfBoardFinalOrder: ['' ],  
      finalOrderProceedings2: ['' ],  
      appealPreferredTo1: ['' ],  
      appealStatus1: ['' ],  
      finalOrderProceedings3: ['' ],  
      dateOfProposalSentToGovt: ['' ],
      goNumber: ['' ],
      dateOfGO: ['' ],
      finalOrderProceedings4: ['' ],  
      appealPreferredTo2: ['' ],  
      appealStatus2: ['' ],  
      finalOrderProceedings5: ['' ],  
    })
    

    
    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getDCellCaseDetailBynId();
     
      console.log(this.id)
    });
    

  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }



  applyTypeFilter() {
    if (this.selectedStatus?.length || this.selectedAuthority?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.selectedAuthority?.length && !this.selectedAuthority?.includes(item.type[0])) {
          return false;
        }
  
        // Check if the item's colour is included in the selectedColourValue array
        if (this.selectedAuthority?.length && !this.selectedAuthority?.includes(item.couponStatus[0])) {
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
  

  applyTypeFilter1(event:any) {
    debugger
    console.log('event',event);
    
    if (this.selectedStatus?.length || this.selectedAuthority?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.selectedAuthority?.length && !this.selectedAuthority?.includes(item.type[0])) {
          return false;
        }
  
        // Check if the item's colour is included in the selectedColourValue array
        if (this.selectedAuthority?.length && !this.selectedAuthority?.includes(item.couponStatus[0])) {
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
  applyTypeFilter2(event:any) {
    let value=this.cellCaseFrmGrp.controls['status'].value;
    debugger
    console.log('value',value);
    
  
  }

  
onFileSelected(event: any) {
  this.selectedDocument = event.target.files[0];
  console.log(this.selectedDocument);
  this.uploadFile();
}

uploadFile() {
  if (this.selectedDocument) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.base64SaleDeed = reader.result.toString().split(',')[1]; // Extract the base64 part
      console.log(this.base64SaleDeed);
     
    };
    reader.readAsDataURL(this.selectedDocument);
  }
}

async uploadFiles() {
  const dialogRef = this.dialog.open(DialogComponent, {
    width: '500px',
    data: {
      message: 'Are you sure you want to send the sale deed files?',
      confirmBackgroundColor: 'green',
      cancelBackgroundColor: 'red',
      confirmTextColor: 'white',
      cancelTextColor: 'white',
      confirmText: 'Yes',
      cancelText: 'No'
    }
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result === true) {
      this.processFiles();
    }
  });


}

async processFiles() {
try{
  this.loader.start();
  this.base64SaleDeed = await this.readFileAsBase64(this.selectedDocument);

  

}catch (error) {
      this.loader.stop();
      console.error('Error processing or uploading data:', error);
    }

}
 
 
  removeDataPrefix(base64Data: string): string {
    const prefixes = [
      'data:application/pdf;base64,',
      'data:image/png;base64,',
      'data:image/jpeg;base64,',
      'data:image/jpg;base64,'
    ];

    for (const prefix of prefixes) {
      if (base64Data.startsWith(prefix)) {
        return base64Data.slice(prefix.length);
      }
    }
    return base64Data;
  }


  async readFileAsBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        resolve(this.removeDataPrefix(result));
      };
      reader.onerror = (event) => {
        reject(event.target?.error);
      };
      reader.readAsDataURL(file);
    });
  }


openExportDialog(): void {

}

generateExcel(headers: string[]) {

}

getDCellCaseDetailBynId() {
  console.log(this.id);
      this.employeeService.getDCellCaseDetailBynId(this.id).subscribe(
        (response) => {
    this.data=response.data;
    this.cellCaseFrmGrp.patchValue({
      empId: this.data.empId,
      empName: this.data.empName,
      gender: this.data.gender,
      cadreCode: this.data.cadreCode,
      cadreName: this.data.cadreName,
      cadreCategory: this.data.cadreCategory,
      officeCode: this.data.officeCode,
      officeName: this.data.officeName,
      fileNo: this.data.fileNo,
      natureOfCase: this.data.natureOfCase,
      modeOfCharge: this.data.modeOfCharge,
      suspensionMade: this.data.suspensionMade,
      dateOfSuspension: this.data.dateOfSuspension,
      noOfCharges: this.data.noOfCharges,
      dateOfCharge: this.data.dateOfCharge,
      replyReceived: this.data.replyReceived,
      ioAppointedDate: this.data.ioAppointedDate,
      nameOfIo: this.data.nameOfIo,
      designationOfIo: this.data.designationOfIo,
      ioReportReceivedDate: this.data.ioReportReceivedDate,
      ioFindings: this.data.ioFindings,
      noOfChargesProven: this.data.noOfChargesProven,
      noOfChargesNotProven: this.data.noOfChargesNotProven,
      noOfChargesPartlyProven: this.data.noOfChargesPartlyProven,
      frReceivedDate: this.data.frReceivedDate,
      comptAuthority: this.data.comptAuthority,
      dateOfFinalOrder: this.data.dateOfFinalOrder,
      finalOrderProceedings: this.data.finalOrderProceedings,
      appealPreferredTo: this.data.appealPreferredTo,
      appealStatus: this.data.appealStatus,     
      finalOrderProceedings1: this.data.finalOrderProceedings1,  
      dcRecommendationStatus: this.data.dcRecommendationStatus,
      boardResolutionNo: this.data.boardResolutionNo,
      boardResolutionDate: this.data.boardResolutionDate,
      dateOfBoardFinalOrder: this.data.dateOfBoardFinalOrder,  
      finalOrderProceedings2: this.data.finalOrderProceedings2,  
      appealPreferredTo1: this.data.appealPreferredTo1,  
      appealStatus1: this.data.appealStatus1,  
      finalOrderProceedings3: this.data.finalOrderProceedings3,  
      dateOfProposalSentToGovt: this.data.dateOfProposalSentToGovt,
      goNumber: this.data.goNumber,
      dateOfGO: this.data.dateOfGO,
      finalOrderProceedings4: this.data.finalOrderProceedings4,  
      appealPreferredTo2: this.data.appealPreferredTo2,  
      appealStatus2: this.data.appealStatus2,  
      finalOrderProceedings5: this.data.finalOrderProceedings5,  
            });
    
          console.log('Response:', response);
    
        },
        (error) => {
    
          console.error('Error:', error);
    
        }
      );
    }

}
