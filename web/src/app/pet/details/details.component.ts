import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPet } from 'src/app/core/interfaces/pet';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-details',
    templateUrl: './details.component.html',
    styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
    pet: IPet;
    imageApi = environment.imageApi;

    constructor(private activatedRoute: ActivatedRoute) {
        this.pet = this.activatedRoute.snapshot.data?.['pet'];
    }

    ngOnInit(): void {
    }
}