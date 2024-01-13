import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {


  familyDetailFrmGrp: FormGroup;
  orderForm: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  showAdditionalContainer = false;

  id: number;
  data: any;




  personOptions: string[] = ['Person 2', 'Person 3', 'Person 4', 'Person 5'];


  status = [
    { 'status': "Mother", 'value': true },
    { 'status': "Father", 'value': false },
    { 'status': "Spouse", 'value': false },
    { 'status': "Daughter", 'value': false },
    { 'status': "Son", 'value': false },

  ]

  person = [

    { 'person': "Peron 2", 'value': false },
    { 'person': "Peron 3", 'value': false },
    { 'person': "Peron 4", 'value': false },
    { 'person': "Peron 5", 'value': false },

  ]

  selectedValue: string;
  selectedStatus: string;
  persons: any[] = [];
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  // items: any;
  formBuilder: any;
  showContainerBox = true;
  empId: any
  dataFamily: any



  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService: EmployeeService, private http: HttpClient, private route: ActivatedRoute, private cdr: ChangeDetectorRef) { }


  ngOnInit(): void {

    this.familyDetailFrmGrp = this.cb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      remarks: [''],
      mid: [''],
      nid: ['']


    })
    // this.orderForm = new FormGroup({
    //   items: new FormArray([])
    // });

    this.orderForm = this.cb.group({
      items: this.cb.array([])
    });

    this.addItem();
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getEmpFamilyDetailsBynId();

  }

  createItem(): FormGroup {

    return this.cb.group({
      nameOfFamilyMembers: [''],
      relationWithEmp: [''],
      familyMemDob: [''],
      empId: [''],
      mid: [''],
      nid: ['']
    });
  }

  // this.familyDetailFrmGrp = this.cb.group({
  //   empId:[''],
  //   empName:[''],
  //   cadreCode:[''],
  //   cadreName:[''],
  //   dateOfBirth:[''],
  //   dateOfJointService:[''],
  //   remarks:[''],

  // })

  // addItem() {
  //   const newItem = this.createItem();
  //   (this.orderForm.get('items') as FormArray).push(newItem);
  // }

  addItem() {
    const itemsFormArray = this.orderForm.get('items') as FormArray;

    if (itemsFormArray.length < 5) {
      const newItem = this.createItem();
      itemsFormArray.push(newItem);
    } else {
      // Optionally, you can display a message or take another action
      console.log('You cannot add more than 5 items.');
    }
  }

  get items() {
    return (this.orderForm.get('items') as FormArray).controls;
  }

  // onButtonClicked() {

  //   // console.log(id);

  //   let empId = this.familyDetailFrmGrp.value.empId ? JSON.parse(this.familyDetailFrmGrp.value.empId) : ''
  //   this.employeeService.getCommonDetails(empId).subscribe(
  //     (response) => {
  //       console.log('id', this.id);

  //       this.data = response.data;
  //       this.familyDetailFrmGrp.patchValue({



  //         empName: this.data.employeeName,
  //         cadreCode: this.data.cadreCode,
  //         cadreName: this.data.cadreName,
  //         dateOfBirth: this.data.dateOfBirth,
  //         dateOfJointService: this.data.dateOfJointService,
  //         nid: this.data.nid,
  //         mid: this.id
  //       });

  //       console.log('Response:', response);

  //     },
  //     (error) => {

  //       console.error('Error:', error);

  //     }
  //   );
  // }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  applyTypeFilter() {
    if (this.selectedStatus?.length || this.selectedValue?.length) {
      this.filteredData = this.dataSource.data.filter(item => {

        if (this.selectedValue?.length && !this.selectedValue?.includes(item.type[0])) {
          return false;
        }


        if (this.selectedStatus?.length && !this.selectedStatus?.includes(item.couponStatus[0])) {
          return false;
        }

        return true;
      });
    } else {
      this.filteredData = [];
      this.dataSource.data = this.couponsListData;
    }

  }

  showScreen = false;

  getEmpFamilyDetailsBynId() {
    console.log(this.id);
    this.employeeService.getEmpFamilyDetailsBynId(this.id).subscribe(
      (response) => {


        this.data = response.data.employee[0];
        this.dataFamily = response.data.members;

        const familyMembersList: any = response.data.members;

        if (familyMembersList.length > 0) {

          this.items.length = 0;

          familyMembersList.forEach((fam, i) => {
            this.addItem();
            const expansionPanel = this.items.at(i) as FormGroup;
            expansionPanel.patchValue({
              empId: familyMembersList[i].empId,
              nameOfFamilyMembers: familyMembersList[i].nameOfFamilyMembers,
              familyMemDob: familyMembersList[i].familyMemDob,
              relationWithEmp: familyMembersList[i].relationWithEmp,
              nid: familyMembersList[i].nid,
              mid: familyMembersList[i].mid
            });
          })
        }

        this.showScreen = true;
        this.familyDetailFrmGrp.patchValue({
          empId: this.data.empId,
          empName: this.data.empName,
          cadreCode: this.data.cadreCode,
          cadreName: this.data.cadreName,
          dateOfBirth: this.data.dateOfBirth,
          dateOfJointService: this.data.dateOfJointService,
          remarks: this.data.remarks,
          nid: this.data.nid,
          mid: this.data.mid
          // nameOfFamilyMembers: this.dataFamily.nameOfFamilyMembers,
          // relationWithEmp: this.dataFamily.relationWithEmp,
          // familyMemDob: this.dataFamily.familyMemDob,
        });
        // this.cdr.detectChanges();
        console.log('Response:', response);

      },
      (error) => {

        console.error('Error:', error);

      }
    );
  }


  onUpdate(id: number) {


    if (this.familyDetailFrmGrp.valid && this.orderForm.valid) {
      console.log("Save Clicked");

      let familyArrayValue : any= this.orderForm.value;
      if (familyArrayValue) {
        familyArrayValue = familyArrayValue.items;
      }
      else{
        familyArrayValue = [];
      }

      let data = {

        "employee": [
          {
            "empId": this.familyDetailFrmGrp.value.empId,
            "empName": this.familyDetailFrmGrp.value.empName,
            "cadreCode": this.familyDetailFrmGrp.value.cadreCode,
            "cadreName": this.familyDetailFrmGrp.value.cadreName,
            "dateOfBirth": this.familyDetailFrmGrp.value.dateOfBirth,
            "dateOfJointService": this.familyDetailFrmGrp.value.dateOfJointService,
            "remarks": this.familyDetailFrmGrp.value.remarks,
            "mid": this.familyDetailFrmGrp.value.mid,
            "nid": this.familyDetailFrmGrp.value.nid
          }],
        "members": familyArrayValue
      }
      console.log("data", data);
      // debugger
      // return

      this.employeeService.saveEmpFamilyDetails(data).subscribe(

        (response) => {

          console.log(data);
          console.log('Data saved:', response);

          this.router.navigate(['/family-details/list']);
        },
        (error) => {

          console.error('Error saving data:', error);

          if (error.status === 400) {

          } else {
            this.snackbar.open('An error occurred while saving data. Please try again later.', 'Dismiss', {
              duration: 5000, // Adjust the duration as needed
            });
          }
        }
      );
    }
  }

  deleteContainerBox(index: number) {
    const itemsFormArray = this.orderForm.get('items') as FormArray;
    const nid = itemsFormArray.value[index].nid;
    if (nid) {
      this.employeeService.deleteFamilyData(nid).subscribe({
        next: (response: any) => {
          console.log("delete response", response);
          if (response?.message && (response?.message === "Family Data Details deleted successfully.")) {
            itemsFormArray.removeAt(index);
          }
        }
      })
    }
  }

  routeToFamilyList(){
    this.router.navigate(['/family-details/list']);
  }

}
