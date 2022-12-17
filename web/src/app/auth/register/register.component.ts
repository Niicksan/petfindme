import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { comparePasswordsValidator } from '../shared/validators/compare-passwords-validator';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: [
        './register.component.scss',
        '../../core/contact/contact.component.scss'
    ]
})
export class RegisterComponent {
    error: string | undefined = undefined;

    registerForm = this.fb.group({
        email: ['', [Validators.required, Validators.email]],
        name: ['', [Validators.required, Validators.minLength(2)]],
        pass: this.fb.group({
            password: ['', [Validators.required, Validators.minLength(5)]],
            repass: []
        }, {
            validators: [comparePasswordsValidator("password", "repass")]
        })
    });

    constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

    registerHandler() {
        if (this.registerForm.invalid) { return; }
        const { email, name, pass: { password, repass } = {} } = this.registerForm.value;
        this.authService.register(email!, name!, password!, repass!).subscribe({
            next: () => {
                if (this.authService.redirectUrl) {
                    this.router.navigate([this.authService.redirectUrl]);
                    this.authService.redirectUrl = null;
                } else {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                this.error = err.error.message;
            }
        });
    }
}