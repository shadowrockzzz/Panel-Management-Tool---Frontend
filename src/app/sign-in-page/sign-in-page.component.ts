import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SampleService } from '../services/sample.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  myForm: FormGroup | any;

  constructor(private fb: FormBuilder, private ss: SampleService, private router: Router){

  }

  ngOnInit(){
    this.myForm = this.fb.group({
      userName: ["",Validators.required, Validators.minLength(3)] ,
      password: ["",Validators.required]
    })

  }

  onSubmit() {
    const data = {
      userName: this.myForm.controls.userName.value,
      password: this.myForm.controls.password.value
    };

    this.ss.signIn(data).subscribe(
      response => {
        console.log('Login response:', response);
        // this.storage.setItem("panelToken",response.token)
        sessionStorage.setItem("Panel Token",response.token)
        this.router.navigateByUrl('/dashboard')
        

      },
      error => {
        console.error('Login error:', error);
        // Handle error (show error message, etc.)
      }
    );
  }

}
