import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivationStart, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { AuthService } from './core/services/auth.service';


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'PetFind.Me';

    constructor(
        private router: Router,
        private pageTitle: Title,
        private authService: AuthService
    ) {
        this.router.events.pipe(
            filter((e): e is ActivationStart => e instanceof ActivationStart),
            map(e => e.snapshot.data?.['title']),
            filter((d) => !!d)
        ).subscribe((pageTitle) => {
            this.pageTitle.setTitle(pageTitle);
        });
    }
}