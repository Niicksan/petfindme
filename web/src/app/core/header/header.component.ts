import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../interfaces/user';
import { AuthService } from '../services/auth.service';

declare const hideMenu: any;

@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
	user: IUser | null = null;

	constructor(private authService: AuthService, private router: Router) { }

	get isLoggedIn() {
		return this.authService.isLoggedIn;
	}

	onClick() {
		hideMenu();
	}
}