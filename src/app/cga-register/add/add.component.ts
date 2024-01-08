import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  cgaRegFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  fileInput:any;
  id:any;
  data:any;
  personalInfoTabData: MatTableDataSource<any>;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;
  selectedDocument: File;
  loader: any;
  base64SaleDeed:any;


  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    
    
    this.cgaRegFormGrp = this.cb.group({
      regSerialNo:[''],
      nameOfTheStaff:[''],
      dateOfDeath:[''],
      dateOfApplication:[''],
      applCertificateFilePath:[''],
      relationship:[''],
      appDob:[''],
      appAge:[''],
      appEduQualification:[''],
      applCertificate:[''],
      deathCertificateFilePath:[''],
      legalHeirCertificateFilePath:[''],
      eqCertificate:[''],
      transferCertificateFilePath:[''],
      nocCertificateFilePath:[''],
      communityCertificateFileName:[''],
      proformaCertificateFilePath:[''],
      indigentCertificateFilePath:[''],
      drivingCertificateFilePath:[''],
      driExpCertificateFilePath:[''],
      typingCertificateFilePath:[''],
      eligibleStatus:[''],
      appointmentStatus:[''],
      remarks:[''],
    
    })
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

onSubmit() {
    
  if (this.cgaRegFormGrp.valid) {
    console.log("Working1")
    let data={
      "regSerialNo": this.cgaRegFormGrp.value.regSerialNo,
      "nameOfTheStaff": this.cgaRegFormGrp.value.nameOfTheStaff,
      "dateOfDeath": this.cgaRegFormGrp.value.dateOfDeath,
      "dateOfApplication": this.cgaRegFormGrp.value.dateOfApplication,
      "applCertificateFilePath": this.cgaRegFormGrp.value.applCertificateFilePath,
      "relationship": this.cgaRegFormGrp.value.relationship,
      "appDob": this.cgaRegFormGrp.value.appDob,
      "appAge": this.cgaRegFormGrp.value.appAge,
      "appEduQualification": this.cgaRegFormGrp.value.appEduQualification,
      "applCertificate": this.cgaRegFormGrp.value.applCertificate,
      "deathCertificateFilePath": this.cgaRegFormGrp.value.deathCertificateFilePath,
      "legalHeirCertificateFilePath": this.cgaRegFormGrp.value.legalHeirCertificateFilePath,
      "eqCertificate": this.cgaRegFormGrp.value.eqCertificate,
      "transferCertificateFilePath": this.cgaRegFormGrp.value.transferCertificateFilePath,
      "nocCertificateFilePath": this.cgaRegFormGrp.value.nocCertificateFilePath,
      "communityCertificateFileName":  this.cgaRegFormGrp.value.communityCertificateFileName,
      "proformaCertificateFilePath": this.cgaRegFormGrp.value.proformaCertificateFilePath,
      "indigentCertificateFilePath": this.cgaRegFormGrp.value.indigentCertificateFilePath,
      "drivingCertificateFilePath":  this.cgaRegFormGrp.value.drivingCertificateFilePath,
      "driExpCertificateFilePath":  this.cgaRegFormGrp.value.driExpCertificateFilePath,
      "typingCertificateFilePath":  this.cgaRegFormGrp.value.typingCertificateFilePath,
      "eligibleStatus": this.cgaRegFormGrp.value.eligibleStatus,
      "appointmentStatus":  this.cgaRegFormGrp.value.appointmentStatus,
      "remarks":  this.cgaRegFormGrp.value.remarks,
      
  }
    // this.employeeService.saveEmpExamHistory(this.cgaRegFormGrp.value).subscribe(
      this.employeeService.saveCgaRegister(data).subscribe(

      (response) => {
        // Handle the response from the server (e.g., show a success message)
        console.log('Data saved:', response);
        
        // Navigate to the "exam-history/list" page
        this.router.navigate(['/cga-register/list']);
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


}
