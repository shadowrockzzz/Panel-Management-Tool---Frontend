import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PanelSetupComponent } from './panel-setup/panel-setup.component';
import { PanelSlotAdditionComponent } from './panel-slot-addition/panel-slot-addition.component';
import { PanelViewComponent } from './panel-view/panel-view.component';
import { ManagePanelSlotsComponent } from './manage-panel-slots/manage-panel-slots.component';

const routes: Routes = [
  {
    path: '',
    component: SignInPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
