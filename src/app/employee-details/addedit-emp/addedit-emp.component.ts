import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-addedit-emp',
  templateUrl: './addedit-emp.component.html',
  styleUrls: ['./addedit-emp.component.scss']
})
export class AddeditEmpComponent implements OnInit {
  consumerPayForm: FormGroup;
  personalForm: FormGroup;
  appointFormGroup: FormGroup;
  retireFormGroup: FormGroup;
  leaveForm:FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;
  selectedTabIndex = 0;
  employeeData: any;
  id:any;
  n_UNIQUE_ID: number;
  empId: string;
  officeCodes: string[] = [];
  cadreCodes: string[] = [];
  allowNavigation: boolean = true;

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;
  nid: number;

  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,private employeeService:EmployeeService, private cdr: ChangeDetectorRef) {

    this.activeRoute.paramMap.subscribe(params => {
      this.empId = params.get('id');
      // if (this.empId && this.router.url.includes('edit')) {
      //   this.callApi();
      //   this.edit = true;
      // } else if (this.router.url.includes('view')) {
      //   this.callApi();
      //   this.view = true;
      // }
    })


  }

  ngOnInit(): void {

    
    this.consumerPayForm = this.fb.group({
      scaleOfPay: [''],
      basicPay: [''],
      levelAsPerPayMatrix: [''],
      cellAsPerPayMatrix: [''],
      incrementDueDate: [''],
    })

    this.personalForm = this.fb.group({
      employeeId: [''],
      employeeName: [''],
      officeName: [''],
      officeCode: [''],
      cadreCode: [''],
      gender: [''],
      cadreCategory: [''],
      cadreName: [''],
      placeOfBirth: [''],
      dateOfBirth: [''],
      fatherName: [''],
      motherCode: [''],
      spouseName: [''],
      religion: [''],
      group:[''],
      motherTongue: [''],
      subCaste: [''],
      community: [''],     
      presentAddress: [''],
      bloodGroup: [''],
      aadhaarNumber: [''],
      permanentAddress: [''],
      mobileNumber: [''],
      panNumber: [''],
      minQualification: [''],
      emailId: [''],
      identificationMark1: [''],
      identificationMark2:[''],
      qualification: [''],
      differentlyAbled: [''],
      differentlyAbledCategory: [''],
      disabilityPercentage: [''],
      minQualificationFilePath: [''],
      maxQualificationFilePath: [''],
      empPhoto: [''],
      empSignature: [''],
      chargesPending: [''],
      employeeUnblemishedService: [''],
      unblemishedOrderDate:['']
   
    })

    this.appointFormGroup = this.fb.group({
      modeOfAppointment: [''],
      session:[''],
      dateOfAppointment: [''],
      initialAppointmentCadre: [''],
      dateOfJoiningService: [''],
      whetherRegularized: [''],
      dateOfRegularization:[''],
      dateOfProbationDeclaration: [''],
      appointmentOrderPath: [''],
      joiningLetter:['']
    })

    this.retireFormGroup = this.fb.group({
      modeOfRetirement: [''],
      dateOfRetirement:[''],
      retirementPermittedStatus: [''],
      fbfSanctionedDate: [''],
      fbfSanctionedAmount: [''],
      regularRetirementAdminApprovalDate: [''],
      regularRetirementPensionSanctionDate: [''],
      provisionalAdminApprovalDate: [''],
      provisionalPensionSanctionDate: [''],

    })

    this.leaveForm =this.fb.group({
      earnedLeaveCredit: [''],
      earnedLeaveAvailed: [''],
      earnedLeaveBalance: [''],
      medicalLeaveCredit: [''],
      medicalLeaveAvailed: [''],
      medicalLeaveBalance: [''],
      unearnedLeavePersonalBalance: [''],
      unearnedLeavePrivateAvailed: [''],
      unearnedLeavePrivateCredit: [''],
      lossOfPayWithMedicalCertificate: [''],
      lossOfPayWithoutMedicalCertificate: [''],
      casualLeaveCredit: [''],
      restrictedHolidaysTotal: [''],
      adoptionOfChildAvailed: [''],
      maternityLeaveTotal: [''],
      studyLeaveTotal: [''],
      abroadEmploymentLeaveTotal: [''],
      familyPlanningLeaveTotal: [''],
      specialCasualLeaveTotal: [''],
      disabilityLeaveTotal: [''],
      abortionLeaveTotal: [''],
      unauthorisedAbsence:[''],
     
   
    })


    const id = 123;
    this.employeeService.getAllOfficeCode(id).subscribe(
      (response) => {
        // Assuming response.data is an array of office codes
        this.officeCodes = response.data;
  
        // Update the form control with the retrieved office codes
        this.personalForm.controls['officeCode'].setValue(this.officeCodes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );


    
    this.employeeService.getAllCadreCode(id).subscribe(
      (response) => {
        // Assuming response.data is an array of office codes
        this.cadreCodes = response.data;
  
        // Update the form control with the retrieved office codes
        this.personalForm.controls['cadreCode'].setValue(this.cadreCodes);
      },
      (error) => {
        console.error('Error:', error);
      }
    );



  }
  saveData() {
    const id = this.personalForm.get('employeeId').value;
    this.employeeService.uniqueEmployeeId(id).subscribe(
      (response: any) => {
        console.log(response);
       
        if(response.message === "Employee Id already exists"){
          window.alert('Employee Id already exists');
        } else {
          let data = {
            "personalinfotab":
    
            {
              "employeeId": this.personalForm.value.employeeId,
              "employeeName": this.personalForm.value.employeeName,
              "officeName": this.personalForm.value.officeName,
              "officeCode": this.personalForm.value.officeCode,
              "cadreCode": this.personalForm.value.cadreCode,
              "gender": this.personalForm.value.gender,
              "fatherName": this.personalForm.value.fatherName,
              "motherCode": this.personalForm.value.motherCode,
              "spouseName": this.personalForm.value.spouseName,
              "cadreCategory": this.personalForm.value.cadreCategory,
              "cadreName": this.personalForm.value.cadreName,
              "placeOfBirth": this.personalForm.value.placeOfBirth,
              "dateOfBirth": this.personalForm.value.dateOfBirth,
              "religion": this.personalForm.value.religion,
              "group":this.personalForm.value.group,
              "motherTongue": this.personalForm.value.motherTongue,
              "subCaste": this.personalForm.value.subCaste,
              "community": this.personalForm.value.community,
              "presentAddress": this.personalForm.value.presentAddress,
              "bloodGroup": this.personalForm.value.bloodGroup,
              "aadhaarNumber": this.personalForm.value.aadhaarNumber,
              "permanentAddress": this.personalForm.value.permanentAddress,
              "mobileNumber": this.personalForm.value.mobileNumber,
              "panNumber": this.personalForm.value.panNumber,
              "emailId": this.personalForm.value.emailId,
              "identificationMark1": this.personalForm.value.identificationMark1,
              "identificationMark2": this.personalForm.value.identificationMark2,
              "differentlyAbled": this.personalForm.value.differentlyAbled,
              "differentlyAbledCategory": this.personalForm.value.differentlyAbledCategory,
              "disabilityPercentage": this.personalForm.value.disabilityPercentage,
              "documents": this.personalForm.value.documents ? this.personalForm.value.documents : null,
              "qualification": this.personalForm.value.qualification,
              "minQualification": this.personalForm.value.minQualification ? this.personalForm.value.minQualification : null,
              "empPhoto": this.personalForm.value.empPhoto,
              "empSignature": this.personalForm.value.empSignature,
              "chargesPending": this.personalForm.value.chargesPending,
              "employeeUnblemishedService": this.personalForm.value.employeeUnblemishedService,
              "unblemishedOrderDate": this.personalForm.value.unblemishedOrderDate
            },
            "currentpayinfotab":
            {
              "scaleOfPay": this.consumerPayForm.value.scaleOfPay,
              "basicPay": this.consumerPayForm.value.basicPay,
              "levelAsPerPayMatrix": this.consumerPayForm.value.levelAsPerPayMatrix,
              "cellAsPerPayMatrix": this.consumerPayForm.value.cellAsPerPayMatrix,
              "incrementDueDate": this.consumerPayForm.value.incrementDueDate,
    
            },
            "appointmentinfotab":
            {
              "modeOfAppointment": this.appointFormGroup.value.modeOfAppointment,
              "dateOfAppointment": this.appointFormGroup.value.dateOfAppointment,
              "initialAppointmentCadre": this.appointFormGroup.value.initialAppointmentCadre,
              "dateOfJoiningService": this.appointFormGroup.value.dateOfJoiningService,
              "whetherRegularized": this.appointFormGroup.value.whetherRegularized,
              "dateOfRegularization": this.appointFormGroup.value.dateOfRegularization,
              "dateOfProbationDeclaration": this.appointFormGroup.value.dateOfProbationDeclaration,
              "appointmentOrderPath": this.appointFormGroup.value.appointmentOrderPath,
              "joiningLetter": this.appointFormGroup.value.joiningLetter
    
    
            },
            "retirementDetailstab":
            {
              "modeOfRetirement": this.retireFormGroup.value.modeOfAppointment,
              "dateOfRetirement": this.retireFormGroup.value.dateOfRetirement,
              "retirementPermittedStatus": this.retireFormGroup.value.retirementPermittedStatus,
              "fbfSanctionedDate": this.retireFormGroup.value.fbfSanctionedDate,
              "fbfSanctionedAmount": this.retireFormGroup.value.fbfSanctionedAmount,
              "regularRetirementAdminApprovalDate": this.retireFormGroup.value.regularRetirementAdminApprovalDate,
              "regularRetirementPensionSanctionDate": this.retireFormGroup.value.regularRetirementPensionSanctionDate,
              "provisionalAdminApprovalDate": this.retireFormGroup.value.provisionalAdminApprovalDate,
              "provisionalPensionSanctionDate": this.retireFormGroup.value.provisionalPensionSanctionDate,
    
            },
            "employeeLeaveDetailstab":
            {
              "earnedLeaveCredit": this.leaveForm.value.earnedLeaveCredit,
              "earnedLeaveAvailed": this.leaveForm.value.earnedLeaveAvailed,
              "earnedLeaveBalance": this.leaveForm.value.earnedLeaveBalance,
              "medicalLeaveCredit": this.leaveForm.value.medicalLeaveCredit,
              "medicalLeaveAvailed": this.leaveForm.value.medicalLeaveAvailed,
              "medicalLeaveBalance": this.leaveForm.value.medicalLeaveBalance,
              "unearnedLeavePersonalBalance": this.leaveForm.value.unearnedLeavePersonalBalance,
              "unearnedLeavePrivateAvailed": this.leaveForm.value.unearnedLeavePrivateAvailed,
              "unearnedLeavePrivateCredit": this.leaveForm.value.unearnedLeavePrivateCredit,
              "lossOfPayWithMedicalCertificate": this.leaveForm.value.lossOfPayWithMedicalCertificate,
              "lossOfPayWithoutMedicalCertificate": this.leaveForm.value.lossOfPayWithoutMedicalCertificate,
              "casualLeaveCredit": this.leaveForm.value.modeOfAppointment,
              "restrictedHolidaysTotal": this.leaveForm.value.restrictedHolidaysTotal,
              "adoptionOfChildAvailed": this.leaveForm.value.adoptionOfChildAvailed,
              "maternityLeaveTotal": this.leaveForm.value.maternityLeaveTotal,
              "studyLeaveTotal": this.leaveForm.value.studyLeaveTotal,
              "abroadEmploymentLeaveTotal": this.leaveForm.value.abroadEmploymentLeaveTotal,
              "familyPlanningLeaveTotal": this.leaveForm.value.familyPlanningLeaveTotal,
              "specialCasualLeaveTotal": this.leaveForm.value.specialCasualLeaveTotal,
              "disabilityLeaveTotal": this.leaveForm.value.disabilityLeaveTotal,
              "abortionLeaveTotal": this.leaveForm.value.abortionLeaveTotal,
              "unauthorisedAbsence": this.leaveForm.value.unauthorisedAbsence,
    
              "employeesUnblemishedDate": this.leaveForm.value.employeesUnblemishedDate,
            }
    
          }
          console.log('data', data);
    
    
          this.employeeService.saveEmployeeDataTabs(data).subscribe(
    
            (response) => {
              // Handle the response from the server (e.g., show a success message)
              console.log('Data saved:', response);
    
              // Navigate to the "exam-history/list" page
              this.router.navigate(['/employee/list']);
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

 
 
  
  // getAllOfficeCode(): void {
   
  // }
  


  // navigateToAppointmentTab() {
  //   this.selectedTabIndex = 1;
  // }

  navigateToCurrencyPayTab() {
    this.tabGroup.selectedIndex = 2;
  }

  navigateToRetirementTab() {
    this.tabGroup.selectedIndex = 3;
  }

  navigateToLeaveAccountTab() {
    this.tabGroup.selectedIndex = 4;
  }

  // callApi() {

  //   const employeeId = parseInt(this.empId, 10);

  //   this.employeeService.getEmployeeById(employeeId).subscribe(
  //     (data) => {
  //       const employeeData = data;
  //       this.personalForm.setValue(employeeData.personalinfotab);
  //       this.consumerPayForm.setValue(employeeData.currentpayinfotab);
  //       this.appointFormGroup.setValue(employeeData.appointmentinfotab);
  //       this.retireFormGroup.setValue(employeeData.retirementDetailstab);
  //       this.leaveForm.setValue(employeeData.employeeLeaveDetailstab);
  //     },
  //     (error) => {
  //       console.error('Error fetching employee data:', error);

  //       this.snackbar.open('Error fetching employee data', 'Close', {
  //         duration: 3000,
  //       });
  //     }
  //   );
  // }


  getOfficeName(): void {
    const officeCode = this.personalForm.value.officeCode;

    if (!officeCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getOfficeName(officeCode).subscribe(
      (response) => {
        console.log(response);
        this.personalForm.patchValue({
          officeName: response.data[0],
          // Update other form controls as needed
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
  


  getCadreNameCategory(){
    const cadreCode = this.personalForm.value.cadreCode;

    if (!cadreCode) {
      // Handle the case when presentOfficeCode is empty or null
      return;
    }

    this.employeeService.getCadreNameCategory(cadreCode).subscribe(
      (response:any) => {
        console.log(response);
        this.personalForm.patchValue({
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


 

  // checkUniqueEmpId(event:any){
    
  //   const id = event.target.value;
  
  //   this.employeeService.uniqueEmployeeId(id).subscribe(
  //     (response: any) => {
  //       console.log('API Response:', response);
  
  //       // Assuming the response structure has a property 'message'
  //       if (response && response.message === "Employee Id already exists") {
  //         console.log('Duplicate value detected:', response.message);
  //         window.alert(response.message);
  
  //         // Disable all form controls except cadreCode
  //         Object.keys(this.personalForm.controls).forEach(controlName => {
  //           if (controlName !== 'employeeId') {
  //             this.personalForm.get(controlName).disable();
  //           }
  //         });
  //       } else {
  //         console.log('Unique value entered.');
  //         // Reset the disabled state for all form controls
  //         Object.keys(this.personalForm.controls).forEach(controlName => {
  //           this.personalForm.get(controlName).enable();
  //         });
  //       }
  
  //       // Trigger change detection manually
  //       // this.cd.detectChanges();
  //     },
  //     (error: any) => {
  //       console.error('Error:', error);
  //     }
  //   );
  // }
  

  checkUniqueEmpId(event: any) {
    const id = event.target.value;
  
    this.employeeService.uniqueEmployeeId(id).subscribe(
      (response: any) => {
        console.log('API Response:', response);
  
        // Assuming the response structure has a property 'message'
        if (response && response.message === "Employee Id already exists") {
          console.log('Duplicate value detected:', response.message);
          window.alert(response.message);
  
          // Disable all form controls except cadreCode
          Object.keys(this.personalForm.controls).forEach(controlName => {
            if (controlName !== 'employeeId') {
              this.personalForm.get(controlName).disable();
            }
          });
  
          // Disallow navigation
          this.allowNavigation = false;
        } else {
          console.log('Unique value entered.');
          // Reset the disabled state for all form controls
          Object.keys(this.personalForm.controls).forEach(controlName => {
            this.personalForm.get(controlName).enable();
          });
  
          // Allow navigation
          this.allowNavigation = true;
        }
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  navigateToAppointmentTab() {
    // Only navigate if allowNavigation is true
    if (this.allowNavigation) {
      this.selectedTabIndex = 1;
    }
  }

  getRetirementDate() {
    this.submitted = false; // Reset the submitted flag

    // Assuming you have a valid date of birth in the format 'YYYY-MM-DD'
    const dob = this.personalForm.get('dateOfBirth').value;

    // Call the API to get the retirement date
    this.employeeService.getRetirementDate(dob).subscribe(
      (response) => {
        // Assuming the response is a simple string representing the retirement date
        const retirementDate = response?.data;

        // Check if the retirement date is valid before updating the form
        if (retirementDate) {
          this.retireFormGroup.patchValue({
            dateOfRetirement: retirementDate,
          });
        } else {
          console.error('Invalid response from the API for retirement date');
        }
      },
      (error) => {
        console.error('Error fetching retirement date:', error);
      }
    );
  }


  getMLAndEL() {
    this.submitted = false; // Reset the submitted flag
  
    // Assuming you have valid date values in the format 'YYYY-MM-DD'
    const dateOfJoiningService = this.appointFormGroup.get('dateOfJoiningService').value;
    const dateOfAppointment = this.appointFormGroup.get('dateOfAppointment').value;
    const dateOfRegularization = this.appointFormGroup.get('dateOfRegularization').value;
  
    // Call the API to get the ML and EL data
    this.employeeService.getMLAndEL(dateOfJoiningService, dateOfRegularization, 'Yes').subscribe(
      (response) => {
        // Assuming the response has a property named 'data'
        const mlAndElData = response?.data;
  
        // Check if the data is valid before updating the form
        if (mlAndElData) {
          this.leaveForm.patchValue({
            earnedLeaveCredit: mlAndElData.Earned_LeaveCredit,
            medicalLeaveCredit: mlAndElData.Medical_LeaveCredit,
          });
        } else {
          console.error('Invalid response from the API for ML and EL data');
        }
      },
      (error) => {
        console.error('Error fetching ML and EL data:', error);
      }
    );
  }




}



  
  

  

