import { Component } from '@angular/core';
import { SampleService } from '../services/sample.service';
import { Router } from '@angular/router';
import { faArrowLeft, faArrowRightFromBracket, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private service: SampleService, private router: Router, private location: Location){

  }

  faHouse = faHouse;
  faArrowLeft = faArrowLeft;
  faArrowRightFromBracket = faArrowRightFromBracket;

  panelId: any = ""

  panelData: any = {}

  ngOnInit(){
    this.panelId = sessionStorage.getItem("User Id")
    this.service.getPanelData(this.panelId).subscribe((data)=>{
        this.panelData = {...data}
    },(err)=>{
      console.error(err)
    })
  }

  goBack(){
    this.location.back()
  }

  navigate(page:String){
    this.router.navigateByUrl('/'+page)
  }

}
