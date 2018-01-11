import { Component, OnInit } from '@angular/core';
import { RapService } from '../rap.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-critique',
  templateUrl: './critique.component.html',
  styleUrls: ['./critique.component.css']
})
export class CritiqueComponent implements OnInit {

  user;

  bars = {
      line1: "",
      line2: "",
      _owner: {},
      ownerName: "",
      _battle: {},
      critiques: [],
      scores: [],
      totalScore: 0 
  }

  critique = {
    _bar: this.bars,
    rhymeComplexity: "5",
    cleverness: "5",
    humor: "5",
    originality: "5",
    wordplay: "5",
    makeSense: "5",
    insult: "5",
    flow: "5",
    totalScore: 0,
    _owner: this.user
  }

  

  constructor(private _router: Router, private _route: ActivatedRoute, private _rapService: RapService, private _userService: UserService) {
    this._route.paramMap.subscribe(params=>{
      this._rapService.getBars(params.get('id'));
      this._rapService.singleBarObserver.subscribe(singleBar=>{
        if(singleBar){
          this.bars = singleBar;
        }
      })
    })

    this._userService.userObserver.subscribe(user=>{
      this.user = user;
    })
  }

   submitCritique(){
     this.critique.totalScore = (parseInt(this.critique.rhymeComplexity) * 1.25)+(parseInt(this.critique.cleverness) * 1.25)+
     (parseInt(this.critique.humor) *1.25)+(parseInt(this.critique.originality) *1.25)+(parseInt(this.critique.wordplay) *1.25)+
     (parseInt(this.critique.makeSense) *1.25)+(parseInt(this.critique.insult) *1.25)+(parseInt(this.critique.flow) *1.25);
     this.critique._owner = this.user;
     this.critique._bar = this.bars;
     this._rapService.newCritique(this.critique);
     
   }

  ngOnInit() {
  }

}
