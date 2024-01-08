import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-head-office',
  templateUrl: './add-head-office.component.html',
  styleUrls: ['./add-head-office.component.css']
})
export class AddHeadOfficeComponent {

  myForm: FormGroup;
  isOfficeCodeFrozen = false;
  isDuplicateCode: boolean = false;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private employeeService:EmployeeService ) {

    this.myForm = this.formBuilder.group({
      v_Office_Code:  ['', Validators.required],
      v_HeadOffice_Name: '',
      v_HeadOffice_Place: '',
      v_Address: '',
      n_Pincode: '',
      n_Mobile:'',
      v_Office_Head:'',
      v_Phone: '',
      v_Email: '',
      
    });

   
  }




  // uniqueOfficeCode(event: any) {
  //   const id = event.target.value;
  //   this.employeeService.uniqueOfficeCode(id).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       if (response.message === "Office code already exists") {
  //         window.alert(response.message);
  //         this.isDuplicateCode = true; // Set the flag to true if the code is duplicate
  //       } else {
  //         this.isDuplicateCode = false; // Reset the flag if the code is not duplicate
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  
 
  // saveHeadOffice(): void {
  //   const formValue = this.myForm.value;
  //   const vHeadCodeControl = this.myForm.get('v_Office_Code');
  
  //   this.employeeService.uniqueOfficeCode(vHeadCodeControl.value).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       if (response.message === "Office code already exists") {
  //         window.alert(response.message);
  
  //         // Disable all form controls except v_Circle_Code
  //         Object.keys(this.myForm.controls).forEach(controlName => {
  //           if (controlName !== 'v_Office_Code') {
  //             this.myForm.get(controlName).disable();
  //           }
  //         });
  //       } else {
  //         this.employeeService.saveHeadOffice(formValue).subscribe(
  //           (response: any) => {
  //             // Enable all form controls
  //             this.myForm.enable();
  
  //             if (response.message === "Office code already exists") {
  //               window.alert('Office code already exists');
  //             }
  //             console.log('Saved Circle Office:', response);
  //             alert('The Circle data was added successfully!');
  //             window.location.reload();
  //           },
  //           (error: any) => {
  //             console.error('Error while saving Circle Office:', error);
  //           }
  //         );
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  

  uniqueOfficeCode(event: any) {
    const id = event.target.value;
    this.employeeService.uniqueOfficeCode(id).subscribe(
      (response: any) => {
        console.log(response);
        if (response.message === "Office code already exists") {
          window.alert(response.message);
  
          // Disable all form controls except v_Circle_Code
          Object.keys(this.myForm.controls).forEach(controlName => {
            if (controlName !== 'v_Office_Code') {
              this.myForm.get(controlName).disable();
            }
          });
        } else {
          // Reset the disabled state for all form controls
          Object.keys(this.myForm.controls).forEach(controlName => {
            this.myForm.get(controlName).enable();
          });
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  
  saveHeadOffice(): void {
    if (this.isDuplicateCode) {
      window.alert('The Head Office data cannot be added due to duplicate code.');
      return; // Do not proceed with saving if the code is duplicate
    }
  
    const formValue = this.myForm.value;
    this.employeeService.saveHeadOffice(formValue).subscribe(
      (response) => {
        console.log('Saved Circle Office:', response);
        alert('The Circle data was added successfully!');
        window.location.reload();
      },
      (error) => {
        console.error('Error while saving Circle Office:', error);
      }
    );
  }

}
