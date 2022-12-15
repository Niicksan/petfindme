import { Inject, Injectable, Provider } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HTTP_INTERCEPTORS,
    HttpResponse
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, of, take, tap, throwError, zip } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './core/services/auth.service';
import { API_ERROR } from "./app-constants";
import { environment } from '../environments/environment';
const apiURL = environment.apiURL;


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    token: string | null = localStorage.getItem('authToken');

    constructor(
        @Inject(API_ERROR) private apiError: BehaviorSubject<Error | null>,
        private router: Router,
        private authService: AuthService
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (req.url.startsWith('/api')) {
            req = req.clone({ url: req.url.replace('/api', apiURL)/*, withCredentials: true*/ });
        }

        if (this.token) {
            return next.handle(req.clone({ setHeaders: { 'X-Authorization': this.token } }));
        } else if (!this.authService.isLoggedIn) {
            return next.handle(req.clone({ headers: req.headers.delete('X-Authorization') }));
        }
        else {
            return next.handle(req.clone());
        }
    }
}

export const appInterceptorProvider: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AppInterceptor,
    multi: true
};