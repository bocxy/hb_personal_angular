import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ConfirmDialogComponent } from 'src/app/shared-module/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

 
 
  movableFormGrp: FormGroup;
  
  
 
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;
  
  fileInput:any;
  selectedValue: string;
  selectedStatus: string;
  noData = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;
  selectedDocument: File;
  loader: any;
  base64SaleDeed:any;
  id:number;
  data:any;



  status = [
    { 'status': "Yes", 'value': true },
    { 'status': "No", 'value': false },
   
  ]
 


  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient) { }

  ngOnInit(): void {
   

    
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
      propertyDocumentPath: [''],
      propertyDocument:['']
      
    })

   


}


onButtonClicked(){

  // console.log(id);
  
  let empId=this.movableFormGrp.value.empId ?JSON.parse(this.movableFormGrp.value.empId):'' 
  this.employeeService.getCommonDetails(empId).subscribe(
    (response) => {
      console.log('id',this.id);
      
this.data=response.data;
this.movableFormGrp.patchValue({
         
         
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
    
  if (this.movableFormGrp.valid) {
    console.log("Working1")
    let data={
      "empId": this.movableFormGrp.value.empId,
      "empName": this.movableFormGrp.value.empName,
      "cadreCode": this.movableFormGrp.value.cadreCode,
      "cadreName": this.movableFormGrp.value.cadreName,
      "dateOfBirth": this.movableFormGrp.value.dateOfBirth,
      "dateOfJointService": this.movableFormGrp.value.dateOfJointService,
      "sourceOfIncome": this.movableFormGrp.value.sourceOfIncome,
      "valueOfProperty": this.movableFormGrp.value.valueOfProperty,
      "propRegisteredName": this.movableFormGrp.value.propertyDocumentName,
      "dateOfPurchase": this.movableFormGrp.value.dateOfPurchase,
      "descOfProperty": this.movableFormGrp.value.descOfProperty,
      "incomeFromProp": this.movableFormGrp.value.incomeFromProp,
      "propertyDocumentName": this.movableFormGrp.value.propertyDocumentName,
      "propertyDocumentPath": this.movableFormGrp.value.propertyDocumentPath,
      "moveImmove": "Movable",
      "propertyDocument": this.base64SaleDeed
     
      
  }
  console.log(data);
    // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
      this.employeeService.saveEmpMovable(data).subscribe(

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

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}


}
