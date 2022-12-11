import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, filter, Subscription, tap, throwError } from 'rxjs';
import { IUser } from '../interfaces/user';
import { environment } from 'src/environments/environment'

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnDestroy {

    subscription: Subscription;
    user: IUser | null = null;

    private user$$ = new BehaviorSubject<undefined | null | IUser>(undefined);
    user$ = this.user$$.asObservable().pipe(
        filter((val): val is IUser | null => val !== undefined)
    );

    constructor(private http: HttpClient) {
        this.subscription = this.user$.subscribe(user => {
            this.user = user;
        });
    }

    get isLoggedIn() {
        return this.user !== null;
    }

    register(email: string, name: string, password: string, repass: string) {
        return this.http.post<IUser>('/api/auth/register', { email, name, password, repass })
            .pipe(tap(user => this.user$$.next(user)));
    }

    login(email: string, password: string) {
        return this.http.post<any>('/api/auth/login', { email, password })
            .pipe(tap(user => this.user$$.next(user)));
    }

    logout() {
        return this.http.post<void>('/api/auth/logout', {})
            .pipe(tap(() => this.user$$.next(null)));
    }

    getProfile() {
        return this.http.get<IUser>('/api/user/profile')
            .pipe(
                tap(user => this.user$$.next(user)),
                catchError((err) => {
                    this.user$$.next(null);
                    return throwError(() => err);
                })
            );
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }
}