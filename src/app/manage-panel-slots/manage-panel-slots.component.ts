import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faHouse, faArrowLeft, faPenToSquare, faPlus, faFloppyDisk, faArrowRightFromBracket, faUser } from '@fortawesome/free-solid-svg-icons';
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
  faArrowRightFromBracket = faArrowRightFromBracket;
  faUser = faUser;
  editMode: Boolean = false;
  name: String = "";
  band: String = "";
  skillSet: String = "";
  startDate: any =this.formatDateTimeToString(new Date());
  endDate: any = this.formatDateTimeToString(new Date())

  userId: any = sessionStorage.getItem('User Id');
  userType:string = ""
  assigneeFilter = "all"

  slots: {slotSelection:Boolean, start: any, end: any, status: String, bookedBy: String, comments: String, id:any, reviewedBy:String,AssignedTAID:any, slotAssignedToTA:any}[] = [];
  slotsTempSave: {slotSelection:Boolean, start: any, end: any, status: String, bookedBy: String, comments: String, id:any, reviewedBy:String,AssignedTAID:any, slotAssignedToTA:any}[] = [];
  constructor(private location: Location, private router: Router, private service: SampleService, private route: ActivatedRoute){
    try {
      this.route.queryParams.subscribe((data)=>{
        if(data['userId']){
          this.userId = data['userId']
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
        let currentUser = sessionStorage.getItem("User Id")
        if(currentUser){
          this.slots[data].reviewedBy = currentUser
          this.service.updateSlots(this.slots[data]).subscribe((data)=>{
            console.log(data)
          })
        }
      }else{
        if(this.slots[data].start && this.slots[data].end){
          const item = {...this.slots[data]}
          const userId = sessionStorage.getItem("User Id")
          if(userId && item.bookedBy==="-"){
            item.bookedBy = userId
            this.slots[data].bookedBy = userId
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

  navigate(page:String){
    this.router.navigateByUrl('/'+page)
  }

  addNewSlot(){
    this.slots.push({
      slotSelection: false,
      start: "",
      end : "",
      status:"available",
      bookedBy: "-",
      comments: "",
      id:null,
      reviewedBy: "",
      AssignedTAID: "",
      slotAssignedToTA: ""
    })
  }

  editSlots(){
    this.editMode = !this.editMode
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

  formatDateTimeToString(date: Date){
    const year = date.getFullYear()
    const month = date.getMonth()+1 <10 ? "0"+(date.getMonth()+1): date.getMonth()+1
    const dateMonth = date.getDate()<10? "0"+date.getDate() : date.getDate()
    return `${year}-${month}-${dateMonth}`
  }

  logOut= ()=>{
    sessionStorage.removeItem('User Name')
    sessionStorage.removeItem('Panel Token')
    this.router.navigateByUrl('/')
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
        // console.log(this.startDate, typeof(this.startDate))
        // const [UTCStartYear, UTCStartMonth, UTCStartDay] = this.startDate.split("-")
        // const [UTCEndYear, UTCEndMonth, UTCEndDay] = this.endDate.split("-")
        // // this.service.getAllSlots(new Date(UTCStartYear, UTCStartMonth, UTCStartDay).toString(),new Date(UTCEndYear, UTCEndMonth, UTCEndDay).toString()).subscribe((data)=>{
        // const UTCStartDate = new Date(UTCStartYear, UTCStartMonth-1, UTCStartDay)
        // const UTCEndDate = new Date(UTCEndYear, UTCEndMonth-1, UTCEndDay)



        // this.service.getAllSlots(this.startDate, this.endDate).subscribe((data)=>{
        //   this.slots = []
        //   console.log(data)
        //   for (let item in data){
        //     this.slots.push({
        //       start:this.formatDate(data[item].start),
        //       end : this.formatDate(data[item].end),
        //       status: data[item].status,
        //       bookedBy: data[item].bookedBy,
        //       comments: data[item].comments,
        //       id: data[item]._id,
        //       reviewedBy: data[item].reviewedBy
        //     })
        //   }
        //   console.log(this.slots)
        // })

        // this.service.getSlotsByPanel(this.startDate, this.userName).subscribe((data)=>{
        //   this.slots = []
        //   console.log(data)
        //   for (let item in data){
        //     this.slots.push({
        //       start:this.formatDate(data[item].start),
        //       end : this.formatDate(data[item].end),
        //       status: data[item].status,
        //       bookedBy: data[item].bookedBy,
        //       comments: data[item].comments,
        //       id: data[item]._id,
        //       reviewedBy: data[item].reviewedBy
        //     })
        //   }
        //   console.log(this.slots)
        // })

        this.service.getSlotsByPanelandDates(this.startDate, this.endDate, this.userId).subscribe((data)=>{
          this.slots = []
          console.log(data)
          for (let item in data){
            this.slots.push({
              slotSelection: false,
              start:this.formatDate(data[item].start),
              end : this.formatDate(data[item].end),
              status: data[item].status,
              bookedBy: data[item].bookedBy,
              comments: data[item].comments,
              id: data[item]._id,
              reviewedBy: data[item].reviewedBy,
              AssignedTAID: data[item].AssignedTAID,
              slotAssignedToTA: data[item].slotAssignedToTA
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
    const realUserId = sessionStorage.getItem("User Id")
    if(realUserId){
      this.service.getPanelData(realUserId).subscribe((data)=>{
        this.userType = data.role
      },(err)=>{
        console.error(err)
      })
    }

    this.getTAs()

    // this.service.getAllSlots(this.startDate, this.endDate).subscribe((data)=>{
    //   try{
    //     for (let item in data){
    //       this.slots.push({
    //         start:this.formatDate(data[item].start),
    //         end : this.formatDate(data[item].end),
    //         status: data[item].status,
    //         bookedBy: data[item].bookedBy,
    //         comments: data[item].comments,
    //         id: data[item]._id,
    //         reviewedBy: data[item].reviewedBy
    //       })
    //     }
    //   }
    //   catch(err){
    //     console.error(err)
    //   }
    // })

    // this.service.getSlotsByPanel(this.startDate, this.userName).subscribe((data)=>{
    //   try{
    //     for (let item in data){
    //       this.slots.push({
    //         start:this.formatDate(data[item].start),
    //         end : this.formatDate(data[item].end),
    //         status: data[item].status,
    //         bookedBy: data[item].bookedBy,
    //         comments: data[item].comments,
    //         id: data[item]._id,
    //         reviewedBy: data[item].reviewedBy
    //       })
    //     }
    //   }
    //   catch(err){
    //     console.error(err)
    //   }
    // })
    
    this.allSlotsAndPanelData()
    
  }

  allSlotsAndPanelData(){
    this.service.getSlotsByPanelandDates(this.startDate, this.endDate, this.userId).subscribe((data)=>{
      try{
        for (let item in data){
          this.slots.push({
            slotSelection: data[item].slotAssignedToTA,
            start:this.formatDate(data[item].start),
            end : this.formatDate(data[item].end),
            status: data[item].status,
            bookedBy: data[item].bookedBy,
            comments: data[item].comments,
            id: data[item]._id,
            reviewedBy: data[item].reviewedBy,
            AssignedTAID: data[item].AssignedTAID,
            slotAssignedToTA: data[item].slotAssignedToTA
          })
        }
      }
      catch(err){
        console.error(err)
      }
    })
    
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

  goBack(){
    this.location.back()
  }

  goToHome(){
    this.router.navigateByUrl('/dashboard')
  }

  TAList = []

  getTAs(){
    this.service.getTAs().subscribe((data)=>{
      this.TAList = data
    },(err)=>{
      console.error(err)
    }
  )
  }

  selectedTAtoAssign:String = ""

  assignToTA(){
    this.slots.forEach((data:any)=>{
      data.AssignedTAID = this.selectedTAtoAssign
      data.slotAssignedToTA = true
  
      this.service.updateSlots(data).subscribe((data)=>{
        console.log("updated")
      })
    })
  }

  checkAllSlots(){
    this.slots.forEach((slot)=>{
      slot.slotSelection = true
    })
  }

  assignDropdownChange(){
    this.service.getSlotsByPanelandDates(this.startDate, this.endDate,this.userId).subscribe((slot)=>{
      this.slots = []
      if (this.assigneeFilter=="all"){
        try{
          for (let item in slot){
            this.slots.push({
              slotSelection: slot[item].slotAssignedToTA? true : false,
              start:this.formatDate(slot[item].start),
              end : this.formatDate(slot[item].end),
              status: slot[item].status,
              bookedBy: slot[item].bookedBy,
              comments: slot[item].comments,
              id: slot[item]._id,
              reviewedBy: slot[item].reviewedBy,
              AssignedTAID: slot[item].AssignedTAID,
              slotAssignedToTA: slot[item].slotAssignedToTA
            })
          }
        }
        catch(err){
          console.error(err)
        }
      }
      else if (this.assigneeFilter=="assigned"){
        try{
          for (let item in slot){
            if (slot[item].slotAssignedToTA==true){
              this.slots.push({
                slotSelection: slot[item].slotAssignedToTA? true : false,
                start:this.formatDate(slot[item].start),
                end : this.formatDate(slot[item].end),
                status: slot[item].status,
                bookedBy: slot[item].bookedBy,
                comments: slot[item].comments,
                id: slot[item]._id,
                reviewedBy: slot[item].reviewedBy,
                AssignedTAID: slot[item].AssignedTAID,
                slotAssignedToTA: slot[item].slotAssignedToTA
              })
            }
          }
        }
        catch(err){
          console.error(err)
        }
      }
      else{
        try{
          for (let item in slot){
            if (slot[item].slotAssignedToTA==false){
              this.slots.push({
                slotSelection: slot[item].slotAssignedToTA? true : false,
                start:this.formatDate(slot[item].start),
                end : this.formatDate(slot[item].end),
                status: slot[item].status,
                bookedBy: slot[item].bookedBy,
                comments: slot[item].comments,
                id: slot[item]._id,
                reviewedBy: slot[item].reviewedBy,
                AssignedTAID: slot[item].AssignedTAID,
                slotAssignedToTA: slot[item].slotAssignedToTA
              })
            }
          }
        }
        catch(err){
          console.error(err)
        }
      }
        
    })
  }

}
