import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:any;
  nid:any;
  data:any;
  nocDetailsFrmGrp:FormGroup;
  submitted:false;
  types: string[] = [];
  
  selectedStatus: string;
  selectedTest:string;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  
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


    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getNOCDetailsBynId();
     
      console.log(this.id)
    });

  }

  

  getNOCDetailsBynId() {
    console.log(this.id);
        this.employeeService.getNOCDetailsBynId(this.id).subscribe(
          (response) => {
      this.data=response.data;
      this.nocDetailsFrmGrp.patchValue({
                empId:this.data.empId,
                cadreName: this.data.cadreName,
                empName: this.data.empName,
                dateOfBirth: this.data.dateOfBirth,
                cadreCode: this.data.cadreCode,
                dateOfJointService: this.data.dateOfJointService,
                nocApplied: this.data.nocApplied,
                nocPurpose:this.data.nocPurpose,
                nocDate:this.data.nocDate,
                remarks: this.data.remarks,
                documentPath: this.data.documentPath,
               
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }

  
  onUpdate(id: number) {
    if (this.nocDetailsFrmGrp.valid) {
      const updatedData = {
        // Include the ID of the existing record
        nid: this.id,
        empName: this.nocDetailsFrmGrp.value.empName,
        empId:this.nocDetailsFrmGrp.value.empId,
        cadreCode: this.nocDetailsFrmGrp.value.cadreCode,
        cadreName: this.nocDetailsFrmGrp.value.cadreName,
        dateOfBirth: this.nocDetailsFrmGrp.value.dateOfBirth,
        dateOfJointService: this.nocDetailsFrmGrp.value.dateOfJointService,
        nocApplied: this.nocDetailsFrmGrp.value.nocApplied,
        nocPurpose: this.nocDetailsFrmGrp.value.nocPurpose,
        nocDate: this.nocDetailsFrmGrp.value.nocDate,
        remarks: this.nocDetailsFrmGrp.value.remarks,
        documentPath: this.nocDetailsFrmGrp.value.documentPath,
       
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.saveEmpNOC(updatedData).subscribe(
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
        this.getNOCDetailsBynId();
      }, 1000);
      this.router.navigate(['/noc-details/list']);

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

applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
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
 

}
