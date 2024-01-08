import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit-division-office',
  templateUrl: './edit-division-office.component.html',
  styleUrls: ['./edit-division-office.component.css']
})
export class EditDivisionOfficeComponent {

  myForm: FormGroup;
  id: any;
  data: any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private employeeService:EmployeeService,private route: ActivatedRoute )
  {
    this.myForm = this.formBuilder.group({
      v_Division_Code: ['', Validators.required],
      v_Select_Circle: ['', Validators.required],
      v_Division_Name: ['', Validators.required],
      v_Division_Place: ['', Validators.required],
      v_Address: ['', Validators.required],
      n_Pincode: ['', Validators.required],
      v_Email: ['', Validators.required],
      v_Phone: ['', Validators.required],
      n_Mobile: ['', Validators.required],
      n_ID:['', Validators.required],
      v_Office_Head:['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getDivisionOfficeData(this.id);
      console.log(this.id);
    });
  }

  getDivisionOfficeData(id: any) {
    this.employeeService.getDivisionOffice(this.id).subscribe(
      (response) => {
        this.data = response.data;
        console.log('Response:', this.data);
        this.myForm.setValue({
          v_Division_Code: this.data.v_Division_Code,
          v_Select_Circle: this.data.v_Select_Circle,
          v_Division_Name: this.data.v_Division_Name,
          v_Division_Place: this.data.v_Division_Place,
          v_Address: this.data.v_Address,
          n_Pincode: this.data.n_Pincode,
          v_Email: this.data.v_Email,
          v_Phone: this.data.v_Phone,
          n_Mobile: this.data.n_Mobile,
          v_Office_Head:this.data.v_Office_Head,
          n_ID:this.id
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  saveDivisionsOffice(): void {

    const formValue = this.myForm.value;
    this.employeeService.saveDivisionsOffice(formValue).subscribe(
      (response) => {
        console.log('Saved division Office:', response);
        alert('The Division data was added successfully!');
        window.location.reload();
      },
      (error) => {
        console.error('Error while saving Circle Office:', error);
      }
    );
  }

}
