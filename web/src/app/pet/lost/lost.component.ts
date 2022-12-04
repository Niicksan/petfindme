import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { IPet } from 'src/app/core/interfaces/pet';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.component.html',
  styleUrls: [
    './lost.component.scss',
    '../latest/latest.component.scss'
  ]
})
export class LostComponent implements OnInit {

  petsList: IPet[] = [];
  errorFetchingData = false;

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.getLostPets().subscribe({
      next: (value) => {
        this.petsList = value;
        console.log(this.petsList);
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.error(err);
      }
    });
  }
}
