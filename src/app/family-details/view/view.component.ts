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


  familyDetailFrmGrp: FormGroup;
  orderForm: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  showAdditionalContainer = false;
  id: number;
  data: any;
  selectedValue: string;
  selectedStatus: string;
  persons: any[] = [];
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  formBuilder: any;
  showContainerBox = true;
  empId: any
  nameOfFamilyMembers: any;
  member: any;



  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute, private employeeService: EmployeeService, private http: HttpClient, private route: ActivatedRoute) { }


  ngOnInit(): void {

    this.familyDetailFrmGrp = this.cb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      remarks: [''],
      members: this.cb.array([])

    })



    this.route.params.subscribe(params => {
      this.id = params['id'];
    });

    this.familyDetailFrmGrp.disable();

    this.getEmpFamilyDetailsBynId();


  }




  get items() {
    return (this.orderForm.get('items') as FormArray).controls;
  }



  getEmpFamilyDetailsBynId() {
    console.log(this.id);
    this.employeeService.getEmpFamilyDetailsBynId(this.id).subscribe(
      (response) => {
        this.data = response.data.employee[0];
        this.familyDetailFrmGrp.patchValue({
          empId: this.data.empId,
          empName: this.data.empName,
          cadreCode: this.data.cadreCode,
          cadreName: this.data.cadreName,
          dateOfBirth: this.data.dateOfBirth,
          dateOfJointService: this.data.dateOfJointService,
          remarks: this.data.remarks,
        });

        const membersFormArray = this.familyDetailFrmGrp.get('members') as FormArray;

        console.log('Pushing values to form array');
        response.data.members.forEach((member) => {
          membersFormArray.push(
            this.cb.group({
              empId: member.empId,
              nameOfFamilyMembers: member.nameOfFamilyMembers,
              familyMemDob: member.familyMemDob,
              relationWithEmp: member.relationWithEmp,
            })
          );
        });
        // this.orderForm.get('items').disable();
        this.familyDetailFrmGrp.get('members')?.disable();


        console.log(response.data.members);


        console.log('Response:', response);

      },
      (error) => {

        console.error('Error:', error);

      }
    );



  }

  routeToFamilyList() {
    this.router.navigate(['/family-details/list']);
  }

}