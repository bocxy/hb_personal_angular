import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-head-office',
  templateUrl: './edit-head-office.component.html',
  styleUrls: ['./edit-head-office.component.css']
})
export class EditHeadOfficeComponent {

  myForm: FormGroup;
  id: any;
  data: any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private employeeService:EmployeeService, private route: ActivatedRoute )

  {
    this.myForm = this.formBuilder.group({
      v_Office_Code: ['', Validators.required],
      v_HeadOffice_Name: ['', Validators.required],
      v_HeadOffice_Place: ['', Validators.required],
      v_Address: ['', Validators.required],
      n_Pincode: ['', Validators.required],
      v_Email: ['', Validators.required],
      v_Phone: ['', Validators.required],
      n_Mobile: ['', Validators.required],
      n_ID:['', Validators.required],
      v_Office_Head:['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getHeadOfficeData(this.id);
      console.log(this.id);
    });
  }

  getHeadOfficeData(id: any) {
    this.employeeService.getHeadOffice(this.id).subscribe(
      (response) => {
        this.data = response.data;
        console.log('Response:', this.data);
        this.myForm.setValue({
          v_Office_Code: this.data.v_Office_Code,
          v_HeadOffice_Name: this.data.v_HeadOffice_Name,
          v_HeadOffice_Place: this.data.v_HeadOffice_Place,
          v_Address: this.data.v_Address,
          n_Pincode: this.data.n_Pincode,
          v_Email: this.data.v_Email,
          v_Phone: this.data.v_Phone,
          n_Mobile:this.data.n_Mobile,
          n_ID:this.id,
          v_Office_Head: this.data.v_Office_Head

        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  // saveHeadOffice() {

  //     this.myForm.patchValue({ n_ID: this.id });
  //     console.log(this.myForm.value);
  //     this.http.post<any>('http://personalapi.eba-vy6uzsjc.ap-south-1.elasticbeanstalk.com/saveHeadOffice', this.myForm.value, {
  //       headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  //     }).subscribe(
  //       (response) => {

  //         console.log('Response:', response);
  //         alert('The HeadOffice Data was Updated Successfully!')

  //       },
  //       (error) => {
  //         console.error('Error:', error);

  //       }
  //     );

  // }

  saveHeadOffice(): void {

    const formValue = this.myForm.value;
    this.employeeService.saveHeadOffice(formValue).subscribe(
      (response) => {
        console.log('Saved division Office:', response);
        alert('The Head Office data was added successfully!');
        window.location.reload();
      },
      (error) => {
        console.error('Error while saving Circle Office:', error);
      }
    );
  }

}
