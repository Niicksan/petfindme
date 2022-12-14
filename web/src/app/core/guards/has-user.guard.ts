import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class HasUserGuard implements CanActivate {

    constructor(private router: Router, private authService: AuthService) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        const returnUrl = route.url.map(u => u.path).join('/');
        console.log(route);
        this.authService.redirectUrl = returnUrl;

        if (!this.authService.isLoggedIn) {
            return this.router.createUrlTree(['/auth/login'], { queryParams: { returnUrl } });
        }

        return true;
    }
}
