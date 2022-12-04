import { Component, OnInit } from '@angular/core';
import { CatalogService } from 'src/app/core/services/catalog.service';
import { IPet } from 'src/app/core/interfaces/pet';

@Component({
    selector: 'app-found',
    templateUrl: './found.component.html',
    styleUrls: ['./found.component.scss',
        '../latest/latest.component.scss']
})
export class FoundComponent implements OnInit {

    petsList: IPet[] = [];
    errorFetchingData = false;

    constructor(private catalogService: CatalogService) { }

    ngOnInit(): void {
        this.catalogService.getFoundPets().subscribe({
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