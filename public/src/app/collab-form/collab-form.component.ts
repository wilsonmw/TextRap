import { Component, OnInit } from '@angular/core';
import { CollabService } from '../collab.service';

@Component({
  selector: 'app-collab-form',
  templateUrl: './collab-form.component.html',
  styleUrls: ['./collab-form.component.css']
})
export class CollabFormComponent implements OnInit {
  numParticipants;

  constructor(private _collabService: CollabService) {
    this._collabService.numParticipantsObserver.subscribe(numParticipants=>{
      this.numParticipants = numParticipants;
    })

    // this._collabService.getParticipants(2);
   }

  ngOnInit() {
  }

}
