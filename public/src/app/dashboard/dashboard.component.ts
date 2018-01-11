import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { RapService } from '../rap.service';
import * as moment from 'moment';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  loggedIn;
  userBattles = [];
  userCollabs = [];
  allBattles = [];
  allCollabs = [];
  openBattles = [];
  challenges = [];
  invited = [];
  username = "";
  user;

  constructor(private _route: ActivatedRoute, private _router: Router, private _userService: UserService,
              private _rapService: RapService) {
    // this._userService.loggedInObserver.subscribe(loggedIn =>{
    //   this.loggedIn = loggedIn
    // })
    this._userService.getUsername();
    this._rapService.getAllBattles();
    this._rapService.getUserBattles();
    this._rapService.getOpenBattles();
    this._rapService.getChallenges();

    this._userService.usernameObserver.subscribe(username=>{
      this.username = username;
    })

    this._userService.userObserver.subscribe(user=>{
      this.user = user;
      if(this.user.declinedBattles.length > 0){
        for(let i = 0; i<this.user.declinedBattles.length; i++){
          alert("That wack MC "+this.user.declinedBattles[i]+" declined your challenge!");
        }
        this._userService.clearDeclined(this.user);
      }
    })

    this._rapService.battleObserver.subscribe(battles=>{
      this.allBattles = battles;
      if(this.allBattles){
        for(let i=0; i<this.allBattles.length; i++){
          this.allBattles[i].timeSince = moment(this.allBattles[i].lastBarDate).fromNow(true);
        }
      }
    })
    this._rapService.userBattleObserver.subscribe(battles=>{
      this.userBattles = battles;
      if(this.userBattles){
        for(let i=0; i<this.userBattles.length; i++){
          this.userBattles[i].timeSince = moment(this.userBattles[i].lastBarDate).fromNow(true);
        }
      }
    })
    this._rapService.openBattleObserver.subscribe(battles=>{
      this.openBattles = battles;
      if(this.openBattles){
        for(let i=0; i<this.openBattles.length; i++){
          this.openBattles[i].timeSince = moment(this.openBattles[i].lastBarDate).fromNow(true);
        }
      }
    })
    this._rapService.challengeObserver.subscribe(battles=>{
      this.challenges = battles;
      if(this.challenges){
        for(let i=0; i<this.challenges.length; i++){
          this.challenges[i].timeSince = moment(this.challenges[i].lastBarDate).fromNow(true);
        }
      }
    })
   }



  ngOnInit() {
    
  }

}
