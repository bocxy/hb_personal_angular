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

  cgaDetailsFrmGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  fileInput:any;

  selectedDocument: File;
  loader: any;
  base64SaleDeed:any;
  dialog: any;
  id:any;
  data:any;

  
  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    this.cgaDetailsFrmGrp = this.cb.group({
      cadreCode:[''],
      cadreName:[''],
      cadreCategory:[''],
      noOfPostApproved:[''],
      bdResDate:[''],
      bdResNumber:[''],
      bdResReference:[''],
      noOfPersonsJoined:[''],
      dateOfAppointment:[''],
      
    
    })
  }

  onButtonClicked(){

    // console.log(id);
    
    let cadreCode=this.cgaDetailsFrmGrp.value.cadreCode ?JSON.parse(this.cgaDetailsFrmGrp.value.cadreCode):'' 
    this.employeeService.getCadreNameCategory(cadreCode).subscribe(
      (response) => {
        console.log('id',this.id);
        
  this.data=response.data;
  this.cgaDetailsFrmGrp.patchValue({
           
           
   
            
            cadreName:this.data.cadreName,
            
            cadreCategory:this.data.cadreCategory
          });
  
        console.log('Response:', response);
  
      },
      (error) => {
  
        console.error('Error:', error);
  
      }
    );
  }

  onSubmit() {
    
    if (this.cgaDetailsFrmGrp.valid) {
      console.log("Working1")
    //   let data={
    //     "cadreCode": this.cgaDetailsFrmGrp.value.cadreCode,
    //     "cadreName": this.cgaDetailsFrmGrp.value.cadreName,
    //     "cadreCategory": this.cgaDetailsFrmGrp.value.cadreCategory,
    //     "noOfPostApproved": this.cgaDetailsFrmGrp.value.noOfPostApproved,
    //     "bdResDate": this.cgaDetailsFrmGrp.value.bdResDate,
    //     "bdResNumber": this.cgaDetailsFrmGrp.value.bdResNumber,
    //     "bdResReferencePath": this.cgaDetailsFrmGrp.value.bdResReferencePath,
    //     "noOfPersonsJoined": this.cgaDetailsFrmGrp.value.noOfPersonsJoined,
    //     "dateOfAppointment": this.cgaDetailsFrmGrp.value.dateOfAppointment
          
    // }
    let data= {
      "cadreCode":  this.cgaDetailsFrmGrp.value.cadreCode,
      "cadreName": this.cgaDetailsFrmGrp.value.cadreName,
      "cadreCategory": this.cgaDetailsFrmGrp.value.cadreCategory,
      "noOfPostApproved": this.cgaDetailsFrmGrp.value.noOfPostApproved,
      "bdResNumber": this.cgaDetailsFrmGrp.value.bdResNumber,
      "bdResDate": this.cgaDetailsFrmGrp.value.bdResDate,
     
      //  "bdResReference": this.cgaDetailsFrmGrp.value.bdResReference,
      "dateOfAppointment": this.cgaDetailsFrmGrp.value.dateOfAppointment,
      "noOfPersonsJoined": this.cgaDetailsFrmGrp.value.noOfPersonsJoined,
      
      "bdResReference": this.cgaDetailsFrmGrp.value.bdResReference
     
  }
      // this.employeeService.saveEmpExamHistory(this.cgaDetailsFrmGrp.value).subscribe(
        this.employeeService.saveCgaDetails(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/cga-details/list']);
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
  

  getCadreNameCategory(){
    const cadreCode = this.cgaDetailsFrmGrp.value.cadreCode;

    if (!cadreCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getCadreNameCategory(cadreCode).subscribe(
      (response:any) => {
        console.log(response);
        this.cgaDetailsFrmGrp.patchValue({
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

}
