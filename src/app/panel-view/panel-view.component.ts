import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faArrowLeft, faArrowDown, faChevronRight, faMagnifyingGlass, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { SampleService } from '../services/sample.service';
import * as xlsx from 'xlsx';
import {saveAs} from 'file-saver';

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
  faMagnifyingGlass = faMagnifyingGlass;
  faArrowRightFromBracket = faArrowRightFromBracket;
  startDate:string = "";
  endDate:string = "";
  name: string="";
  band: string = ""
  accountName: string = ""
  skillSet : string = ""

  panelList:any = [];

  logOut= ()=>{
    sessionStorage.removeItem('User Name')
    sessionStorage.removeItem('Panel Token')
    this.router.navigateByUrl('/')
  }

  submitFilter = ()=>{
      const data: any = {}
      if(this.startDate){
        data['start'] = this.startDate;
      }
      if(this.endDate){
        data['end'] = this.endDate;
      }
      if(this.name){
        data['name'] = this.name;
      }
      if(this.band){
        data['band'] = this.band;
      }
      if(this.accountName){
        data['accountName'] = this.accountName;
      }
      if(this.skillSet){
        data['skillSet'] = this.skillSet;
      }
      this.service.filterPanels(data).subscribe((data)=>{
        this.panelList = [...data]
      })
  }

  constructor(private location: Location, private router: Router, private service: SampleService){

  }

  download = ()=>{

  }

  generateExcel(data:any[], fileName:string, sheetName:string){
    const workSheet:xlsx.WorkSheet = xlsx.utils.json_to_sheet(data)
    const workBook:xlsx.WorkBook = {Sheets:{[sheetName]: workSheet},SheetNames:[sheetName]}
    const excelBuffer: any = xlsx.write(workBook,{bookType:'xlsx',type:'array'})
    this.saveAsExcelFile(excelBuffer, fileName)
  }

  saveAsExcelFile(buffer:any, fileName:string){
    const data:Blob = new Blob([buffer],{type:"application/octet-stream"});
    saveAs(data,fileName+"_export_"+new Date().getTime().toString()+".xlsx")
  }


  ngOnInit(){
    this.getAllPanels()
  }

  getAllPanels(){
    this.service.getAllPanels().subscribe((data)=>{
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
