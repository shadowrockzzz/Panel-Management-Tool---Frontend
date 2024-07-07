import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faArrowLeft, faTrash } from '@fortawesome/free-solid-svg-icons';
import { SampleService } from '../services/sample.service';

@Component({
  selector: 'app-panel-slot-addition',
  templateUrl: './panel-slot-addition.component.html',
  styleUrls: ['./panel-slot-addition.component.scss']
})
export class PanelSlotAdditionComponent implements OnInit {

  faHouse = faHouse;
  faArrowLeft = faArrowLeft;
  faTrash = faTrash;
  name: String = "";
  band: String = "";
  skillSet: String = "";

  timeSlotArray: { start: string, end: string }[] = [];

  constructor(private location: Location, private router: Router, private service: SampleService){
    this.service.getPanelData().subscribe((data)=>{
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

  ngOnInit(): void {
    this.timeSlotArray.push({ "start": "2024-07-03T09:00:00", "end": "2024-07-03T17:00:00" });
    this.timeSlotArray.push({ "start": "2024-07-01T12:00:00", "end": "2024-07-02T14:30:00" });
  }

  rangeArray(start: number, end: number): number[] {
    return Array.from({ length: (end - start) }, (_, index) => start + index);
  }

  // Update the start time in the timeSlotArray
  updateStartTime(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.timeSlotArray[index].start = target.value;
  }

  // Update the end time in the timeSlotArray
  updateEndTime(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.timeSlotArray[index].end = target.value;
  }

  deleteSlot(item:any){
    this.timeSlotArray.splice(item,1);
  }

  slotAddition(){
    this.timeSlotArray.push({"start":"0000-00-00T00:00:00", "end": "0000-00-00T00:00:00"})
  }

  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

}
