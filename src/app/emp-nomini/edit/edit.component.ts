import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  empNmniFormGrp: FormGroup;
  orderForm: FormGroup;

  types: string[] = [];
  submitted = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;

  id: any;
  data: any;
  dataNominee: any;

  modeOfNominee = [
    { 'modeOfNominee': "Original", 'value': 'Original' },
    { 'modeOfNominee': "Alternate", 'value': 'Alternate' },
  ]

  relationWithEmployee = [
    { 'relationWithEmployee': "Mother", 'value': 'Mother' },
    { 'relationWithEmployee': "Father", 'value': 'Father' },
    { 'relationWithEmployee': "Spouse", 'value': 'Spouse' },
    { 'relationWithEmployee': "Daughter", 'value': 'Daughter' },
    { 'relationWithEmployee': "Son", 'value': 'Son' },
  ];

  selectedStatus: string;
  SelectedValue: string;

  employeeId = null;
  mappingId = null;

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
      lastUpdatedOn: ['']

    });

    this.orderForm = this.cb.group({
      items: this.cb.array([])
    });

    // this.addItem();

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

  createItem(): FormGroup {

    return this.cb.group({
      modeOfNominee: [''],
      nameOfNominee: [''],
      relationWithEmployee: [''],
      ageOfNominee: [''],
      perOfDcrg: [''],
      addressOfNominee: [''],
      nid: [''],
      mid: [this.mappingId ?? null],
      empId: [this.employeeId ?? null]
    });
  }

  addItem() {
    const itemsFormArray = this.orderForm.get('items') as FormArray;

    if (true) {
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

  // delete nominee data with id
  deleteContainerBox(index: number) {
    const itemsFormArray = this.orderForm.get('items') as FormArray;
    const nid = itemsFormArray.value[index].nid;
    if (nid) {
      this.employeeService.deleteEmpNomination(nid).subscribe({
        next: (response: any) => {
          console.log("delete response", response);
          if (response?.message && (response?.message === "Employee Nomination Record deleted successfully.")) {
            itemsFormArray.removeAt(index);
          }
        }
      })
    }
    else {
      itemsFormArray.removeAt(index);
    }
  }


  applyTypeFilter() {
    if (!this.dataSource || !this.dataSource.data) {
      // Handle undefined or null cases
      return;
    }

    if (this.selectedStatus?.length || this.SelectedValue?.length) {
      // Existing logic
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
        const employeeData = response?.data?.employee[0];
        if (employeeData) {
          this.employeeId = employeeData.empId;
          this.mappingId = employeeData.mid;
          this.empNmniFormGrp.patchValue(employeeData);
        } else {
          // console.warn(`Employee data not found for this employee Id ${empId}`)
        }

        const nomineeDetailsList: any[] = response.data.nominee; // map this value to form array -- KarthiChanges


        if (nomineeDetailsList.length > 0) {

          this.items.length = 0;

          nomineeDetailsList.forEach((fam, i) => {
            this.addItem();
            const expansionPanel = this.items.at(i) as FormGroup;
            expansionPanel.patchValue({
              modeOfNominee: nomineeDetailsList[i].modeOfNominee,
              nameOfNominee: nomineeDetailsList[i].nameOfNominee,
              relationWithEmployee: nomineeDetailsList[i].relationWithEmployee,
              ageOfNominee: nomineeDetailsList[i].ageOfNominee,
              perOfDcrg: nomineeDetailsList[i].perOfDcrg,
              addressOfNominee: nomineeDetailsList[i].addressOfNominee,
              nid: nomineeDetailsList[i].nid,
              mid: nomineeDetailsList[i].mid,
              empId: nomineeDetailsList[i].empId
            });
          })
        }
        console.log('Response:', response);

      },
      (error) => {

        console.error('Error:', error);

      }
    );
  }


  // Save Employee Data
  onSubmit() {
    // check form Group valid
    if (this.empNmniFormGrp.valid && this.orderForm.valid) {
      const empFormData = this.empNmniFormGrp.value;
      const nomineeFormData = (this.orderForm.get('items') as FormArray).value;

      console.log(`Nominee Save Data Employee ${empFormData} 
    nomineeFormData ${nomineeFormData}`);

      const nomineeSaveBody = {
        employee: [empFormData],
        nominee: nomineeFormData
      }
      console.log("Save Nominee Body", nomineeSaveBody);

      // return;
      this.employeeService.saveEmpNomination(nomineeSaveBody).subscribe(
        (response) => {
          console.log('Data saved:', response);

          if (response.message === "Data Saved Succesfully") {
            this.router.navigate(['/emp-nomini/list']);
          } else {

          }

        },
        (error) => {
          console.error('Error saving data:', error);
          // Handle error
        }
      );
    } else {
      console.error(`FormGroup Error Employee -> ${this.empNmniFormGrp}
      Nominee ${this.orderForm}`);
    }
  }



}
