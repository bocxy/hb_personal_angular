import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {


  empNmniFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;

  id: any;
  data: any;


  modeOfNominee = [
    { 'modeOfNominee': "Mother", 'value': true },
    { 'modeOfNominee': "Father", 'value': false },
    { 'modeOfNominee': "Spouse", 'value': false },
    { 'modeOfNominee': "Daughter", 'value': false },
    { 'modeOfNominee': "Son", 'value': false },

  ]

  relatinshipWithEmp = [
    { 'relatinshipWithEmp': "Mother", 'value': true },
    { 'relatinshipWithEmp': "Father", 'value': false },
    { 'relatinshipWithEmp': "Spouse", 'value': false },
    { 'relatinshipWithEmp': "Daughter", 'value': false },
    { 'relatinshipWithEmp': "Son", 'value': false },

  ]

  selectedStatus: string;
  SelectedValue: string;

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService: EmployeeService, private http: HttpClient,) { }

  ngOnInit(): void {



    this.empNmniFormGrp = this.cb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      mid: [''],
      nid: [''],
      createdOn: [''],
      lastUpdatedOn: [''],

      // formArray
      nomineeFA: this.cb.array([])

    })

    this.activeRoute.paramMap.subscribe(params => {

      let id = params.get('id');
      if (id) {
        this.id = JSON.parse(id);
      }
      console.log('id', this.id);

      this.getNominationBynId();

      console.log(this.id)
    });


  }



  applyTypeFilter() {
    if (this.selectedStatus?.length || this.SelectedValue?.length) {
      this.filteredData = this.dataSource?.data.filter(item => {
        // Check if the item's category is included in the selectedValue array
        if (this.SelectedValue?.length && !this.SelectedValue?.includes(item.type[0])) {
          return false;
        }

        // Check if the item's colour is included in the selectedColourValue array
        if (this.selectedStatus?.length && !this.selectedStatus?.includes(item.couponStatus[0])) {
          return false;
        }
        // If the item passed both filters, return true
        return true;
      });
    } else {
      this.filteredData = [];
      this.dataSource.data = this.couponsListData;
    }

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




  getNominationBynId() {
    console.log(this.id);
    this.employeeService.getNominationBynId(this.id).subscribe(
      (response) => {
        const empFormValue = response?.data?.employee[0];
        console.log("empFormValue", empFormValue);
        this.empNmniFormGrp.patchValue(empFormValue);

        // nominee data
        const nomineeDetailsList: any[] = response.data.nominee; // map this value to form array -- KarthiChanges

        if (nomineeDetailsList.length > 0) {
          const nomineeFormArray = this.empNmniFormGrp.get('nomineeFA') as FormArray;

          nomineeDetailsList.forEach((nominee) => {
            if (nominee) {
              nomineeFormArray.push(
                this.cb.group({
                  modeOfNominee: nominee.modeOfNominee,
                  nameOfNominee: nominee.nameOfNominee,
                  relationWithEmployee: nominee.relationWithEmployee,
                  ageOfNominee: nominee.ageOfNominee,
                  perOfDcrg: nominee.perOfDcrg,
                  addressOfNominee: nominee.addressOfNominee,
                  nid: nominee.nid,
                  mid: nominee.mid,
                  empId: nominee.empId
                })
              );
            } else {

            }

          });
          console.log("nominee FormArray ", nomineeFormArray);
          this.empNmniFormGrp.get('nomineeFA')?.disable();
        }

      },
      (error) => {

        console.error('Error:', error);

      }
    );
  }


}
