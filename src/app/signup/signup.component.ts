import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators  } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  submitted:Boolean = false;
  loading: Boolean = false;
  error: String ='';
  signupForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private auth:AuthenticationService) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.signupForm.controls; }

  getUsers(){
    this.auth.getAllUsers().subscribe(data=>{console.log(data);});
  }

  onSubmit(data){
    this.submitted = true;

    //exit if inputs are invalid
    if (this.signupForm.invalid){
      return;
    }

 
    

    this.auth.signup(data.username,data.password);
    
  }

}
