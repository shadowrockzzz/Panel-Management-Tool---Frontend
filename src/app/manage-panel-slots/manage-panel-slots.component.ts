import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse, faArrowLeft, faPenToSquare, faPlus, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';
import { SampleService } from '../services/sample.service';

@Component({
  selector: 'app-manage-panel-slots',
  templateUrl: './manage-panel-slots.component.html',
  styleUrls: ['./manage-panel-slots.component.scss']
})
export class ManagePanelSlotsComponent {

  faPlus= faPlus;
  faPenToSquare= faPenToSquare;
  faHouse = faHouse;
  faArrowLeft = faArrowLeft;
  faFloppyDisk = faFloppyDisk;
  editMode: Boolean = false;
  name: String = "";
  band: String = "";
  skillSet: String = "";
  startDate: any =this.formatDateTimeToString(new Date());
  endDate: any = this.formatDateTimeToString(new Date())

  userName: any = sessionStorage.getItem('User Name');

  slots: {start: any, end: any, status: String, bookedBy: String, comments: String, id:any}[] = [];

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

  updateSlot(){
    this.editSlots()
    for (let data in this.slots){
      if(this.slots[data].id){
        this.service.updateSlots(this.slots[data]).subscribe((data)=>{
          console.log(data)
        })
      }else{
        if(this.slots[data].start && this.slots[data].end){
          const item = {...this.slots[data]}
          const user = sessionStorage.getItem("User Name")
          if(user && item.bookedBy==="-"){
            item.bookedBy = user
            this.slots[data].bookedBy = user
          }else{
            console.log("Login in again")
          }
          delete item.id
          console.log(this.slots[data], item)
          this.service.addSlot(item).subscribe((data)=>{
            console.log(data)
          })
        }else{
          window.confirm("Invalid timings for a slot")
        }
      }
    }
  }

  addNewSlot(){
    this.slots.push({
      start: "",
      end : "",
      status:"available",
      bookedBy: "-",
      comments: "",
      id:null
    })
  }

  editSlots(){
    this.editMode = !this.editMode
  }

  formatDate(dateTimeString: string): string {
    const date = new Date(dateTimeString);
    const year = date.getUTCFullYear();
    const month = `${date.getUTCMonth() + 1}`.padStart(2, '0');
    const day = `${date.getUTCDate()}`.padStart(2, '0');
    const hours = `${date.getUTCHours()}`.padStart(2, '0');
    const minutes = `${date.getUTCMinutes()}`.padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  formatDateTimeToString(date: Date){
    const year = date.getFullYear()
    const month = date.getMonth()+1 <10 ? "0"+(date.getMonth()+1): date.getMonth()+1
    const dateMonth = date.getDate()<10? "0"+date.getDate() : date.getDate()
    return `${year}-${month}-${dateMonth}`
  }

  dateChangeTrigger(){
    if(this.startDate>this.endDate){
      if(window.confirm("The start date should be less than or equal to end date")){
        this.startDate = this.formatDateTimeToString(new Date());
        this.endDate = this.formatDateTimeToString(new Date());
      }
      else{
        this.startDate = this.formatDateTimeToString(new Date());
        this.endDate = this.formatDateTimeToString(new Date());
      }
      
    }
    else{
      try{
        this.service.getAllSlots(this.startDate,this.endDate).subscribe((data)=>{
          this.slots = []
          console.log(data)
          for (let item in data){
            this.slots.push({
              start:this.formatDate(data[item].start),
              end : this.formatDate(data[item].end),
              status: data[item].status,
              bookedBy: data[item].bookedBy,
              comments: data[item].comments,
              id: data[item]._id
            })
          }
          console.log(this.slots)
        })
      }
      catch(err){
        console.error(err)
      }
    }
  }

  ngOnInit(){

    this.service.getAllSlots(this.startDate, this.endDate).subscribe((data)=>{
      try{
        for (let item in data){
          this.slots.push({
            start:this.formatDate(data[item].start),
            end : this.formatDate(data[item].end),
            status: data[item].status,
            bookedBy: data[item].bookedBy,
            comments: data[item].comments,
            id: data[item]._id
          })
        }
      }
      catch(err){
        console.error(err)
      }
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
