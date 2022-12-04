import { Component, OnInit } from '@angular/core';
import { IPet } from 'src/app/core/interfaces/pet';
import { CatalogService } from 'src/app/core/services/catalog.service';

@Component({
    selector: 'app-latest',
    templateUrl: './latest.component.html',
    styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {

    petsList: IPet[] = [];
    isPetsFound = this.petsList.length > 0;
    errorFetchingData = false;

    constructor(private catalogService: CatalogService) { }

    ngOnInit(): void {
        this.catalogService.getLatestPets().subscribe({
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