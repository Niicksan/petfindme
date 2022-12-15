import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { IPet } from 'src/app/core/interfaces/pet';
import { environment } from 'src/environments/environment';

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
  isPetsFound = this.petsList.length > 0;
  imageApi = environment.imageApi;

  constructor(private catalogService: CatalogService) { }

  ngOnInit(): void {
    this.catalogService.getLostPets().subscribe({
      next: (value) => {
        this.petsList = value;
      },
      error: (err) => {
        this.errorFetchingData = true;
        console.log(err.error);
      }
    });
  }
}
