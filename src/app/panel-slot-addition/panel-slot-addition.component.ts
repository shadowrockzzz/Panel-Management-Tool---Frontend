import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faArrowLeft, faTrash, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
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
  faUser = faUser;
  name: String = "";
  band: String = "";
  skillSet: String = "";
  userId: any = sessionStorage.getItem("User Id")

  slots: {start: any, end: any, status: String, bookedBy: String, comments: String, id:any, reviewedBy: String, AssignedTAID: String, slotAssignedToTA:Boolean}[] = [];

  constructor(private location: Location, private router: Router, private service: SampleService){
    this.service.getPanelData(this.userId).subscribe((data)=>{
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

  navigate(page:String){
    this.router.navigateByUrl('/'+page)
  }

  logOut= ()=>{
    sessionStorage.removeItem('User Name')
    sessionStorage.removeItem('Panel Token')
    sessionStorage.removeItem("User Id")
    this.router.navigateByUrl('/')
  }

  ngOnInit(): void {
    this.service.getPanelData(this.userId).subscribe((data)=>{
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
    let userId = sessionStorage.getItem("User Id")
    if(userId){
      const date1 = new Date()
      const date = new Date(date1.getFullYear(), date1.getMonth(),date1.getDate())
      console.log(date)
      this.service.getSlotsByPanel(date, userId).subscribe((data)=>{
        for (let slot in data){
          this.slots.push({
            start: this.formatDate(data[slot].start.toString()),
            end: this.formatDate(data[slot].end.toString()),
            status: data[slot].status,
            bookedBy: data[slot].bookedBy,
            comments: data[slot].comments,
            id: data[slot]._id,
            reviewedBy: "",
            AssignedTAID: "",
            slotAssignedToTA: false
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
        let userId = sessionStorage.getItem("User Id")
        if(userId){
          slot.bookedBy = userId
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
    const startTime = new Date(target.value)
    
    startTime.setMinutes(startTime.getMinutes() + 45);

    // Format the end time to 'YYYY-MM-DDTHH:MM'
    const endYear = startTime.getFullYear();
    const endMonth = String(startTime.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const endDate = String(startTime.getDate()).padStart(2, '0');
    const endHours = String(startTime.getHours()).padStart(2, '0');
    const endMinutes = String(startTime.getMinutes()).padStart(2, '0');

    this.slots[index].end = `${endYear}-${endMonth}-${endDate}T${endHours}:${endMinutes}`;
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
    this.slots.push({"start":"0000-00-00T00:00:00", "end": "0000-00-00T00:00:00",status: "available", bookedBy: "-", comments: "", id:null, reviewedBy: "", AssignedTAID: "", slotAssignedToTA: false})
  }

  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

}
