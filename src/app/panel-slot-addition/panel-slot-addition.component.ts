import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faArrowLeft, faTrash, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
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
  faArrowRightFromBracket = faArrowRightFromBracket;
  name: String = "";
  band: String = "";
  skillSet: String = "";
  userName: any = sessionStorage.getItem("User Name")

  slots: {start: any, end: any, status: String, bookedBy: String, comments: String, id:any, reviewedBy: String}[] = [];

  constructor(private location: Location, private router: Router, private service: SampleService){
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


  logOut= ()=>{
    sessionStorage.removeItem('User Name')
    sessionStorage.removeItem('Panel Token')
    this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
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
    this.getSlots()
  }

  getSlots(){
    let userName = sessionStorage.getItem("User Name")
    if(userName){
      const date1 = new Date()
      const date = new Date(date1.getFullYear(), date1.getMonth(),date1.getDate())
      console.log(date)
      this.service.getSlotsByPanel(date, userName).subscribe((data)=>{
        for (let slot in data){
          this.slots.push({
            start: this.formatDate(data[slot].start.toString()),
            end: this.formatDate(data[slot].end.toString()),
            status: data[slot].status,
            bookedBy: data[slot].bookedBy,
            comments: data[slot].comments,
            id: data[slot]._id,
            reviewedBy: ""
          })
        }
      })
    }
  }

  formatDate(dateTimeString: string): string {
    // const date = new Date(dateTimeString);
    // const year = date.getUTCFullYear();
    // const month = `${date.getUTCMonth() + 1}`.padStart(2, '0');
    // const day = `${date.getUTCDate()}`.padStart(2, '0');
    // const hours = `${date.getUTCHours()}`.padStart(2, '0');
    // const minutes = `${date.getUTCMinutes()}`.padStart(2, '0');
    // return `${year}-${month}-${day}T${hours}:${minutes}`;
    const date = new Date(dateTimeString);
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  updateSlots(){
    const promises = []
    for (let slot of this.slots){
      if(slot.id){
        const promise1 = this.service.updateSlots(slot).subscribe((data)=>{
          console.log(data)
        })
        promises.push(promise1)
      }
      else{
        let user = sessionStorage.getItem("User Name")
        if(user){
          slot.bookedBy = user
          const promise1 = this.service.addSlot(slot).subscribe((data)=>{
            console.log(data)
          })
          promises.push(promise1)
        }
      }
    }

    this.deleteSlotsWhenSaved()
    Promise.all(promises).then(()=>{
      window.confirm("Slots are added/updated")
    })
  }

  deleteSlotList: string[] = []

  deleteSlotsWhenSaved(){
    for (let item of this.deleteSlotList){
      if(item){
        console.log(item)
        this.service.deleteSlot(item).subscribe((data)=>{
          console.log(data)
        })
      }
    }
  }

  rangeArray(start: number, end: number): number[] {
    return Array.from({ length: (end - start) }, (_, index) => start + index);
  }

  updateStartTime(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.slots[index].start = target.value;
  }

  // Update the end time in the timeSlotArray
  updateEndTime(index: number, event: Event): void {
    const target = event.target as HTMLInputElement;
    this.slots[index].end = target.value;
  }

  deleteSlot(item:any){
    this.deleteSlotList.push(this.slots[item].id)
    this.slots.splice(item,1);
  }

  slotAddition(){
    this.slots.push({"start":"0000-00-00T00:00:00", "end": "0000-00-00T00:00:00",status: "available", bookedBy: "-", comments: "", id:null, reviewedBy: ""})
  }

  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

}
