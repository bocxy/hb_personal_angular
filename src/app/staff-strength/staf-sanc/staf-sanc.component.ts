import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-staf-sanc',
  templateUrl: './staf-sanc.component.html',
  styleUrls: ['./staf-sanc.component.scss']
})
export class StafSancComponent implements OnInit {
  staffSancFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
employeeSanctionData: any;
  isDuplicateCode: any;
  isCadreCodeFrozen = false;

constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, private cd: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.staffSancFormGrp = this.cb.group({
      cadreCode:[''],
      cadreName:[''],
      cadreCategory:[''],
      sanctioned:[''],
      present:['0'],
      vacant:[''],

    })

   
  }

  
  // onSubmit() {
  //   if (this.staffSancFormGrp.valid) {
  //     console.log("Working1");
  //     let data = {
  //       "cadreCode": this.staffSancFormGrp.value.cadreCode,
  //       "cadreName": this.staffSancFormGrp.value.cadreName,
  //       "cadreCategory": this.staffSancFormGrp.value.cadreCategory,
  //       "sanctioned": this.staffSancFormGrp.value.sanctioned,
  //       "present": this.staffSancFormGrp.value.present,
  //       "vacant": this.staffSancFormGrp.value.sanctioned - this.staffSancFormGrp.value.present,
  //     };
  
  //     // Check if Cadre Code is unique before saving
  //     this.employeeService.uniqueCadreCode(data.cadreCode).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //         if (response.message === "Staff Strength already exists") {
  //           window.alert(response.message);
  
  //           // Disable all form controls
  //           this.staffSancFormGrp.disable();
  //         } else {
  //           // Cadre Code is unique, proceed with saving
  //           this.employeeService.saveSanction(data).subscribe(
  //             (response) => {
  //               // Handle the response from the server (e.g., show a success message)
  //               console.log('Data saved:', response);
  
  //               // Navigate to the "staff-strength/list" page
  //               this.router.navigate(['/staff-strength/list']);
  //             },
  //             (error) => {
  //               // Handle errors (e.g., show an error message)
  //               console.error('Error saving data:', error);
  
  //               if (error.status === 400) {
  //                 // Handle specific 400 Bad Request errors, if needed
  //                 // You can display a more informative error message here.
  //               } else {
  //                 // Handle other error cases (e.g., network issues)
  //                 // Display a generic error message to the user.
  //                 this.snackbar.open('An error occurred while saving data. Please try again later.', 'Dismiss', {
  //                   duration: 5000, // Adjust the duration as needed
  //                 });
  //               }
  //             }
  //           );
  //         }
  //       },
  //       (error: any) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }
  // }
  
  // uniqueCadreCode(event: any) {
  //   const id = event.target.value;
  //   this.employeeService.uniqueCadreCode(id).subscribe(
  //     (response: any) => {
  //       console.log(response);
  //       if (response.message === "Staff Strength already exists") {
  //         window.alert(response.message);
  
  //         // Disable all form controls
  //         this.staffSancFormGrp.disable();
  //       } else {
  //         // Reset the disabled state for all form controls
  //         this.staffSancFormGrp.enable();
  //       }
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  

  onSubmit() {
    if (this.staffSancFormGrp.valid) {
      console.log("Working1");
      let data = {
        "cadreCode": this.staffSancFormGrp.value.cadreCode,
        "cadreName": this.staffSancFormGrp.value.cadreName,
        "cadreCategory": this.staffSancFormGrp.value.cadreCategory,
        "sanctioned": this.staffSancFormGrp.value.sanctioned,
        "present": this.staffSancFormGrp.value.present,
        "vacant": this.staffSancFormGrp.value.sanctioned - this.staffSancFormGrp.value.present,
      };
  
      // Check if Cadre Code is unique before saving
      this.employeeService.uniqueCadreCode(data.cadreCode).subscribe(
        (response: any) => {
          console.log(response);
          if (response.message === "Staff Strength already exists") {
            window.alert(response.message);
  
            // Disable all form controls
            this.staffSancFormGrp.disable();
          } else {
            // Cadre Code is unique, proceed with saving
            this.employeeService.saveSanction(data).subscribe(
              (response) => {
                // Handle the response from the server (e.g., show a success message)
                console.log('Data saved:', response);
  
                // Navigate to the "staff-strength/list" page
                this.router.navigate(['/staff-strength/list']);
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
        },
        (error: any) => {
          console.error('Error:', error);
        }
      );
    }
  }
  
  // onSubmit(): void {
  //   if (this.isDuplicateCode) {
  //     window.alert('The Head Office data cannot be added due to duplicate code.');
  //     return; // Do not proceed with saving if the code is duplicate
  //   }
  
  //   if (this.staffSancFormGrp.valid) {
  //     console.log("Working1");
  //     let data = {
  //       "cadreCode": this.staffSancFormGrp.value.cadreCode,
  //       "cadreName": this.staffSancFormGrp.value.cadreName,
  //       "cadreCategory": this.staffSancFormGrp.value.cadreCategory,
  //       "sanctioned": this.staffSancFormGrp.value.sanctioned,
  //       "present": this.staffSancFormGrp.value.present,
  //       "vacant": this.staffSancFormGrp.value.sanctioned - this.staffSancFormGrp.value.present,
  //     };
  
  //     // Check if Cadre Code is unique before saving
  //     this.employeeService.uniqueCadreCode(data.cadreCode).subscribe(
  //       (response: any) => {
  //         console.log(response);
  //         if (response.message === "Staff Strength already exists") {
  //           window.alert(response.message);
  
  //           // Disable all form controls
  //           this.staffSancFormGrp.disable();
  //         } else {
  //           // Cadre Code is unique, proceed with saving
  //           this.employeeService.saveSanction(data).subscribe(
  //             (response) => {
  //               // Handle the response from the server (e.g., show a success message)
  //               console.log('Data saved:', response);
  
  //               // Navigate to the "staff-strength/list" page
  //               this.router.navigate(['/staff-strength/list']);
  //             },
  //             (error) => {
  //               // Handle errors (e.g., show an error message)
  //               console.error('Error saving data:', error);
  
  //               if (error.status === 400) {
  //                 // Handle specific 400 Bad Request errors, if needed
  //                 // You can display a more informative error message here.
  //               } else {
  //                 // Handle other error cases (e.g., network issues)
  //                 // Display a generic error message to the user.
  //                 this.snackbar.open('An error occurred while saving data. Please try again later.', 'Dismiss', {
  //                   duration: 5000, // Adjust the duration as needed
  //                 });
  //               }
  //             }
  //           );
  //         }
  //       },
  //       (error: any) => {
  //         console.error('Error:', error);
  //       }
  //     );
  //   }



   
  // }
  

  uniqueCadreCode(event: any) {
    const id = event.target.value;
  
    this.employeeService.uniqueCadreCode(id).subscribe(
      (response: any) => {
        console.log('API Response:', response);
  
        // Assuming the response structure has a property 'message'
        if (response && response.message === "Cadre Code already exists") {
          console.log('Duplicate value detected:', response.message);
          window.alert(response.message);
  
          // Disable all form controls except cadreCode
          Object.keys(this.staffSancFormGrp.controls).forEach(controlName => {
            if (controlName !== 'cadreCode') {
              this.staffSancFormGrp.get(controlName).disable();
            }
          });
        } else {
          console.log('Unique value entered.');
          // Reset the disabled state for all form controls
          Object.keys(this.staffSancFormGrp.controls).forEach(controlName => {
            this.staffSancFormGrp.get(controlName).enable();
          });
        }
  
        // Trigger change detection manually
        this.cd.detectChanges();
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }
  
  

  
}
