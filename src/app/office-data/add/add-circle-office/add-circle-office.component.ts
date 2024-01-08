import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';

import { FormBuilder,FormGroup } from '@angular/forms';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add-circle-office',
  templateUrl: './add-circle-office.component.html',
  styleUrls: ['./add-circle-office.component.css']
})
export class AddCircleOfficeComponent {

  myForm: FormGroup;

  constructor(private employeeService:EmployeeService,private http: HttpClient, private formBuilder: FormBuilder, ) {

    this.myForm = this.formBuilder.group({
      v_Circle_Code: '',
      v_Circle_Name: '',
      v_Type_Of_Circle: '',
      v_Circle_Place: '',
      v_Address: '',
      v_Office_Head:'',
      n_Mobile:'',
      n_Pincode: '',
      v_Phone: '',
      v_Email: '',
    });
  }

  

  // saveCircleOffice(): void {                
  //   const formValue = this.myForm.value;
  //   const id = this.myForm.get('v_Circle_Code').value;
  //   this.employeeService.uniqueOfficeCode(id).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       if (response.message === "Office code already exists") {
  //         window.alert(response.message);
  //         // Disable form fields here
  //         this.myForm.disable();
  //       } else {
  //         this.employeeService.saveCircleOffice(formValue).subscribe(
  //           (response: any) => {
  //             // Enable form fields here
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



  saveCircleOffice(): void {
    const formValue = this.myForm.value;
    const vCircleCodeControl = this.myForm.get('v_Circle_Code');
  
    this.employeeService.uniqueOfficeCode(vCircleCodeControl.value).subscribe(
      (response: any) => {
        console.log(response);
        if (response.message === "Office code already exists") {
          window.alert(response.message);
  
          // Disable all form controls except v_Circle_Code
          Object.keys(this.myForm.controls).forEach(controlName => {
            if (controlName !== 'v_Circle_Code') {
              this.myForm.get(controlName).disable();
            }
          });
        } else {
          this.employeeService.saveCircleOffice(formValue).subscribe(
            (response: any) => {
              // Enable all form controls
              this.myForm.enable();
  
              if (response.message === "Office code already exists") {
                window.alert('Office code already exists');
              }
              console.log('Saved Circle Office:', response);
              alert('The Circle data was added successfully!');
              window.location.reload();
            },
            (error: any) => {
              console.error('Error while saving Circle Office:', error);
            }
          );
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  
  uniqueOfficeCode(event: any) {
    const id = event.target.value;
    const vCircleCodeControl = this.myForm.get('v_Circle_Code');
    this.employeeService.uniqueOfficeCode(id).subscribe(
      (response: any) => {
        console.log(response);
        if (response.message === "Office code already exists") {
          window.alert(response.message);
  
          // Disable all form controls except v_Circle_Code
          Object.keys(this.myForm.controls).forEach(controlName => {
            if (controlName !== 'v_Circle_Code') {
              this.myForm.get(controlName).disable();
            }
          });
        } else {
          // Enable all form controls
          this.myForm.enable();
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  

}
