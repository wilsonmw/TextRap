import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { GuestComponent } from './guest/guest.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BattleComponent } from './battle/battle.component';
import { CollabComponent } from './collab/collab.component';
import { LoginRegComponent } from './guest/login-reg/login-reg.component';
import { LandingComponent } from './guest/landing/landing.component';
import { CritiqueComponent } from './critique/critique.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateBattleComponent } from './create-battle/create-battle.component';
import { CreateCollabComponent } from './create-collab/create-collab.component';
import { JoinComponent } from './join/join.component';
import { CollabFormComponent } from './collab-form/collab-form.component';

import { UserService } from './user.service';
import { RapService } from './rap.service';
import { CollabService } from './collab.service';

@NgModule({
  declarations: [
    AppComponent,
    GuestComponent,
    DashboardComponent,
    BattleComponent,
    CollabComponent,
    LoginRegComponent,
    LandingComponent,
    CritiqueComponent,
    NavbarComponent,
    CreateBattleComponent,
    CreateCollabComponent,
    JoinComponent,
    CollabFormComponent
    ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [UserService, RapService, CollabService],
  bootstrap: [AppComponent]
})
export class AppModule { }
