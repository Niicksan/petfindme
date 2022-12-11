import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss',
        '../../core/contact/contact.component.scss'
    ]
})
export class LoginComponent {

    errors: string | undefined = undefined

    loginForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(5)]]
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

    loginHandler() {
        const { email, password } = this.loginForm.value;

        this.authService.login(email!, password!).subscribe({
            next: () => {
                this.router.navigate(['/'])
            },
            error: (err) => {
                this.errors = err.error.error;
                console.log(err.error.error);
            }
        })
    }
}