import { Component, OnInit } from '@angular/core';
import { IPet } from 'src/app/core/interfaces/pet';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: IUser | null = null;
    myPets: IPet[] = [];
    myPetsLength = this.myPets.length;
    errorFetchingData = false;
    imageApi = environment.imageApi;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.getProfileInfo().subscribe({
            next: (value) => {
                this.user = value;
            },
            error: (err) => {
                this.errorFetchingData = true;
                console.log(err.error);
            }
        });

        this.authService.getProfilePets().subscribe({
            next: (value) => {
                this.myPets = value;
                this.myPetsLength = value.length;
            },
            error: (err) => {
                this.errorFetchingData = true;
                console.log(err.error);
            }
        });
    }
}