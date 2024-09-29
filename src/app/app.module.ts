import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PanelSetupComponent } from './panel-setup/panel-setup.component';
import { PanelSlotAdditionComponent } from './panel-slot-addition/panel-slot-addition.component';
import { PanelViewComponent } from './panel-view/panel-view.component';
import { ManagePanelSlotsComponent } from './manage-panel-slots/manage-panel-slots.component';
import { HttpClientModule } from '@angular/common/http';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInPageComponent,
    DashboardComponent,
    PanelSetupComponent,
    PanelSlotAdditionComponent,
    PanelViewComponent,
    ManagePanelSlotsComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
