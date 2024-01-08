import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  nocDetailsFrmGrp:FormGroup;
  submitted:false;
  types: string[] = [];
  
  selectedStatus: string;
  selectedTest:string;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  id:number;
  data:any;
  
  couponsListData: any;
  selectedDocument: File;
  loader: any;
  base64SaleDeed:any;

  status = [
    { 'status': "Yes", 'value': true },
    { 'status': "No", 'value': false },
   
  ]

  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {

    this.nocDetailsFrmGrp = this.cb.group({
      empId:[''],
      empName:[''],
      cadreCode:[''],
      cadreName:[''],
      dateOfBirth:[''],
      dateOfJointService:[''],
      nocApplied:[''],
      nocPurpose:[''],
      nocDate:[''],
      remarks:[''],
      documentPath:['']
          
    })
  }


  onSubmit() {
    
    if (this.nocDetailsFrmGrp.valid) {
      console.log("Working1")
      let data={
        "empId": this.nocDetailsFrmGrp.value.empId,
        "empName": this.nocDetailsFrmGrp.value.empName,
        "cadreCode": this.nocDetailsFrmGrp.value.cadreCode,
        "cadreName": this.nocDetailsFrmGrp.value.cadreName,
        "dateOfBirth": this.nocDetailsFrmGrp.value.dateOfBirth,
        "dateOfJointService": this.nocDetailsFrmGrp.value.dateOfJointService,
        "nocApplied": this.nocDetailsFrmGrp.value.nocApplied,
        "nocPurpose": this.nocDetailsFrmGrp.value.nocPurpose,
        "nocDate": this.nocDetailsFrmGrp.value.nocDate,
        "remarks": this.nocDetailsFrmGrp.value.remarks,
        "documentPath": this.nocDetailsFrmGrp.value.documentPath,
        
        
    }
      // this.employeeService.saveEmpExamHistory(this.nocDetailsFrmGrp.value).subscribe(
        this.employeeService.saveEmpNOC(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/noc-details/list']);
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
    if (this.selectedStatus?.length || this.selectedStatus?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.selectedStatus?.length && !this.selectedStatus?.includes(item.type[0])) {
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
  


  applyTypeFilter1(event:any) {
    debugger
    console.log('event',event);
    
    if (this.selectedStatus?.length || this.selectedStatus?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.selectedStatus?.length && !this.selectedStatus?.includes(item.type[0])) {
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
  applyFilter(event:any) {
    let value=this.nocDetailsFrmGrp.controls['status'].value;
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
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
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

onButtonClicked(){

  // console.log(id);
  
  let empId=this.nocDetailsFrmGrp.value.empId ?JSON.parse(this.nocDetailsFrmGrp.value.empId):'' 
  this.employeeService.getCommonDetails(empId).subscribe(
    (response) => {
      console.log('id',this.id);
      
this.data=response.data;
this.nocDetailsFrmGrp.patchValue({
         
         
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


}
