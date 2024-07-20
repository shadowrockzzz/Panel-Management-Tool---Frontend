import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faCalendar, faCoffee, faList, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';
import { SampleService } from '../services/sample.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  faPlus = faPlus;
  faMagnifyingGlass = faMagnifyingGlass;
  faCalendar = faCalendar;
  faList = faList
  faArrowRightFromBracket = faArrowRightFromBracket;
  userType:string = ""

  constructor(private router: Router, private userService: SampleService) {
    
  }

  ngOnInit(){
    const userName = sessionStorage.getItem("User Name")
    if(userName){
      this.userService.getPanelData(userName).subscribe((data)=>{
        this.userType = data.role
      },(err)=>{
        console.error(err)
      })
    }
  }

  navigate(page:String){
    this.router.navigateByUrl('/'+page)
  }

  logOut= ()=>{
    sessionStorage.removeItem('User Name')
    sessionStorage.removeItem('Panel Token')
    this.router.navigateByUrl('/')
  }

}
