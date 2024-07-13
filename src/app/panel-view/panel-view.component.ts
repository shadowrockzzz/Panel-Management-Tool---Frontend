import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faArrowLeft, faArrowDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { SampleService } from '../services/sample.service';

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

  panelList:any = [];

  constructor(private location: Location, private router: Router, private service: SampleService){

  }


  ngOnInit(){
    this.getAllPanels()
  }

  getAllPanels(){
    this.service.getAllPanels().subscribe((data)=>{
      console.log(data)
      this.panelList = [...data]
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
