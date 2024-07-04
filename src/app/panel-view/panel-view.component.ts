import { Component } from '@angular/core';
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

  ngOnInit(){
    this.panelList.push({
      name: "Sai Velagala",
      accountName: "Aviva",
      band:"B2",
      skillSet: "Developing, Testing"
    },
    {
      name: "Satya",
      accountName: "Wipro",
      band:"B3",
      skillSet: "Developing"
    })
  }

}