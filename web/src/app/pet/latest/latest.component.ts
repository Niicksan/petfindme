import { Component, OnInit } from '@angular/core';
import { IPet } from 'src/app/core/interfaces/pet';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-latest',
    templateUrl: './latest.component.html',
    styleUrls: ['./latest.component.scss']
})
export class LatestComponent implements OnInit {

    petsList: IPet[] = [];
    isPetsFound = false;
    errorFetchingData = false;
    imageApi = environment.imageApi;

    constructor(private catalogService: CatalogService) { }

    ngOnInit(): void {
        this.catalogService.getLatestPets().subscribe({
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