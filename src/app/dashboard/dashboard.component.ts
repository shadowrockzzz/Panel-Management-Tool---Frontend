import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faCalendar, faCoffee, faList, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router: Router) {
    
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
