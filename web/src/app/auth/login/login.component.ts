import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: [
        './login.component.scss',
        '../../core/contact/contact.component.scss'
    ]
})
export class LoginComponent {
    emailForm: FormGroup;
    emailRegex = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';

    constructor() {
        this.emailForm = new FormGroup({
            email: new FormControl('', {
                validators: [Validators.required, Validators.pattern(this.emailRegex)],
                updateOn: 'blur',
            }),
        });
    }

    get validator() {
        return true;
    }

    submit() {
        console.log(this.emailForm.value);
    }
}