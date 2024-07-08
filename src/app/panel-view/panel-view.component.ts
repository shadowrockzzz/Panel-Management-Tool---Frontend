import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faArrowLeft, faArrowDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-panel-view',
  templateUrl: './panel-view.component.html',
  styleUrls: ['./panel-view.component.scss']
})
export class PanelViewComponent {

  faHouse = faHouse;
  faArrowLeft = faArrowLeft;
  faArrowDown = faArrowDown;
  faChevronRight=faChevronRight;

  panelList: {name:String,band :String, accountName: String, skillSet: String}[] = [];

  constructor(private location: Location, private router: Router){

  }

  ngOnInit(){
    this.panelList.push({
      name: "JohnDoe123",
      accountName: "ABC Corp",
      band:"Senior",
      skillSet: "JavaScript, Node.js, React"
    },
    {
      name: "John123",
      accountName: "ABC Corp",
      band:"Senior",
      skillSet: "JavaScript,React, Java"
    })
  }

  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

  navigateToPanelSlots(userName: String){
    const params = {
     "userName": userName
    }
    this.router.navigate(['/manage'],{queryParams: params})
  }

}
