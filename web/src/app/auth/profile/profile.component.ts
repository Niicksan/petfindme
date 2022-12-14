import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/core/interfaces/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    user: IUser | null = null;
    errorFetchingData = false;

    constructor(private authService: AuthService) { }

    ngOnInit(): void {
        this.authService.getProfile().subscribe({
            next: (value) => {
                this.user = value;
                console.log(this.user)
            },
            error: (err) => {
                this.errorFetchingData = true;
                console.log(err.error);
            }
        });
    }
}