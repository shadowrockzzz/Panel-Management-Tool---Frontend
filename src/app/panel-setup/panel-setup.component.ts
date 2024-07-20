import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import { SampleService } from '../services/sample.service';

@Component({
  selector: 'app-panel-setup',
  templateUrl: './panel-setup.component.html',
  styleUrls: ['./panel-setup.component.scss']
})
export class PanelSetupComponent {

  panelForm: FormGroup| any

  faHouse = faHouse;
  faArrowLeft = faArrowLeft;
  faArrowRightFromBracket = faArrowRightFromBracket;

  constructor(private fb: FormBuilder, private location: Location, private router: Router, private service: SampleService){

  }

  ngOnInit(){
    this.panelForm = this.fb.group({
      name: ["",Validators.required, Validators.minLength(3)] ,
      band: ["",Validators.required],
      role:["",Validators.required],
      password: ["",Validators.required],
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


  logOut= ()=>{
    sessionStorage.removeItem('User Name')
    sessionStorage.removeItem('Panel Token')
    this.router.navigateByUrl('/')
  }

  onSubmit = ()=>{

    let blank = false;

    for (let key in this.panelForm.value){
      if(!this.panelForm.value[key]){
        blank = true
        break
      }
    }

    try{
      if(!blank){
        this.service.register(this.panelForm.value).subscribe((data)=>{
          window.confirm("User added to the Database")
          this.panelForm.reset()
        },()=>{
          window.confirm("Unable to save the details. Please try again later")
        })
      }
      else{
        window.confirm("Submit by filling up all the fields");
      }
    }
    catch(err){
      console.error(err)
    }
  }

  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

}
