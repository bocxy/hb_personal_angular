import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmDialogComponent } from 'src/app/confirm-dialog/confirm-dialog.component';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-edit-movable',
  templateUrl: './edit-movable.component.html',
  styleUrls: ['./edit-movable.component.scss']
})
export class EditMovableComponent implements OnInit {


  status = [
    { 'status': "Yes", 'value': true },
    { 'status': "No", 'value': false },
   
  ]
  selectedValue: string;
  selectedStatus: string;

  id:any;
  data:any;
  myForm: FormGroup;
  idToEdit:number;


  noData = false;
  couponsListData: any;
  filteredData: any[];
  dataSource: any;
  dialog: any;

  movableFormGrp: FormGroup;
  types: string[] = [];
  submitted = false;
  edit = false;
  couponId: string;
  view = false;
  employeeListData: any;
  selectedDocument: File;
  base64SaleDeed:any;
  loader: any;

constructor(private fb: FormBuilder, private router: Router, private snackbar: MatSnackBar, private activeRoute: ActivatedRoute,  private employeeService:EmployeeService,private http: HttpClient ) { }


  ngOnInit(): void {


    
    this.activeRoute.paramMap.subscribe(params => {
      
      let id= params.get('id');
if(id){
  this.id =JSON.parse(id);
}
      debugger
      console.log('id',this.id);
      
      this.getMovableDetailsBynId();
     
      console.log(this.id)
    });


    this.movableFormGrp = this.fb.group({
      empId: [''],
      empName: [''],
      cadreCode: [''],
      cadreName: [''],
      dateOfBirth: [''],
      dateOfJointService: [''],
      districtOfProperty:[''],
      divisionOfProperty:[''],
      sourceOfIncome: [''],
      valueOfProperty: [''],
      propRegisteredName: [''],
      dateOfPurchase: [''],
      descOfProperty: [''],
      incomeFromProp: [''],
      propertyDocumentName: [''],
      propertyDocumentPath: [''],
      propertyDocumentfile:['']
      
    })
  }

  onSubmit() {
    
    if (this.movableFormGrp.valid) {
      console.log("Working1")
      let data={
        "empId": this.movableFormGrp.value.empId,
      "empName": this.movableFormGrp.value.empName,
      "cadreCode": this.movableFormGrp.value.cadreCode,
      "cadreName": this.movableFormGrp.value.cadreName,
      "dateOfBirth": this.movableFormGrp.value.dateOfBirth,
      "dateOfJointService": this.movableFormGrp.value.dateOfJointService,
      "districtOfProperty":this.movableFormGrp.value.districtOfProperty,
      "divisionOfProperty":this.movableFormGrp.value.divisionOfProperty,
      "sourceOfIncome": this.movableFormGrp.value.sourceOfIncome,
      "valueOfProperty": this.movableFormGrp.value.valueOfProperty,
      "propRegisteredName": this.movableFormGrp.value.propertyDocumentName,
      "dateOfPurchase": this.movableFormGrp.value.dateOfPurchase,
      "descOfProperty": this.movableFormGrp.value.descOfProperty,
      "incomeFromProp": this.movableFormGrp.value.incomeFromProp,
      "propertyDocumentName": this.movableFormGrp.value.propertyDocumentName,
      "propertyDocumentPath": this.movableFormGrp.value.propertyDocumentPath,
      "moveImmove": "Movable",
      "propertyDocumentfile": this.base64SaleDeed
       
        
    }
    console.log(data);
      // this.employeeService.saveEmpExamHistory(this.examHistoryFormGrp.value).subscribe(
        this.employeeService.saveEmpMovable(data).subscribe(
  
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

  
  getMovableDetailsBynId() {
    console.log(this.id);
    console.log("Working1");
        this.employeeService.getMovableDetailsBynId(this.id).subscribe(
          (response) => {
            console.log('res',response);
            this.data = response.data;
            
      // this.data=response.data[0];
      console.log('data',this.data);
      
      this.movableFormGrp.patchValue({
       
        empId:this.data.empId,
        empName: this.data.empName,
      cadreCode: this.data.cadreCode,
      cadreName: this.data.cadreName,
      dateOfBirth: this.data.dateOfBirth,
      dateOfJointService: this.data.dateOfJointService,
      districtOfProperty:this.data.districtOfProperty,
      divisionOfProperty:this.data.divisionOfProperty,
      sourceOfIncome: this.data.sourceOfIncome,
      valueOfProperty: this.data.valueOfProperty,
      propRegisteredName: this.data.propRegisteredName,
      dateOfPurchase: this.data.dateOfPurchase,
      descOfProperty: this.data.descOfProperty,
      incomeFromProp: this.data.incomeFromProp,
      propertyDocumentName: this.data.propertyDocumentName,
      propertyDocumentPath: this.data.propertyDocumentPath,
      propertyDocumentfile:this.data.propertyDocumentfile,
      moveImmove:this.data.moveImmove
              });
      
            console.log('Response:', response);
      
          },
          (error) => {
      
            console.error('Error:', error);
      
          }
        );
      }



  onFileSelected(event: any) {
    this.selectedDocument = event.target.files[0];
    console.log(this.selectedDocument);
    this.uploadFile();
  }
  
  uploadFile() {
    if (this.selectedDocument) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.base64SaleDeed = reader.result.toString().split(',')[1]; // Extract the base64 part
        console.log(this.base64SaleDeed);
       
      };
      reader.readAsDataURL(this.selectedDocument);
    }
  }
  
  async uploadFiles() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        message: 'Are you sure you want to send the sale deed files?',
        confirmBackgroundColor: 'green',
        cancelBackgroundColor: 'red',
        confirmTextColor: 'white',
        cancelTextColor: 'white',
        confirmText: 'Yes',
        cancelText: 'No'
      }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.processFiles();
      }
    });
  
  
  }
  
  async processFiles() {
  try{
    this.loader.start();
    this.base64SaleDeed = await this.readFileAsBase64(this.selectedDocument);
  
    
  
  }catch (error) {
        this.loader.stop();
        console.error('Error processing or uploading data:', error);
      }
  
  }
   
   
    removeDataPrefix(base64Data: string): string {
      const prefixes = [
        'data:application/pdf;base64,',
        'data:image/png;base64,',
        'data:image/jpeg;base64,',
        'data:image/jpg;base64,'
      ];
  
      for (const prefix of prefixes) {
        if (base64Data.startsWith(prefix)) {
          return base64Data.slice(prefix.length);
        }
      }
      return base64Data;
    }
  
  
    async readFileAsBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const result = event.target?.result as string;
          resolve(this.removeDataPrefix(result));
        };
        reader.onerror = (event) => {
          reject(event.target?.error);
        };
        reader.readAsDataURL(file);
      });
    }

    applyFilter(filterValue: string) {
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    applyTypeFilter() {
      if (this.selectedStatus?.length || this.selectedValue?.length) {
        this.filteredData = this.dataSource.data.filter(item => {
          // Check if the item's category is included in the selectedValue array
          if (this.selectedValue?.length && !this.selectedValue?.includes(item.type[0])) {
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

    openFileInNewTab(propertyDocumentPath: string): string {
      return 'file://' + propertyDocumentPath;
    }

    onUpdate(id: any) {
      if (this.movableFormGrp.valid) {
        console.log(this.movableFormGrp);
        const updatedData = {
          // Include the ID of the existing record
           
          nid: this.id, 
                         
          empName: this.movableFormGrp.value.empName,
          empId:this.movableFormGrp.value.empId, 
      cadreCode: this.movableFormGrp.value.cadreCode,
      cadreName: this.movableFormGrp.value.cadreName,
      dateOfBirth: this.movableFormGrp.value.dateOfBirth,
      dateOfJointService: this.movableFormGrp.value.dateOfJointService,
      districtOfProperty:this.movableFormGrp.value.districtOfProperty,
      divisionOfProperty:this.movableFormGrp.value.divisionOfProperty,
      sourceOfIncome: this.movableFormGrp.value.sourceOfIncome,
      valueOfProperty: this.movableFormGrp.value.valueOfProperty,
      propRegisteredName: this.movableFormGrp.value.propRegisteredName,
      dateOfPurchase: this.movableFormGrp.value.dateOfPurchase,
      descOfProperty: this.movableFormGrp.value.descOfProperty,
      incomeFromProp: this.movableFormGrp.value.incomeFromProp,
      propertyDocumentName: this.movableFormGrp.value.propertyDocumentName,
      propertyDocumentPath: this.movableFormGrp.value.propertyDocumentPath,
      propertyDocumentfile:this.movableFormGrp.value.propertyDocumentfile,
      moveImmove:"Movable"

        };
       
      
         // Send an HTTP PUT request to update the data in the database
    this.employeeService.saveEmpMovable(updatedData).subscribe(
      (response) => {
        // Handle the response from the server (e.g., show a success message)
        console.log('Data updated:', response);

        // Fetch the updated data from the backend and update the form fields
        // this.getEmpExamHistoryById();

        // Optionally, you can display a success message.
        this.snackbar.open('Data updated successfully', 'Dismiss', {
          duration: 5000, // Adjust the duration as needed
        });

        setTimeout(() => {
          this.getMovableDetailsBynId();
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
