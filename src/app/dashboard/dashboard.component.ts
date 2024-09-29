import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faCalendar, faCoffee, faList, faMagnifyingGlass, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
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
  faUser = faUser;
  faArrowRightFromBracket = faArrowRightFromBracket;
  userType:string = ""

  constructor(private router: Router, private userService: SampleService) {
    
  }

  ngOnInit(){
    const userId = sessionStorage.getItem("User Id")
    if(userId){
      this.userService.getPanelData(userId).subscribe((data)=>{
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
    sessionStorage.removeItem('User Id')
    this.router.navigateByUrl('/')
  }

}
