import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCalendar, faCoffee, faList, faMagnifyingGlass, faPlus } from '@fortawesome/free-solid-svg-icons';

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

  constructor(private router: Router) {
    
  }

  navigate(page:String){
    this.router.navigateByUrl('/'+page)
  }

}
