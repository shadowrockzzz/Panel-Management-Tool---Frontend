import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faHouse, faArrowLeft, faChevronRight, faMagnifyingGlass, faArrowRightFromBracket, faDownload } from '@fortawesome/free-solid-svg-icons';
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
  faDownload = faDownload;
  faChevronRight=faChevronRight;
  faMagnifyingGlass = faMagnifyingGlass;
  faArrowRightFromBracket = faArrowRightFromBracket;
  startDate:string = this.formatDate(new Date());
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

  formatDate(date:Date):string{
    let res = date.getFullYear()+"-"
    res+=((date.getMonth()<10)?("0"+(date.getMonth()+1)): (date.getMonth()+1))+"-"
    res+=(date.getDate()<10)?("0"+date.getDate()): date.getDate()
    return res
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

  reset(){
    this.startDate = "";
    this.endDate = "";
    this.name="";
    this.band = "";
    this.accountName = "";
    this.skillSet = "";
    this.getAllPanels()
  }


  ngOnInit(){
    this.submitFilter()
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
