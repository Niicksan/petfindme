import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IPet } from '../interfaces/pet';
import { PetService } from '../services/pet.service';

@Injectable({
    providedIn: 'root'
})
export class IsOwnerGuard implements CanActivate {
    pet: IPet | undefined;
    errorFetchingData = false;

    constructor(private petService: PetService, private router: Router) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        this.petService.getPetById(route.url[2].path).subscribe({
            next: (value) => {
                if (localStorage.getItem('user') !== value.owner) {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                this.errorFetchingData = true;
                console.log(err.error);
            }
        })

        return true;
    }
}