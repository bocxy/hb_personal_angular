import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  familyDetailFrmGrp: FormGroup;
  orderForm: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  showAdditionalContainer = false;

  id: number;
  data: any;

  mid = "";
  empId = "";

  status = [
    { 'status': "Mother", 'value': true },
    { 'status': "Father", 'value': false },
    { 'status': "Spouse", 'value': false },
    { 'status': "Daughter", 'value': false },
    { 'status': "Son", 'value': false },

  ]



  selectedValue: string;
  selectedStatus: string;
  persons: any[] = [];
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;

  formBuilder: any;
  showContainerBox = true;
  employeeId: any



  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService: EmployeeService, private http: HttpClient,) { }


  ngOnInit(): void {

    this.familyDetailFrmGrp = this.cb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      remarks: [''],

    })

    this.orderForm = this.cb.group({
      items: this.cb.array([])
    });

    this.addItem();

  }

  createItem(): FormGroup {

    return this.cb.group({
      nameOfFamilyMembers: [''],
      relationWithEmp: [''],
      familyMemDob: [''],
      empId: [this.empId],
      nid: [''],
      mid: [this.mid]

    });
  }

  addItem() {
    const itemsFormArray = this.orderForm.get('items') as FormArray;
    if (true) {
      const newItem = this.createItem();
      itemsFormArray.push(newItem);
    } else {
      console.log('You cannot add more than 5 items.');
    }
  }


  get items() {
    return (this.orderForm.get('items') as FormArray).controls;
  }

  onButtonClicked() {


    let empId = this.familyDetailFrmGrp.value.empId ? JSON.parse(this.familyDetailFrmGrp.value.empId) : ''

    this.employeeId = this.familyDetailFrmGrp.value.empId ? JSON.parse(this.familyDetailFrmGrp.value.empId) : ''

    this.employeeService.getCommonDetails(empId).subscribe(
      (response) => {
        console.log('id', this.id);
        this.data = response.data;
        const familyMembersList: any[] = this.data.familyMemberList; // map this value to form array -- KarthiChanges


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
        this.familyDetailFrmGrp.patchValue({
          empId: this.data.empId,
          empName: this.data.employeeName,
          cadreCode: this.data.cadreCode,
          cadreName: this.data.cadreName,
          dateOfBirth: this.data.dateOfBirth,
          dateOfJointService: this.data.dateOfJointService,

        });

        this.empId = this.data.empId;
        this.mid = this.data.mid;
        console.log('Response:', response);
      },
      (error) => {

        console.error('Error:', error);

      }
    );
  }





  onSubmit() {

    if (this.familyDetailFrmGrp.valid) {

      const familyDetailValues = this.familyDetailFrmGrp.value;
      const familyMembers = this.orderForm.value.items;
      console.log(familyMembers)
      const data = {
        "employee": [
          {
            "empId": familyDetailValues.empId,
            "empName": familyDetailValues.empName,
            "cadreCode": familyDetailValues.cadreCode,
            "cadreName": familyDetailValues.cadreName,
            "dateOfBirth": familyDetailValues.dateOfBirth,
            "dateOfJointService": familyDetailValues.dateOfJointService,
            "remarks": familyDetailValues.remarks
          }
        ],
        "members": familyMembers

      };
      console.log(data)
      // Call the service to save data
      // return;
      this.employeeService.saveEmpFamilyDetails(data).subscribe(
        (response) => {
          console.log('Data saved:', response);
          this.router.navigate(['/family-details/list']);
        },
        (error) => {
          console.error('Error saving data:', error);

        }
      );
    } else {
      console.error('Form is not valid');

    }
  }

  deleteContainerBox(index: number) {
    const itemsFormArray = this.orderForm.get('items') as FormArray;
    itemsFormArray.removeAt(index);
  }

  routeToFamilyList(){
    this.router.navigate(['/family-details/list']);
  }
}



