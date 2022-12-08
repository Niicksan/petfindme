import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  value = 'Clear me';

  constructor() { }

  ngOnInit(): void {
  }
  emailFormControl = new FormControl('', [Validators.required, Validators.email]);
}
