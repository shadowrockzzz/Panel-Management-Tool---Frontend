import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelSetupComponent } from './panel-setup/panel-setup.component';
import { PanelSlotAdditionComponent } from './panel-slot-addition/panel-slot-addition.component';
import { PanelViewComponent } from './panel-view/panel-view.component';
import { ManagePanelSlotsComponent } from './manage-panel-slots/manage-panel-slots.component';
import { AuthGuardService } from './services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: SignInPageComponent
  },{
    path:'dashboard',
    component:DashboardComponent,
    canActivate: [AuthGuardService]
  },{
    path:'panel',
    component: PanelSetupComponent,
    canActivate:[AuthGuardService]
  },{
    path:'view',
    component: PanelViewComponent,
    canActivate:[AuthGuardService]
  },{
    path:'slot',
    component: PanelSlotAdditionComponent,
    canActivate:[AuthGuardService]
  },{
    path:'manage',
    component: ManagePanelSlotsComponent,
    canActivate: [AuthGuardService]
  },{
    path:'**',
    component: SignInPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
