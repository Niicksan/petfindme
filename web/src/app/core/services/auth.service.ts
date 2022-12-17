import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject, catchError, filter, Subscription, tap, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/environment'
import { IPet } from '../interfaces/pet';

const apiURL = environment.apiURL;

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    user: IUser | null = null;
    private logged = new ReplaySubject<boolean>(1);
    isLogged = this.logged.asObservable();
    public redirectUrl: string | null = null;

    // private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
    // user$ = this.user$$.asObservable().pipe(
    //     filter((val): val is IUser | null => val !== undefined)
    // );

    constructor(private http: HttpClient) {
        // this.subscription = this.user$.subscribe(user => {
        //     this.user = user;
        // });
    }

    private setLocalStorage(user: IUser) {
        this.user = user;
        localStorage.setItem('user', user._id,);
        localStorage.setItem('authToken', user.authToken);
        localStorage.setItem('expiresAt', user.expiresAt);
    }

    private getExpiration() {
        const expiresAt = new Date(localStorage.getItem('expiresAt') as string);
        const dateNow = new Date()
        return dateNow < expiresAt ? true : false;
    }

    get isLoggedIn() {
        return (Boolean(localStorage.getItem('authToken')) && this.getExpiration()) ? true : false;
    }

    get userData() {
        return this.user;
    }

    register(email: string, name: string, password: string, repass: string) {
        return this.http.post<IUser>(`/api/auth/register`, { email, name, password, repass }).pipe(tap((user) => {
            this.setLocalStorage(user);
        }));
    }

    login(email: string, password: string) {
        return this.http.post<IUser>(`/api/auth/login`, { email, password }).pipe(tap((user) => {
            this.setLocalStorage(user);
        }));
    }

    logout() {
        return this.http.get<IUser>(`/api/auth/logout`).pipe(tap(() => {
            this.user = null;
            localStorage.removeItem('user');
            localStorage.removeItem("expiresAt");
            localStorage.removeItem('authToken');
        }));
    }

    getProfileInfo() {
        return this.http.get<IUser>(`/api/user/profile/user-info`);
    }

    getProfilePets() {
        return this.http.get<IPet[]>(`/api/user/profile/user-pets`);
    }

    getProfileLiked() {
        return this.http.get<IPet[]>(`/api/user/profile/user-liked`);
    }

    ngOnDestroy(): void {
        // this.subscription.unsubscribe();
    }
}