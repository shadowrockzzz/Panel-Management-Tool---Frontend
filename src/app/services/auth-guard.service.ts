import { Injectable } from '@angular/core';
import { AuthServiceService } from './auth-service.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor(private authService: AuthServiceService, private router:Router) { 

  }
  
  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot):Boolean{
      if(this.authService.isAuthenticated()){
        return true
      }
      else{
        this.router.navigateByUrl('/');
        return false
      }
  }
}
