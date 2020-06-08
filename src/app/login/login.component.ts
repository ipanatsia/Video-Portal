import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  submitted:Boolean = false;
  loading: Boolean = false;
  error: String ='';
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }



  onSubmit(data){
    this.submitted = true;

    //exit if inputs are invalid
    if (this.loginForm.invalid){
      return;
    }

 
    

    this.auth.login(data.username,data.password);
    
  }

}
