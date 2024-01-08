import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTabGroup } from '@angular/material/tabs';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  id:any;
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

  @ViewChild(MatTabGroup) tabGroup: MatTabGroup;

 
  constructor(private fb: FormBuilder, private router: Router,private route: ActivatedRoute, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,private employeeService:EmployeeService) {
  }

  ngOnInit(): void {


    this.activeRoute.paramMap.subscribe(params => {
     
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}

      debugger
      console.log('id',this.id);
      
      this.getEmployee();
     
      console.log(this.id)
    });


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
      motherCode:[''],
fatherName:[''],
session:[''],
      cadreCategory: [''],
      cadreName: [''],
      placeOfBirth: [''],
      dateOfBirth: [''],
      religion: [''],
      group:[''],
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
      chargesPending: [''],
      employeesUnblemishedServices: [''],
      employeesUnblemishedDate: [''],
    })



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


  navigateToLeaveAccountTab() {
    this.tabGroup.selectedIndex = 4;
  }


  getEmployee() {
    console.log(this.id);
        this.employeeService.getEmployee(this.id).subscribe(
          (response) => {
      this.data=response.data;
console.log(response);
      
      this.personalForm.patchValue({

        
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
         group: this.data.personalinfotab[0].group,
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
                joiningLetter:this.data.appointmentinfotab[0].joiningLetter
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
              });
      
            console.log('Response:', response);
      
          },
          
      
      
      (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }

}
