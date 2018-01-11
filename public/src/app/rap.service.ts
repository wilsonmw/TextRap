import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable()
export class RapService {
  
  battle;
  owner;
  opponent;
  allBattles;
  userBattles;
  openBattles;
  oneOpenBattle;
  challenges;
  bar;
  singleBar;
  critique;

  errors = {
    opponentNotExist: false,
    alreadyInBattle: false,
  }
  
  singleBattleObserver = new BehaviorSubject(this.battle);
  battleObserver = new BehaviorSubject(this.allBattles);
  userBattleObserver = new BehaviorSubject(this.userBattles);
  openBattleObserver = new BehaviorSubject(this.openBattles);
  errorObserver = new BehaviorSubject(this.errors);
  oneOpenBattleObserver = new BehaviorSubject(this.oneOpenBattle);
  challengeObserver = new BehaviorSubject(this.challenges);
  singleBarObserver = new BehaviorSubject(this.singleBar)

  username = "";

  constructor(private _http: Http, private _route: ActivatedRoute, private _router: Router) {
    
   }

  createBattle(battle){
    if(battle.opponent == ""){
      this._http.post('/battleWithNoOpponent', battle).subscribe(
        (response)=>{
          this._router.navigate(['home/dashboard']);
        },
        (err)=>{
          console.log("There was an error with no opponent battle at the service level.");
        }
      )
    } else {
      this._http.post('/battle', battle).subscribe(
        (response)=>{
          if(response.json().opponentNotExist || response.json().alreadyInBattle){
            console.log("There was an opponent error.")
            this.errors = response.json();
            this.errorObserver.next(this.errors);
            return;
          } else if(response.json()==null){
            this._router.navigate(['home/dashboard']);
          } else {
            this._router.navigate(['home/battle', response.json()._id])
          }
        },
        (err)=>{
          console.log("Battle not created successfully at rapService.ts level.");
        }
      )
    }
  }

  getBattle(id){
    this._http.get(`/getBattle/${id}`).subscribe(
      (response)=>{
        this.battle = response.json()[0];
        this.owner = response.json()[1];
        this.opponent = response.json()[2];
        this.singleBattleObserver.next(response.json());
      },
      (err)=>{
        console.log("There was an error getting the battle at the rapService.ts level.");
      }
    )
  }

  getBars(id){
    this._http.get(`/getBars/${id}`).subscribe(
      (response)=>{
        this.singleBar = response.json();
        this.singleBarObserver.next(this.singleBar);
      },
      (err)=>{
        console.log("Couldn't get the single bars from the rap service.");
      }
    )
  }

  postBars(bar){
    this._http.post('/newBar', bar).subscribe(
      (response)=>{
        this.getBattle(this.battle._id);
      },
      (err)=>{
        console.log("error creating the bars at the service level");
      }
    )
  }

  getAllBattles(){
    this._http.get('/allBattles').subscribe(
      (response)=>{
        this.allBattles = response.json();
        this.battleObserver.next(this.allBattles);
      },
      (err)=>{
        console.log("Couldn't get the battles at the service level.");
      }
    )
  }

  getUserBattles(){
    this._http.get('/userBattles').subscribe(
      (response)=>{
        this.userBattles = response.json();
        this.userBattleObserver.next(this.userBattles);
      },
      (err)=>{
        console.log("Couldn't get the userBattles at the service level.");
      }
    )
  }

  getOpenBattles(){
    this._http.get('/openBattles').subscribe(
      (response)=>{
        this.openBattles = response.json();
        this.openBattleObserver.next(this.openBattles);
      },
      (err)=>{
        console.log("Couldn't get the openBattles at the service level.");
      }
    )
  }

  getOneOpenBattle(id){
    this._http.get(`/getOneOpenBattle/${id}`).subscribe(
      (response)=>{
        this.oneOpenBattle = response.json();
        this.oneOpenBattleObserver.next(this.oneOpenBattle);
      },
      (err)=>{
        console.log("There was an error getting the battle at the rapService.ts level.");
      }
    )
  }

  getChallenges(){
    this._http.get('/challenges').subscribe(
      (response)=>{
        this.challenges = response.json();
        this.challengeObserver.next(this.challenges);
      },
      (err)=>{
        console.log("Couldn't get the challenges at the rapService.ts level.");
      }
    )
  }

  joinBattle(battle){
    this._http.post('/joinBattle', battle).subscribe(
      (response)=>{
        console.log(response.json(), "blah blah fuckity fuck");
        this.battle = response.json();
        if(!this.battle._opponent){
          alert("You're already in a battle with "+response.json().ownerName+"!");
          this._router.navigate(['home/dashboard']);
        }else{
          this._router.navigate(['home/dashboard'])
          }  
        },
      (err)=>{
        console.log("There was an error joining the battle at the service level.");
      }
    )
  }

  acceptBattle(battle){
    this._http.post('acceptChallenge', battle).subscribe(
      (response)=>{
        this.battle = response.json();
        this.singleBattleObserver.next(this.battle);
        this.getBattle(this.battle._id);
      },
      (err)=>{
        console.log("Error accepting the battle at service level.");
      }
    )
  }

  declineBattle(battle, owner, opponent){
    this._http.post('/declineChallenge', battle).subscribe(
      (response)=>{
        this._router.navigate(['home/dashboard']);
      },
      (err)=>{
        console.log("Error declining the battle at the service level.");
      }
    )
  }

  newCritique(critique){
    this._http.post('/newCritique', critique).subscribe(
      (response)=>{
          this._router.navigate(['home/battle', critique._bar._battle]);
      },
      (err)=>{
        console.log("Error posting a new critique at the service level.");
      }
    )
  }
}
