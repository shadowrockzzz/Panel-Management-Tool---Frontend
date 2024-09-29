import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SampleService } from '../services/sample.service';
import { Router } from '@angular/router';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  myForm: FormGroup | any;

  constructor(private fb: FormBuilder, private ss: SampleService, private router: Router, private authService: AuthServiceService){

  }

  ngOnInit(){
    this.myForm = this.fb.group({
      empId: ["",Validators.required, Validators.minLength(3)] ,
      password: ["",Validators.required]
    })

  }

  onSubmit() {
    const data = {
      empId: this.myForm.controls.empId.value,
      password: this.myForm.controls.password.value
    };

    this.ss.signIn(data).subscribe(
      response => {
        console.log('Login response:', response);
        this.authService.setToken(response.token)
        // this.storage.setItem("panelToken",response.token)
        sessionStorage.setItem("Panel Token",response.token)
        sessionStorage.setItem("User Name",response.userName)
        sessionStorage.setItem("User Id", data.empId)
        this.router.navigateByUrl('/dashboard')
        

      },
      error => {
        if(error.status===404){
          window.confirm("Unable to connect to database")
        }else{
          window.confirm("Invalid Credentials")
        }
      }
    );
  }

}
