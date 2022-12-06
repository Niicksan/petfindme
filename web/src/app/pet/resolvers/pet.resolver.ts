import { Injectable } from '@angular/core';
import {
    Router, Resolve,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import { Observable } from 'rxjs';
import { IPet } from 'src/app/core/interfaces/pet';
import { PetService } from 'src/app/core/services/pet.service';

@Injectable({
    providedIn: 'root'
})
export class PetResolver implements Resolve<IPet | null> {
    constructor(private petService: PetService, private router: Router) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): IPet | null | Observable<IPet> | Promise<IPet> {
        const petId = route.params['id'];

        if (!petId) {
            this.router.navigate(['/not-found']);
            return null;
        }

        return this.petService.getPetById(petId);
    }
}