import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';


@Component({
  selector: 'app-add-division-office',
  templateUrl: './add-division-office.component.html',
  styleUrls: ['./add-division-office.component.css']
})
export class AddDivisionOfficeComponent {

  myForm: FormGroup;
  isDuplicateCode: boolean;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private employeeService:EmployeeService,  ) {

    this.myForm = this.formBuilder.group({
      v_Division_Code: '',
      v_Division_Name: '',
      v_Select_Circle: '',
      v_Division_Place: '',
      v_Office_Head:'',
      v_Address: '',
      n_Pincode: '',
      n_Mobile:'',
      v_Phone: '',
      v_Email: '',
    });
  }




  // saveDivisionsOffice(): void {
  //   const formValue = this.myForm.value;
  //   const vDivisionCodeControl = this.myForm.get('v_Division_Code');
  
  //   this.employeeService.uniqueDivisionCode(vDivisionCodeControl.value).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       if (response.message === "Division code already exists") {
  //         window.alert(response.message);
  
  //         // Disable all form controls except v_Division_Code
  //         Object.keys(this.myForm.controls).forEach(controlName => {
  //           if (controlName !== 'v_Division_Code') {
  //             this.myForm.get(controlName).disable();
  //           }
  //         });
  //       } else {
  //         this.employeeService.saveDivisionsOffice(formValue).subscribe(
  //           (response: any) => {
  //             // Enable all form controls
  //             this.myForm.enable();
  
  //             if (response.message === "Division code already exists") {
  //               window.alert('Division code already exists');
  //             }
  //             console.log('Saved Division Office:', response);
  //             alert('The Division data was added successfully!');
  //             window.location.reload();
  //           },
  //           (error: any) => {
  //             console.error('Error while saving Division Office:', error);
  //           }
  //         );
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  
  // uniqueDivisionCode(event: any) {
  //   const id = event.target.value;
  //   const vDivisionCodeControl = this.myForm.get('v_Division_Code');
  //   this.employeeService.uniqueDivisionCode(id).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       if (response.message === "Division code already exists") {
  //         window.alert(response.message);
  
  //         // Disable all form controls except v_Division_Code
  //         Object.keys(this.myForm.controls).forEach(controlName => {
  //           if (controlName !== 'v_Division_Code') {
  //             this.myForm.get(controlName).disable();
  //           }
  //         });
  //       } else {
  //         // Enable all form controls
  //         this.myForm.enable();
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
          // this.toastr.error(response.message, 'Error');
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

  
  saveDivisionsOffice(): void {
    if (this.isDuplicateCode) {
      window.alert('The Head Office data cannot be added due to duplicate code.');
      return; // Do not proceed with saving if the code is duplicate
    }
  
    const formValue = this.myForm.value;
    this.employeeService.saveDivisionsOffice(formValue).subscribe(
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
