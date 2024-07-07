import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faHouse } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel-setup',
  templateUrl: './panel-setup.component.html',
  styleUrls: ['./panel-setup.component.scss']
})
export class PanelSetupComponent {

  panelForm: FormGroup| any

  faHouse = faHouse;
  faArrowLeft = faArrowLeft;

  constructor(private fb: FormBuilder, private location: Location, private router: Router){

  }

  ngOnInit(){
    this.panelForm = this.fb.group({
      name: ["",Validators.required, Validators.minLength(3)] ,
      band: ["",Validators.required],
      skillSet: ["",Validators.required],
      emailId: ["",Validators.required],
      ICPCertified: ["Yes",Validators.required],
      city: ["",Validators.required],
      accountName: ["",Validators.required],
      subPractice: ["subPractice1", Validators.required],
      empId: ["",Validators.required],
      sector: ["sector 1", Validators.required],
      location: ["location 1", Validators.required],
      contactNumber: ["",Validators.required],
      practice: ["practice 1", Validators.required],
      level: ["level 1",Validators.required]
    })
  }

  onSubmit = ()=>{
    console.log("Submission is completed")
    // console.log(e)
    console.log(this.panelForm)
  }

  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

}
