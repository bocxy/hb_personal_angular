import { HttpClient} from '@angular/common/http';
import { Component } from '@angular/core';

import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/employee.service';

@Component({
  selector: 'app-view-circle-office',
  templateUrl: './view-circle-office.component.html',
  styleUrls: ['./view-circle-office.component.css']
})
export class ViewCircleOfficeComponent {

  id:any;
  data:any;
  myForm: FormGroup;

  constructor(private employeeService:EmployeeService,private http: HttpClient, private formBuilder: FormBuilder,private route: ActivatedRoute, ) {

    {
      this.myForm = this.formBuilder.group({
        v_Circle_Code: ['', Validators.required],
        v_Type_Of_Circle: ['', Validators.required],
        v_Circle_Name: ['', Validators.required],
        v_Circle_Place: ['', Validators.required],
        v_Address: ['', Validators.required],
        n_Pincode: ['', Validators.required],
        v_Email: ['', Validators.required],
        v_Office_Head:['', Validators.required],
            v_Phone: ['', Validators.required],
            n_Mobile:['', Validators.required],
        n_ID:['', Validators.required]
      });
    }

  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getCircleOfficeData(this.id);
      console.log(this.id)
    });


  }
  getCircleOfficeData(id: any) {
    this.employeeService.getCircleOffice(this.id).subscribe(
      (response) => {
        this.data = response.data;
        console.log('Response:', this.data);
        this.myForm.setValue({
          v_Circle_Code: this.data.v_Circle_Code,
          v_Type_Of_Circle: this.data.v_Type_Of_Circle,
          v_Circle_Name: this.data.v_Circle_Name,
          v_Circle_Place: this.data.v_Circle_Place,
          v_Address: this.data.v_Address,
          n_Pincode: this.data.n_Pincode,
          v_Email: this.data.v_Email,
          v_Office_Head: this.data.v_Office_Head,
          v_Phone: this.data.v_Phone,
          n_Mobile:this.data.n_Mobile,
          n_ID:this.id
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

}
