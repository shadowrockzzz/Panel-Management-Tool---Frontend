import { Component } from '@angular/core';
import { faHouse, faArrowLeft, faPenToSquare, faPlus } from '@fortawesome/free-solid-svg-icons';

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

  slots: {start: any, end: any, status: String, bookedBy: String, comments: String}[] = [];

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
  }

}
