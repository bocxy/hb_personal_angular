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

  empNmniFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;
  orderForm:FormGroup;

  id:number;
  data:any;

  modeOfNominee = [
    { 'modeOfNominee': "Original", 'value': true },
    { 'modeOfNominee': "Alternate", 'value': false },
    
   
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
  empId:any

  constructor(private cb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient, ) { }

  ngOnInit(): void {

    
    
    this.empNmniFormGrp = this.cb.group({
      empId:[''],
      empName:[''],
      cadreCode:[''],
      cadreName:[''],
      dateOfBirth:[''],
      dateOfJointService:[''],
      // modeOfNominee:[''],
      // nameOfNominee:[''],
      // relatinshipWithEmp:[''],
      // ageOfNominee:[''],
      // shareOfDcrg:[''],
      // addressOfNominee:[''],
      
    })

    this.orderForm = this.cb.group({
      items: this.cb.array([])
    });

   this.addItem();
    
  }

  createItem(): FormGroup {
    
    return this.cb.group({
      modeOfNominee: [''],
      nameOfNominee: [''],
      relatinshipWithEmp: [''],
      ageOfNominee: [''],
      shareOfDcrg: [''],
      addressOfNominee: [''],
      
    });



  }
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

  deleteContainerBox(index: number) {
    const itemsFormArray = this.orderForm.get('items') as FormArray;
    itemsFormArray.removeAt(index);
  }



  applyTypeFilter() {
    if (this.selectedStatus?.length || this.SelectedValue?.length) {
      this.filteredData = this.dataSource.data.filter(item => {
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

  onSubmit() {
    console.log('click')
    let nomineesData = [];
  
    // Iterate over the form array and collect nominee data
    const nomineeFormArray = this.orderForm.get('items') as FormArray;
    nomineeFormArray.controls.forEach((nomineeFormGroup: FormGroup) => {
      nomineesData.push({
        "empId": this.empNmniFormGrp.value.empId,
        "modeOfNominee": this.orderForm.value.modeOfNominee,
        "nameOfNominee": this.orderForm.value.nameOfNominee,
        "relationWithEmployee": this.orderForm.value.relationWithEmployee,
        "ageOfNominee": this.orderForm.value.ageOfNominee,
        "perOfDcrg": this.orderForm.value.perOfDcrg,
        "addressOfNominee": this.orderForm.value.addressOfNominee
      });
    });
  
    if (this.empNmniFormGrp.valid) {
      let data = {
        "employee": [
          {
            "empId": this.empNmniFormGrp.value.empId,
            "empName": this.empNmniFormGrp.value.empName,
            "cadreCode": this.empNmniFormGrp.value.cadreCode,
            "cadreName": this.empNmniFormGrp.value.cadreName,
            "dateOfBirth": this.empNmniFormGrp.value.dateOfBirth,
            "dateOfJointService": this.empNmniFormGrp.value.dateOfJointService,
            "remarks": this.empNmniFormGrp.value.remarks
          }
        ],
        "nominee": nomineesData
      };
  
      console.log(data);
  
      this.employeeService.saveEmpNomination(data).subscribe(
        (response) => {
          console.log('Data saved:', response);
          this.router.navigate(['/emp-nomini/list']);
        },
        (error) => {
          console.error('Error saving data:', error);
          // Handle error
        }
      );
    }
  }
  



  
  onButtonClicked(){

    // console.log(id);
    
    let empId=this.empNmniFormGrp.value.empId ?JSON.parse(this.empNmniFormGrp.value.empId):'' 
    this.employeeService.getCommonDetails(empId).subscribe(
      (response) => {
        console.log('id',this.id);
        
  this.data=response.data;
  this.empNmniFormGrp.patchValue({
           
           
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

  }

 



