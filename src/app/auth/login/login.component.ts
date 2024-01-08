import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
 
  submitted = false;
  edit = false;
  hide = true;
  form: any;

  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private fb: FormBuilder,private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [],
      password: []
    })
  }

  login() {
    if (this.form.invalid) {
      this.submitted = true;
      return;
    } else {
      this.submitted = false;
      this.router.navigate(['/office-data/list'])
    }
  }


  showHead: boolean = false;



  
  hideNavbarAndFooterForLogin() {
    this.showHead = false;
  }
  showNavbarAndFooterForOtherComponents() {
    this.showHead = true;
  }
}
