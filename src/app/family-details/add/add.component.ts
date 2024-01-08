import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogComponent } from 'src/app/asset-details/dialog/dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {


  familyDetailFrmGrp:FormGroup;
  orderForm: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  showAdditionalContainer = false;

  id:number;
  data:any;

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
  employeeId:any



  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }


  ngOnInit(): void {

    this.familyDetailFrmGrp = this.cb.group({
      empId:[''],
      empName:[''],
      cadreCode:[''],
      cadreName:[''],
      dateOfBirth:[''],
      dateOfJointService:[''],
      remarks:[''],

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
      empId:[this.familyDetailFrmGrp.value.empId || '']

    });
  }

  addItem() {
    const itemsFormArray = this.orderForm.get('items') as FormArray;
  
    if (itemsFormArray.length < 5) {
      const newItem = this.createItem();
      itemsFormArray.push(newItem);
    } else {
      console.log('You cannot add more than 5 items.');
    }
  }
  

  get items() {
    return (this.orderForm.get('items') as FormArray).controls;
  }

  onButtonClicked(){


    let empId=this.familyDetailFrmGrp.value.empId ?JSON.parse(this.familyDetailFrmGrp.value.empId):''

 this.employeeId=this.familyDetailFrmGrp.value.empId ?JSON.parse(this.familyDetailFrmGrp.value.empId):''

    this.employeeService.getCommonDetails(empId).subscribe(
      (response) => {
        console.log('id',this.id);
         this.data=response.data;
         this.familyDetailFrmGrp.patchValue({
            // empId: this.data.empId,
            empName :this.data.employeeName,
            cadreCode:this.data.cadreCode,
            cadreName:this.data.cadreName,
            dateOfBirth:this.data.dateOfBirth,
            dateOfJointService:this.data.dateOfJointService,

          });
           console.log('Response:', response);
          },
      (error) => {

        console.error('Error:', error);

      }
    );
  }





  onSubmit() {
   
    if (this.familyDetailFrmGrp.valid ) {
     
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
        "members":familyMembers
       
      };
  console.log(data)
      // Call the service to save data
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
  }


