import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { EmployeeService } from 'src/app/services/employee.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-head-office',
  templateUrl: './view-head-office.component.html',
  styleUrls: ['./view-head-office.component.css']
})
export class ViewHeadOfficeComponent {
  myForm: FormGroup;
  id:any;
  data:any;
  constructor(private http: HttpClient, private formBuilder: FormBuilder,private employeeService:EmployeeService,private route: ActivatedRoute ) {


    {
      this.myForm = this.formBuilder.group({
        v_Office_Code: [''],
        v_HeadOffice_Name: ['' ],
        v_HeadOffice_Place: ['' ],
        v_Address: ['' ],
        n_Pincode: ['' ],
        v_Email: ['' ],
        v_Phone: ['' ],
        n_Mobile: [''],
        n_ID:['' ],
        v_Office_Head:['' ],
      });
    }


  }

  ngOnInit(): void {

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.getHeadOfficeData(this.id);
      console.log(this.id)
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
          v_Office_Head:this.data.v_Office_Head
        });
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }
}
