import { Component, OnInit } from '@angular/core';
import { RapService } from '../rap.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.css']
})
export class BattleComponent implements OnInit {

  battle = {
    _id: "",
    owner: "",
    opponent: "",
    bars: [],
    whoseMic: "",
    openToJoin: true,
    ongoing: true,
    maxWait: 48,
    totalBars: 30,
    winner: ""
  }

  owner = {
    _id: "",
    username: "",
    email: "",
    password: "",
    battles: [],
    collabs: [],
    bars: [],
    barsCritiqued: [],
    critiques: [],
    declinedBattles: [],
    ranking: 0,
    pointsToLevelUp: 0
  };

  opponent = {
    _id: "",
    username: "",
    email: "",
    password: "",
    battles: [],
    collabs: [],
    bars: [],
    barsCritiqued: [],
    critiques: [],
    declinedBattles: [],
    ranking: 0,
    pointsToLevelUp: 0
  };

  username;
  user;

  bar = {
    line1: "",
    line2: "",
    _owner: {},
    ownerName: "",
    _battle: {},
    critiques: [],
    scores: [],
    totalScore: 0
  }


  constructor(private _router: Router, private _route: ActivatedRoute, private _rapService: RapService, private _userService: UserService) {
    this._route.paramMap.subscribe(params =>{
      this._rapService.getBattle(params.get('id'));
      this._rapService.singleBattleObserver.subscribe(singleBattle =>{
        if(singleBattle){
          this.battle = singleBattle[0];
          this.owner = singleBattle[1];
          this.opponent = singleBattle[2];
        }
      })
    })

    this._userService.usernameObserver.subscribe(username=>{
      this.username = username;
    })
    this._userService.getUsername();  

    this._userService.userObserver.subscribe(user=>{
      this.user = user;
    })
  }

  postBars(){
    if(this.battle.whoseMic == this.owner.username){
      this.bar._owner = this.owner._id;
      this.bar.ownerName = this.owner.username;
    }
    if(this.battle.whoseMic == this.opponent.username){
      this.bar._owner = this.opponent._id;
      this.bar.ownerName = this.opponent.username;
    }
    this.bar._battle = this.battle._id;
    var confirmation = confirm("Double-check your bars - once they're posted they can't be deleted:\n\n" + this.bar.line1 + "\n" + this.bar.line2 + "\n\nAre you sure you want to post these?");
    if(confirmation == true){
      this._rapService.postBars(this.bar);
    } else {
      return;
    }
  }
  
  acceptBattle(){
    this._rapService.acceptBattle(this.battle);
  }

  declineBattle(){
    this._rapService.declineBattle(this.battle, this.owner, this.opponent);
  }

  addCritique(bar){
    for(let i=0; i<this.user.barsCritiqued.length; i++){
      if(this.user.barsCritiqued[i]._id == bar._id){
        alert("You've already critiqued these bars!");
        return;
      }
    }
    this._router.navigate(['/home/newCritique', bar._id]);
  }

  ngOnInit() {
  }

}
