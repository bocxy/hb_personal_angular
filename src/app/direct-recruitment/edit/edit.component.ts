import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  directRecrutmntFrmGrp:FormGroup;
  submitted = false;
  id:any;
  data:any;
  dialog: any;
  additionalRows: any;
  selectedDocument: File;
  loader: any;
  base64SaleDeed:any;

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

    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getDirectRecruitmentBynId();
     
      console.log(this.id)
    });


  }

  onUpdate(id: number) {
    if (this.directRecrutmntFrmGrp.valid) {
      const updatedData = {
        // Include the ID of the existing record
        nid: this.id,
       
       
        cadreCode:this.directRecrutmntFrmGrp.value.cadreCode,
        cadreName:this.directRecrutmntFrmGrp.value.cadreName,
        cadreCategory:this.directRecrutmntFrmGrp.value.cadreCategory,
        noOfPostApproved:this.directRecrutmntFrmGrp.value.noOfPostApproved,
        bdResNumber:this.directRecrutmntFrmGrp.value.bdResNumber,
        bdResDate:this.directRecrutmntFrmGrp.value.bdResDate,
        propSentToGovtOn:this.directRecrutmntFrmGrp.value.propSentToGovtOn,
        bdResReference:this.directRecrutmntFrmGrp.value.bdResReference,
        goObtained:this.directRecrutmntFrmGrp.value.goObtained,
        propStatus:this.directRecrutmntFrmGrp.value.propStatus,
        propSentToTnpscOn:this.directRecrutmntFrmGrp.value.propSentToTnpscOn,
        goReference:this.directRecrutmntFrmGrp.value.goReference,
        candSentToBoardOn:this.directRecrutmntFrmGrp.value.candSentToBoardOn,
        tnpscStatus:this.directRecrutmntFrmGrp.value.tnpscStatus,
        noOfPersonsJoined:this.directRecrutmntFrmGrp.value.noOfPersonsJoined,
        dateOfAppointment:this.directRecrutmntFrmGrp.value.dateOfAppointment,
        remarks:this.directRecrutmntFrmGrp.value.remarks,
      
       
      };
     
        
       // Send an HTTP PUT request to update the data in the database
  this.employeeService.saveDirectRecruitment(updatedData).subscribe(
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
        this.getDirectRecruitmentBynId();
      }, 1000);
      this.router.navigate(['/direct-recruitment/list']);

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


getDirectRecruitmentBynId() {
  console.log(this.id);
      this.employeeService.getDirectRecruitmentBynId(this.id).subscribe(
        (response) => {
    this.data=response.data;
    this.directRecrutmntFrmGrp.patchValue({
             
              
              cadreCode:this.data.cadreCode,
              cadreName:this.data.cadreName,
              cadreCategory:this.data.cadreCategory,
              noOfPostApproved:this.data.noOfPostApproved,
              bdResNumber:this.data.bdResNumber,
              bdResDate:this.data.bdResDate,
              propSentToGovtOn:this.data.propSentToGovtOn,
              bdResReference:this.data.bdResReferencePath,
              goObtained:this.data.goObtained,
              propStatus:this.data.propStatus,
              propSentToTnpscOn:this.data.propSentToTnpscOn,
              goReference:this.data.goReferencePath,
              candSentToBoardOn:this.data.candSentToBoardOn,
              tnpscStatus:this.data.tnpscStatus,
              noOfPersonsJoined:this.data.noOfPersonsJoined,
              dateOfAppointment:this.data.dateOfAppointment,
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
