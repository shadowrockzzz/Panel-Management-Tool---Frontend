import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse, faArrowLeft, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SampleService } from '../services/sample.service';

@Component({
  selector: 'app-manage-panel-slots',
  templateUrl: './manage-panel-slots.component.html',
  styleUrls: ['./manage-panel-slots.component.scss']
})
export class ManagePanelSlotsComponent {

  faPlus= faPlus;
  faPenToSquare= faPenToSquare
  faHouse = faHouse;
  faArrowLeft = faArrowLeft;
  name: String = "";
  band: String = "";
  skillSet: String = "";

  userName: any = sessionStorage.getItem('User Name');

  slots: {start: any, end: any, status: String, bookedBy: String, comments: String}[] = [];

  constructor(private location: Location, private router: Router, private service: SampleService, private route: ActivatedRoute){
    try {
      this.route.queryParams.subscribe((data)=>{
        if(data['userName']){
          this.userName = data['userName']
        }
      })
    }
    catch(err){
      console.error(err)
    }
  }

  ngOnInit(){
    this.slots.push({
      start: "2024-07-03T09:00:00",
      end : "2024-07-03T09:00:00",
      status: "available",
      bookedBy: "-",
      comments: ""

    })

    this.slots.push({
      start: "2024-07-03T09:00:00",
      end : "2024-07-03T09:00:00",
      status: "available",
      bookedBy: "-",
      comments: ""

    })

    

    this.service.getPanelData(this.userName).subscribe((data)=>{
      try{
        if(data){
          this.name = data.userName;
          this.band = data.band;
          this.skillSet = data.skillSet;
        }
      }
      catch(err){
        console.error(err)
      }
    })
  }



  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

}
