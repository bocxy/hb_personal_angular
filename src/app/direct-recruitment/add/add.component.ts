import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  directRecrutmntFrmGrp:FormGroup;
  submitted = false;
  types: string[] = [];
 
  dialog: any;
  additionalRows: any;
  selectedDocument: File;
  loader: any;
  base64SaleDeed:any;
  id:any;
  data:any;

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    
    
    this.directRecrutmntFrmGrp = this.cb.group({
      cadreCode:[''],
      cadreName:[''],
      cadreCategory:[''],
      noOfPostApproved:[''],
      bdResNumber:[''],
      bdResDate:[''],
      propSentToGovtOn:[''],
      bdResReference:[''],
      goObtained:[''],
      propStatus:[''],
      propSentToTnpscOn:[''],
      goReference:[''],
      candSentToBoardOn:[''],
      tnpscStatus:[''],
      noOfPersonsJoined:[''],
      dateOfAppointment:[''],
      remarks:['']
    
    })
  }


  onSubmit() {
    
    if (this.directRecrutmntFrmGrp.valid) {
      console.log("Working1")
    //   let data={
    //     "cadreCode": this.directRecrutmntFrmGrp.value.cadreCode,
    //     "cadreName": this.directRecrutmntFrmGrp.value.cadreName,
    //     "cadreCategory": this.directRecrutmntFrmGrp.value.cadreCategory,
    //     "noOfPostApproved": this.directRecrutmntFrmGrp.value.noOfPostApproved,
    //     "bdResNumber": this.directRecrutmntFrmGrp.value.bdResNumber,
    //     "bdResDate": this.directRecrutmntFrmGrp.value.bdResDate,
    //     "propSentToGovtOn": this.directRecrutmntFrmGrp.value.propSentToGovtOn,
    //     "bdResReference": this.directRecrutmntFrmGrp.value.bdResReference,
    //     "goObtained": this.directRecrutmntFrmGrp.value.goObtained,
    //     "propStatus": this.directRecrutmntFrmGrp.value.propStatus,
    //     "propSentToTnpscOn": this.directRecrutmntFrmGrp.value.propSentToTnpscOn,
    //     "goReference": this.directRecrutmntFrmGrp.value.goReference,
    //     "candSentToBoardOn": this.directRecrutmntFrmGrp.value.candSentToBoardOn,
    //     "tnpscStatus": this.directRecrutmntFrmGrp.value.tnpscStatus,
    //     "noOfPersonsJoined": this.directRecrutmntFrmGrp.value.noOfPersonsJoined,
    //     "dateOfAppointment":  this.directRecrutmntFrmGrp.value.dateOfAppointment,
    //     "remarks": this.directRecrutmntFrmGrp.value.remarks,
       
        
    // }
      // this.employeeService.saveEmpExamHistory(this.directRecrutmntFrmGrp.value).subscribe(
       
      let data= {
        "cadreCode": this.directRecrutmntFrmGrp.value.cadreCode,
        "cadreName": this.directRecrutmntFrmGrp.value.cadreName,
        "cadreCategory": this.directRecrutmntFrmGrp.value.cadreCategory,
        "noOfPostApproved": this.directRecrutmntFrmGrp.value.noOfPostApproved,
        "bdResNumber": this.directRecrutmntFrmGrp.value.bdResNumber,
        "bdResDate": this.directRecrutmntFrmGrp.value.bdResDate,
        "propSentToGovtOn": this.directRecrutmntFrmGrp.value.propSentToGovtOn,
        "propStatus": this.directRecrutmntFrmGrp.value.propStatus,
        "goObtained": this.directRecrutmntFrmGrp.value.goObtained,
       
        "propSentToTnpscOn": this.directRecrutmntFrmGrp.value.propSentToTnpscOn,
        "tnpscStatus": this.directRecrutmntFrmGrp.value.tnpscStatus,
        "candSentToBoardOn": this.directRecrutmntFrmGrp.value.candSentToBoardOn,
        "dateOfAppointment": this.directRecrutmntFrmGrp.value.dateOfAppointment,
        "noOfPersonsJoined": this.directRecrutmntFrmGrp.value.noOfPersonsJoined,
        "createdOn": this.directRecrutmntFrmGrp.value.createdOn,
        "updatedOn": this.directRecrutmntFrmGrp.value.updatedOn,
        "goReference": this.directRecrutmntFrmGrp.value.goReference,
        "bdResReference": this.directRecrutmntFrmGrp.value.bdResReference
       
    }
      
      this.employeeService.saveDirectRecruitment(data).subscribe(
          

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/direct-recruitment/list']);
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

  getCadreNameCategory(){
    const cadreCode = this.directRecrutmntFrmGrp.value.cadreCode;

    if (!cadreCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getCadreNameCategory(cadreCode).subscribe(
      (response:any) => {
        console.log(response);
        this.directRecrutmntFrmGrp.patchValue({
          cadreCategory: response.data.Cadre_Category,
          cadreName:response.data.Cadre_Name
          // Update other form controls as needed
        });
      },
      (error:any) => {
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
