import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent {

  myForm: FormGroup | any;

  constructor(private fb: FormBuilder){

  }

  ngOnInit(){
    this.myForm = this.fb.group({
      userName: ["",Validators.required, Validators.minLength(3)] ,
      password: ["",Validators.required]
    })

  }

  onSubmit = ()=>{
    console.log(this.myForm)
  }

}
