import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LandingComponent } from './guest/landing/landing.component';
import { LoginRegComponent } from './guest/login-reg/login-reg.component';
import { NavbarComponent } from './navbar/navbar.component';
import { CreateBattleComponent } from './create-battle/create-battle.component';
import { BattleComponent } from './battle/battle.component';
import { JoinComponent } from './join/join.component';
import { CritiqueComponent } from './critique/critique.component';
import { CreateCollabComponent } from './create-collab/create-collab.component';

const routes: Routes = [
    {path:'', component: GuestComponent, children:[
        {path: '', component: LandingComponent},
        {path: 'loginReg', component: LoginRegComponent}
    ]},
    {path: 'home', component: NavbarComponent, children: [
        {path:'dashboard', component: DashboardComponent},
        {path:'newBattle', component: CreateBattleComponent},
        {path:'newCollab', component:CreateCollabComponent},

        {path:'battle/:id', component: BattleComponent},
        {path:'openBattle/:id', component: JoinComponent},
        {path:'newCritique/:id', component: CritiqueComponent}
    ]}
  ];
  
  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
  
