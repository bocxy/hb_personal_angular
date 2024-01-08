import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  id:any;
  mid:any;
  data:any;
  myForm: FormGroup;
  idToEdit:number;

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

  n_UNIQUE_ID: number;
  empId: string;
  officeCodes: string[] = [];
  cadreCodes: string[] = [];

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

 
  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef, private router: Router,private route: ActivatedRoute, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,private employeeService:EmployeeService) {
  }

  ngOnInit(): void {


    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}

      debugger
      console.log('id',this.id);
      
     
      console.log(this.id)
    });


    this.consumerPayForm = this.fb.group({
      scaleOfPay: [''],
      basicPay: [''],
      levelAsPerPayMatrix: [''],
      cellAsPerPayMatrix: [''],
      incrementDueDate: [''],
      nid:['']
    })

    this.personalForm = this.fb.group({
      employeeId: [''],
      employeeName: [''],
      officeName: [''],
      officeCode: [''],
      cadreCode: [''],
      gender: [''],
      motherCode:[''],
fatherName:[''],
      cadreCategory: [''],
      cadreName: [''],
      placeOfBirth: [''],
      dateOfBirth: [''],
      religion: [''],
      group:[''],
      session:[''],
      motherTongue: [''],
      subCaste: [''],
      community: [''],
      presentAddress: [''],
      bloodGroup: [''],
      aadhaarNumber: [''],
      chargesPending:[''],
      permanentAddress: [''],
      mobileNumber: [''],
      qualification:[''],
      panNumber: [''],
      minQualification: [''],
      emailId: [''],
      spouseName:[''],
      identificationMark1: [''],
      identificationMark2: [''],
      maxQualification: [''],
      differentlyAbled: [''],
      differentlyAbledCategory: [''],
      disabilityPercentage: [''],
      minQualificationFilePath: [''],
      maxQualificationFilePath: [''],
      empPhoto: [''],
      empSignature: [''],
      employeeUnblemishedService:[''],
      unblemishedOrderDate:['']
     
    })

    this.appointFormGroup = this.fb.group({
      modeOfAppointment: [''],
      dateOfAppointment: [''],
      initialAppointmentCadre: [''],
      dateOfJoiningService: [''],
      whetherRegularized: [''],
      dateOfRegularization:[''],
      dateOfProbationDeclaration: [''],
      appointmentOrderPath: [''],
      joiningLetter:[''],
      nid:['']
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
      nid:['']

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
      chargesPending: [''],
      employeesUnblemishedServices: [''],
      employeesUnblemishedDate: [''],
      nid:['']
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

    this.getEmployee();


  }

  navigateToLeaveAccountTab() {
    this.tabGroup.selectedIndex = 4;
  }


  
  onSubmit(id: number) {
    
   
      console.log("Working1")
     
      let data={
        "personalinfotab":
        
            {
              "nid": this.id,
              "employeeId": this.personalForm.value.employeeId,
              "employeeName": this.personalForm.value.employeeName,
              "officeName": this.personalForm.value.officeName,
              "officeCode": this.personalForm.value.officeCode,
              "cadreCode": this.personalForm.value.cadreCode,
              "gender": this.personalForm.value.gender,
              "fatherName": this.personalForm.value.fatherName,
              "motherCode": this.personalForm.value.motherCode,
              "spouseName": this.personalForm.value.spouseName,
              "session": this.personalForm.value.session,
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
              "documents": this.personalForm.value.documents ? this.personalForm.value.documents:null,
              "qualification": this.personalForm.value.qualification,
              "minQualification": this.personalForm.value.minQualification ?this.personalForm.value.minQualification:null,
              "empPhoto": this.personalForm.value.empPhoto,
              "empSignature": this.personalForm.value.empSignature,
              "chargesPending":  this.personalForm.value.chargesPending,
              "employeeUnblemishedService":  this.personalForm.value.employeeUnblemishedService,
             "unblemishedOrderDate": this.personalForm.value.unblemishedOrderDate
            },
        "currentpayinfotab": 
            {
             
              "scaleOfPay": this.consumerPayForm.value.scaleOfPay,
                    "basicPay": this.consumerPayForm.value.basicPay,
                    "levelAsPerPayMatrix": this.consumerPayForm.value.levelAsPerPayMatrix,
                    "cellAsPerPayMatrix": this.consumerPayForm.value.cellAsPerPayMatrix,
                    "incrementDueDate": this.consumerPayForm.value.incrementDueDate,
                    "nid": this.consumerPayForm.value.nid,
                    "mid": this.id
               
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
                      "joiningLetter": this.appointFormGroup.value.joiningLetter,
                      "nid": this.appointFormGroup.value.nid,
                      "mid": this.id
                
            },
        "retirementDetailstab": 
            {
              "modeOfRetirement": this.retireFormGroup.value.modeOfAppointment,
                    "dateOfRetirement":this.retireFormGroup.value.dateOfRetirement,
                    "retirementPermittedStatus": this.retireFormGroup.value.retirementPermittedStatus,
                    "fbfSanctionedDate": this.retireFormGroup.value.fbfSanctionedDate,
                    "fbfSanctionedAmount": this.retireFormGroup.value.fbfSanctionedAmount,
                    "regularRetirementAdminApprovalDate": this.retireFormGroup.value.regularRetirementAdminApprovalDate,
                    "regularRetirementPensionSanctionDate": this.retireFormGroup.value.regularRetirementPensionSanctionDate,
                    "provisionalAdminApprovalDate": this.retireFormGroup.value.provisionalAdminApprovalDate,
                    "provisionalPensionSanctionDate": this.retireFormGroup.value.provisionalPensionSanctionDate,
                    "nid": this.retireFormGroup.value.nid,
                    "mid": this.id
            },
        "employeeLeaveDetailstab": 
            {
              "earnedLeaveCredit": this.leaveForm.value.earnedLeaveCredit,
                    "earnedLeaveAvailed": this.leaveForm.value.earnedLeaveAvailed,
                    "earnedLeaveBalance":  this.leaveForm.value.earnedLeaveBalance,
                    "medicalLeaveCredit":  this.leaveForm.value.medicalLeaveCredit,
                    "medicalLeaveAvailed":  this.leaveForm.value.medicalLeaveAvailed,
                    "medicalLeaveBalance":  this.leaveForm.value.medicalLeaveBalance,
                    "unearnedLeavePersonalBalance":  this.leaveForm.value.unearnedLeavePersonalBalance,
                    "unearnedLeavePrivateAvailed":  this.leaveForm.value.unearnedLeavePrivateAvailed,
                    "unearnedLeavePrivateCredit":  this.leaveForm.value.unearnedLeavePrivateCredit,
                    "lossOfPayWithMedicalCertificate":  this.leaveForm.value.lossOfPayWithMedicalCertificate,
                    "lossOfPayWithoutMedicalCertificate":  this.leaveForm.value.lossOfPayWithoutMedicalCertificate,
                    "casualLeaveCredit":  this.leaveForm.value.modeOfAppointment,
                    "restrictedHolidaysTotal":  this.leaveForm.value.restrictedHolidaysTotal,
                    "adoptionOfChildAvailed":  this.leaveForm.value.adoptionOfChildAvailed,
                    "maternityLeaveTotal":  this.leaveForm.value.maternityLeaveTotal,
                    "studyLeaveTotal":  this.leaveForm.value.studyLeaveTotal,
                    "abroadEmploymentLeaveTotal":  this.leaveForm.value.abroadEmploymentLeaveTotal,
                    "familyPlanningLeaveTotal":  this.leaveForm.value.familyPlanningLeaveTotal,
                    "specialCasualLeaveTotal":  this.leaveForm.value.specialCasualLeaveTotal,
                    "disabilityLeaveTotal":  this.leaveForm.value.disabilityLeaveTotal,
                    "abortionLeaveTotal":  this.leaveForm.value.abortionLeaveTotal,               
                  
                    "employeesUnblemishedDate":  this.leaveForm.value.employeesUnblemishedDate,
                    "nid": this.leaveForm.value.nid,
                    "mid": this.id
            }
        
      }
      console.log(data);
    
      // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
        this.employeeService.saveEmployeeDataTabs(data).subscribe(

        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/employee/list']);

          this.cdRef.detectChanges();
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





  getEmployee() {
    console.log(this.id);
        this.employeeService.getEmployee(this.id).subscribe(
          (response) => {
      this.data=response.data;
      console.log(response);
      
      this.personalForm.patchValue({

        nid:this.id,
        employeeId:this.data.personalinfotab[0].employeeId,
        cadreName: this.data.personalinfotab[0].cadreName,
        officeCode: this.data.personalinfotab[0].officeCode,
        officeName: this.data.personalinfotab[0].officeName,
        dateOfBirth:this.data.personalinfotab[0].dateOfBirth,
        placeOfBirth:this.data.personalinfotab[0].placeOfBirth,
        employeeName: this.data.personalinfotab[0].employeeName,
        fatherName:this.data.personalinfotab[0].fatherName,
        motherCode:this.data.personalinfotab[0].motherCode,
        spouseName: this.data.personalinfotab[0].spouseName,
        cadreCategory: this.data.personalinfotab[0].cadreCategory,
        gender:this.data.personalinfotab[0].gender,
        chargesPending:this.data.personalinfotab[0].chargesPending,
         religion: this.data.personalinfotab[0].religion,
         group:this.data.personalinfotab[0].group,
        motherTongue: this.data.personalinfotab[0].motherTongue,
        subCaste: this.data.personalinfotab[0].subCaste,
        community: this.data.personalinfotab[0].community,
        presentAddress: this.data.personalinfotab[0].presentAddress,
        bloodGroup: this.data.personalinfotab[0].bloodGroup,
        aadhaarNumber: this.data.personalinfotab[0].aadhaarNumber,
        qualification:this.data.personalinfotab[0].qualification,
        permanentAddress: this.data.personalinfotab[0].permanentAddress,
        mobileNumber: this.data.personalinfotab[0].mobileNumber,
        panNumber: this.data.personalinfotab[0].panNumber,
        emailId: this.data.personalinfotab[0].emailId,
        identificationMark1: this.data.personalinfotab[0].identificationMark1,
        identificationMark2: this.data.personalinfotab[0].identificationMark2,
        differentlyAbled: this.data.personalinfotab[0].differentlyAbled,
        differentlyAbledCategory: this.data.personalinfotab[0].differentlyAbledCategory,
        disabilityPercentage: this.data.personalinfotab[0].disabilityPercentage,
        documents: this.personalForm.value.documents ? this.personalForm.value.documents:null,
        maxQualification: this.personalForm.value.maxQualification ?this.personalForm.value.maxQualification:null,
        minQualification: this.personalForm.value.minQualification ?this.personalForm.value.minQualification:null,
        empPhoto: this.data.personalinfotab[0].empPhoto,
        empSignature: this.data.personalinfotab[0].empSignature,
        cadreCode:this.data.personalinfotab[0].cadreCode,
        employeeUnblemishedService:this.data.personalinfotab[0].employeeUnblemishedService,
        unblemishedOrderDate:this.data.personalinfotab[0].unblemishedOrderDate

      });
            
              this.consumerPayForm.patchValue({
                scaleOfPay: this.data.currentpayinfotab[0].scaleOfPay,
                basicPay: this.data.currentpayinfotab[0].basicPay,
                levelAsPerPayMatrix: this.data.currentpayinfotab[0].levelAsPerPayMatrix,
                cellAsPerPayMatrix: this.data.currentpayinfotab[0].cellAsPerPayMatrix,
                incrementDueDate: this.data.currentpayinfotab[0].incrementDueDate,
                nid: this.data.currentpayinfotab[0].nid,
              // mid:this.id
              });
          
             
          
              this.appointFormGroup.patchValue({
                modeOfAppointment: this.data.appointmentinfotab[0].modeOfAppointment,
                dateOfAppointment: this.data.appointmentinfotab[0].dateOfAppointment,
                initialAppointmentCadre: this.data.appointmentinfotab[0].initialAppointmentCadre,
                dateOfJoiningService: this.data.appointmentinfotab[0].dateOfJoiningService,
                whetherRegularized: this.data.appointmentinfotab[0].whetherRegularized,
                dateOfRegularization: this.data.appointmentinfotab[0].dateOfRegularization,
                dateOfProbationDeclaration: this.data.appointmentinfotab[0].dateOfProbationDeclaration,
                appointmentOrderPath: this.data.appointmentinfotab[0].appointmentOrderPath,
                joiningLetter:this.data.appointmentinfotab[0].joiningLetter,
                nid: this.data.appointmentinfotab[0].nid,
               
              // mid:this.id
              });
          
              this.retireFormGroup.patchValue({
                modeOfRetirement: this.data.retirementDetailstab[0].modeOfRetirement,
                dateOfRetirement:this.data.retirementDetailstab[0].dateOfRetirement,
                retirementPermittedStatus: this.data.retirementDetailstab[0].retirementPermittedStatus,
                fbfSanctionedDate: this.data.retirementDetailstab[0].fbfSanctionedDate,
                fbfSanctionedAmount: this.data.retirementDetailstab[0].fbfSanctionedAmount,
                regularRetirementAdminApprovalDate: this.data.retirementDetailstab[0].regularRetirementAdminApprovalDate,
                regularRetirementPensionSanctionDate: this.data.retirementDetailstab[0].regularRetirementPensionSanctionDate,
                provisionalAdminApprovalDate: this.data.retirementDetailstab[0].provisionalAdminApprovalDate,
                provisionalPensionSanctionDate: this.data.retirementDetailstab[0].provisionalPensionSanctionDate,
                nid: this.data.retirementDetailstab[0].nid,
                // mid:this.id
              });
          
              this.leaveForm.patchValue({
                earnedLeaveCredit: this.data.employeeLeaveDetailstab[0].earnedLeaveCredit,
                earnedLeaveAvailed: this.data.employeeLeaveDetailstab[0].earnedLeaveAvailed,
                earnedLeaveBalance: this.data.employeeLeaveDetailstab[0].earnedLeaveBalance,
                medicalLeaveCredit: this.data.employeeLeaveDetailstab[0].medicalLeaveCredit,
                medicalLeaveAvailed: this.data.employeeLeaveDetailstab[0].medicalLeaveAvailed,
                medicalLeaveBalance: this.data.employeeLeaveDetailstab[0].medicalLeaveBalance,
                unearnedLeavePersonalBalance: this.data.employeeLeaveDetailstab[0].unearnedLeavePersonalBalance,
                unearnedLeavePrivateAvailed: this.data.employeeLeaveDetailstab[0].unearnedLeavePrivateAvailed,
                unearnedLeavePrivateCredit: this.data.employeeLeaveDetailstab[0].unearnedLeavePrivateCredit,
                lossOfPayWithMedicalCertificate: this.data.employeeLeaveDetailstab[0].lossOfPayWithMedicalCertificate,
                lossOfPayWithoutMedicalCertificate: this.data.employeeLeaveDetailstab[0].lossOfPayWithoutMedicalCertificate,
                casualLeaveCredit: this.data.employeeLeaveDetailstab[0].casualLeaveCredit,
                restrictedHolidaysTotal: this.data.employeeLeaveDetailstab[0].restrictedHolidaysTotal,
                adoptionOfChildAvailed: this.data.employeeLeaveDetailstab[0].adoptionOfChildAvailed,
                maternityLeaveTotal: this.data.employeeLeaveDetailstab[0].maternityLeaveTotal,
                studyLeaveTotal: this.data.employeeLeaveDetailstab[0].studyLeaveTotal,
                abroadEmploymentLeaveTotal: this.data.employeeLeaveDetailstab[0].abroadEmploymentLeaveTotal,
                familyPlanningLeaveTotal: this.data.employeeLeaveDetailstab[0].familyPlanningLeaveTotal,
                specialCasualLeaveTotal: this.data.employeeLeaveDetailstab[0].specialCasualLeaveTotal,
                disabilityLeaveTotal: this.data.employeeLeaveDetailstab[0].disabilityLeaveTotal,
                abortionLeaveTotal: this.data.employeeLeaveDetailstab[0].abortionLeaveTotal,
                chargesPending: this.data.employeeLeaveDetailstab[0].chargesPending,
                employeesUnblemishedServices: this.data.employeeLeaveDetailstab[0].employeesUnblemishedServices,
                employeesUnblemishedDate: this.data.employeeLeaveDetailstab[0].employeesUnblemishedDate,
                unauthorisedAbsence: this.data.employeeLeaveDetailstab[0].unauthorisedAbsence,
                nid: this.data.employeeLeaveDetailstab[0].nid,
                // mid:this.id
                
              });
      
            console.log('Response:', response);
      
          },
          
      
      
      (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }


      navigateToAppointmentTab() {
        this.selectedTabIndex = 1;
      }
    
      navigateToCurrencyPayTab() {
        this.tabGroup.selectedIndex = 2;
      }
    
      navigateToRetirementTab() {
        this.tabGroup.selectedIndex = 3;
      }
    
    
      // callApi() {

      //   const employeeId = parseInt(this.empId, 1);
    
      //   this.employeeService.getEmployee(employeeId).subscribe(
      //     (data) => {
      //       const employeeData = data;
      //       this.personalForm.get(employeeData.personalinfotab);
      //       this.consumerPayForm.get(employeeData.currentpayinfotab);
      //       this.appointFormGroup.get(employeeData.appointmentinfotab);
      //       this.retireFormGroup.get(employeeData.retirementDetailstab);
      //       this.leaveForm.get(employeeData.employeeLeaveDetailstab);
      //     },
      //     (error) => {
      //       console.error('Error fetching employee data:', error);
    
      //       this.snackbar.open('Error fetching employee data', 'Close', {
      //         duration: 3000,
      //       });
      //     }
      //   );
      // }

}
