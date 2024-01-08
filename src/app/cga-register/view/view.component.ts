import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  
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


    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getCgaRegisterById();
     
      console.log(this.id)
    });


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

getCgaRegisterById() {
  console.log(this.id);
      this.employeeService.getCgaRegisterById(this.id).subscribe(
        (response) => {
    this.data=response.data;
    this.cgaRegFormGrp.patchValue({
              
              regSerialNo:this.data.regSerialNo,
              nameOfTheStaff:this.data.nameOfTheStaff,
              dateOfDeath:this.data.dateOfDeath,
              dateOfApplication:this.data.dateOfApplication,
              applCertificateFilePath:this.data.applCertificateFilePath,
              relationship:this.data.relationship,
              appDob:this.data.appDob,
              appAge:this.data.appAge,
              appEduQualification:this.data.appEduQualification,
              applCertificate:this.data.applCertificate,
              deathCertificateFilePath:this.data.deathCertificateFilePath,
              legalHeirCertificateFilePath:this.data.legalHeirCertificateFilePath,
              eqCertificate:this.data.eqCertificate,
              transferCertificateFilePath:this.data.transferCertificateFilePath,
              nocCertificateFilePath:this.data.nocCertificateFilePath,
              communityCertificateFileName:this.data.communityCertificateFileName,
              proformaCertificateFilePath:this.data.proformaCertificateFilePath,
              indigentCertificateFilePath:this.data.indigentCertificateFilePath,
              drivingCertificateFilePath:this.data.drivingCertificateFilePath,
              driExpCertificateFilePath:this.data.driExpCertificateFilePath,
              typingCertificateFilePath:this.data.typingCertificateFilePath,
              eligibleStatus:this.data.eligibleStatus,
              appointmentStatus:this.data.appointmentStatus,
              remarks:this.data.remarks,
            });
    
          console.log('Response:', response);
    
        },
        (error) => {
    
          console.error('Error:', error);
    
        }
      );
    }


}
