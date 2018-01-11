import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RapService } from '../rap.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.css']
})
export class JoinComponent implements OnInit {

  oneOpenBattle = {};
  username = "";

  constructor(private _router: Router, private _route: ActivatedRoute, private _rapService: RapService, private _userService: UserService) {
    this._route.paramMap.subscribe(params =>{
      this._rapService.getOneOpenBattle(params.get('id'));
      this._rapService.oneOpenBattleObserver.subscribe(openBattle =>{
        if(openBattle){
          this.oneOpenBattle = openBattle;
        }
      })
    })

    this._userService.usernameObserver.subscribe(username=>{
      this.username = username;
    })
    this._userService.getUsername();

   }

  joinBattle(){
    console.log("This is at the component level, joinBattle function");
    this._rapService.joinBattle(this.oneOpenBattle);
  }

  cancelJoin(){
    this._router.navigate(['home/dashboard']);
  }

  ngOnInit() {
  }

}
