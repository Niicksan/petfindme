import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PetService } from 'src/app/core/services/pet.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent {

    constructor(private router: Router, private petService: PetService) {

        this.petService.deletePetById(this.router.url.split('/')[3]).subscribe({
            next: () => {
                this.router.navigate(['/user/profile']);
            },
            error: (err) => {
                console.log(err.error);
            }
        })
    }

}
