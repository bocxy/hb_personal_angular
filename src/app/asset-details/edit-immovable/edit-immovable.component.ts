import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-immovable',
  templateUrl: './edit-immovable.component.html',
  styleUrls: ['./edit-immovable.component.scss']
})
export class EditImmovableComponent implements OnInit {

  
  id:number;
  data:any;
  myForm: FormGroup;
  idToEdit:number;


  immovableFormGrp:FormGroup;
 
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  couponsDetails: any;
  onFileSelected: any;
  fileInput:any;

  noData = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;
  additionalRows: any;

  constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient) { }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
      
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getImmovableDetailsBynId();
     
      console.log(this.id)
    });

    this.immovableFormGrp = this.fb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      descOfProperty: [''],
      districtOfProperty: [''],
      divisionOfProperty: [''],
      talukOfProperty: [''],
      villageOfProperty: [''],
      surveyNo: [''],
      areaOfProperty: [''],
      natureOfLand: [''],
      acquiredEmployee: [''],
      buyerName: [''],
      buyerRelationship: [''],
      dateOfAcquisition: [''],
      modeOfAcquired: [''],
      sellerName: [''],
      valueOfProperty: [''],
      sanctionedDetails: [''],
      annualIncome: [''],
      remarks: ['']
          
      
    })


  }

  onSubmit() {
    
    if (this.immovableFormGrp.valid) {
      console.log("Working1")
      let data={
        "empId": this.immovableFormGrp.value.empId,
        "empName": this.immovableFormGrp.value.empName,
        "cadreCode": this.immovableFormGrp.value.cadreCode,
        "cadreName": this.immovableFormGrp.value.cadreName,
        "dateOfBirth": this.immovableFormGrp.value.dateOfBirth,
        "dateOfJointService": this.immovableFormGrp.value.dateOfJointService,
        "descOfProperty": this.immovableFormGrp.value.descOfProperty,
        "districtOfProperty": this.immovableFormGrp.value.descOfProperty,
        "divisionOfProperty": this.immovableFormGrp.value.divisionOfProperty,
        "talukOfProperty": this.immovableFormGrp.value.talukOfProperty,
        "villageOfProperty": this.immovableFormGrp.value.villageOfProperty,
        "surveyNo": this.immovableFormGrp.value.surveyNo,
        "areaOfProperty": this.immovableFormGrp.value.areaOfProperty,
        "natureOfLand": this.immovableFormGrp.value.natureOfLand,
        "acquiredEmployee": this.immovableFormGrp.value.acquiredEmployee,
        "buyerName": this.immovableFormGrp.value.buyerName,
        "buyerRelationship": this.immovableFormGrp.value.buyerRelationship,
        "dateOfAcquisition": this.immovableFormGrp.value.dateOfAcquisition,
        "modeOfAcquired": this.immovableFormGrp.value.modeOfAcquired,
        "sellerName": this.immovableFormGrp.value.sellerName,
        "valueOfProperty": this.immovableFormGrp.value.valueOfProperty,
        "sanctionedDetails": this.immovableFormGrp.value.sanctionedDetails,
        "annualIncome": this.immovableFormGrp.value.annualIncome,
        "moveImmove": "Immovable",
        "remarks": this.immovableFormGrp.value.remarks
       
        
    }
    console.log(data);
      // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
        this.employeeService.saveEmpImmovable(data).subscribe(
  
        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data saved:', response);
          
          // Navigate to the "exam-history/list" page
          this.router.navigate(['/asset-details/list']);
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
  } 

  getImmovableDetailsBynId() {
    console.log(this.id);
    console.log("Working1");
        this.employeeService.getImmovableDetailsBynId(this.id).subscribe(
          (response) => {
            console.log('res',response);
            this.data = response.data;
            
      // this.data=response.data[0];
      console.log('data',this.data);
      
      this.immovableFormGrp.patchValue({
       
        empId:this.data.empId,
        empName: this.data.empName,
        cadreCode: this.data.cadreCode,
        cadreName: this.data.cadreName,
        dateOfBirth: this.data.dateOfBirth,
        dateOfJointService: this.data.dateOfJointService,
        descOfProperty: this.data.descOfProperty,
        districtOfProperty:this.data.districtOfProperty,
        divisionOfProperty:this.data.divisionOfProperty,
        talukOfProperty: this.data.talukOfProperty,
        villageOfProperty: this.data.villageOfProperty,
        surveyNo: this.data.surveyNo,
        areaOfProperty:this.data.areaOfProperty,
        natureOfLand: this.data.natureOfLand,
        acquiredEmployee: this.data.acquiredEmployee,
        buyerName:this.data.buyerName,
        buyerRelationship:this.data.buyerRelationship,
        dateOfAcquisition:this.data.dateOfAcquisition,
        modeOfAcquired:this.data.modeOfAcquired,
        sellerName:this.data.sellerName,
        valueOfProperty:this.data.valueOfProperty,
        sanctionedDetails:this.data.sanctionedDetails,
        annualIncome:this.data.annualIncome,
        moveImmove:this.data.moveImmove,
        remarks:this.data.remarks
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }

      
      onUpdate(id: any) {
        if (this.immovableFormGrp.valid) {
          console.log(this.immovableFormGrp);
          const updatedData = {
            // Include the ID of the existing record
             
            nid: this.id,                  
            empName: this.immovableFormGrp.value.empName,
            empId:this.immovableFormGrp.value.empId,
            cadreCode: this.immovableFormGrp.value.cadreCode,
            cadreName: this.immovableFormGrp.value.cadreName,
        dateOfBirth: this.immovableFormGrp.value.dateOfBirth,
        dateOfJointService: this.immovableFormGrp.value.dateOfJointService,
        descOfProperty: this.immovableFormGrp.value.descOfProperty,
        districtOfProperty:this.immovableFormGrp.value.districtOfProperty,
        divisionOfProperty:this.immovableFormGrp.value.divisionOfProperty,
        talukOfProperty: this.immovableFormGrp.value.talukOfProperty,
        villageOfProperty: this.immovableFormGrp.value.villageOfProperty,
        surveyNo: this.immovableFormGrp.value.surveyNo,
        areaOfProperty:this.immovableFormGrp.value.areaOfProperty,
        natureOfLand: this.immovableFormGrp.value.natureOfLand,
        acquiredEmployee: this.immovableFormGrp.value.acquiredEmployee,
        buyerName:this.immovableFormGrp.value.buyerName,
        buyerRelationship:this.immovableFormGrp.value.buyerRelationship,
        dateOfAcquisition:this.immovableFormGrp.value.dateOfAcquisition,
        modeOfAcquired:this.immovableFormGrp.value.modeOfAcquired,
        sellerName:this.immovableFormGrp.value.sellerName,
        valueOfProperty:this.immovableFormGrp.value.valueOfProperty,
        sanctionedDetails:this.immovableFormGrp.value.sanctionedDetails,
        annualIncome:this.immovableFormGrp.value.annualIncome,
        moveImmove:"Immovable",
        remarks:this.immovableFormGrp.value.remarks,
            

           

          };
         
        
           // Send an HTTP PUT request to update the data in the database
      this.employeeService.saveEmpImmovable(updatedData).subscribe(
        (response) => {
          // Handle the response from the server (e.g., show a success message)
          console.log('Data updated:', response);


          // Optionally, you can display a success message.
          this.snackbar.open('Data updated successfully', 'Dismiss', {
            duration: 5000, // Adjust the duration as needed
          });

          setTimeout(() => {
            this.getImmovableDetailsBynId();
          }, 1000);
          this.router.navigate(['/asset-details/list']);

        },
        (error) => {
          // Handle errors (e.g., show an error message)
          console.error('Error updating data:', error);

          if (error.status === 400) {
            // Handle specific 400 Bad Request errors, if needed
            // You can display a more informative error message here.
          } else {
            // Handle other error cases (e.g., network issues)
            // Display a generic error message to the user.
            this.snackbar.open('An error occurred while updating data. Please try again later.', 'Dismiss', {
              duration: 5000, // Adjust the duration as needed
            });
          }
        }
      );
    }
  }

}
