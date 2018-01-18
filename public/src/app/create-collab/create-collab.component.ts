import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { CollabService } from '../collab.service';

@Component({
  selector: 'app-create-collab',
  templateUrl: './create-collab.component.html',
  styleUrls: ['./create-collab.component.css']
})
export class CreateCollabComponent implements OnInit {

  numParticipants:number;


  constructor(private _router: Router, private _route: ActivatedRoute, private _collabService: CollabService, private _userService: UserService) { }

  getParticipants(num){
    console.log(num);
    this._collabService.getParticipants(num);
  }

  ngOnInit() {
  }

}
