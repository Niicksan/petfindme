import { Component, OnInit, Input } from '@angular/core';
import { IPet } from 'src/app/core/interfaces/pet';

@Component({
  selector: 'app-pets-list',
  templateUrl: './pets-list.component.html',
  styleUrls: ['./pets-list.component.scss']
})
export class PetsListComponent implements OnInit {
  @Input() petsList: IPet[] = [];
  @Input() errorFetchingData = false;
  @Input() isPetsFound = false;

  constructor() { }

  ngOnInit(): void {
    // console.log(this.errorFetchingData);
    // console.log(this.petsList);
  }
}