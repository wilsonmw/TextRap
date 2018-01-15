import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { RapService } from '../rap.service';

@Component({
  selector: 'app-create-battle',
  templateUrl: './create-battle.component.html',
  styleUrls: ['./create-battle.component.css']
})
export class CreateBattleComponent implements OnInit {

  errors = {
    opponentNotExist: false,
    alreadyInBattle: false,
  }

  battle = {
    owner: "",
    opponent: "",
    bars: [],
    whoseMic: "",
    openToJoin: true,
    ongoing: true,
    maxWait: 48,
    totalBars: 20,
    winner: ""
  }
  
  constructor(private _userService: UserService, private _router: Router, private _rapService: RapService) {
    this._userService.usernameObserver.subscribe(username=>{
      this.battle.owner = username;
      
    })
    this._rapService.errorObserver.subscribe(errors => {
      this.errors = errors;
    })
    this._userService.getUsername();
   }

  submitBattle(){
    this._rapService.createBattle(this.battle);
    }
  

  ngOnInit() {
  }

}
