import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ContactService } from '../services/contact.service';


@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrls: ['./contact.component.scss']
})
export class ContactComponent {

    message: string | undefined = undefined;
    formSubmitted: boolean = false;
    error: string | undefined = undefined;

    contactForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(2)]],
        email: ['', [Validators.required, Validators.email]],
        subject: ['', [Validators.required, Validators.minLength(2)]],
        message: ['', [Validators.required, Validators.minLength(20)]],
    });

    constructor(private fb: FormBuilder, private contactService: ContactService, private router: Router) { }

    contactHandler() {
        if (this.contactForm.invalid) {
            return;
        }

        const { name, email, subject, message } = this.contactForm.value;

        this.contactService.contactUs(name!, email!, subject!, message!).subscribe({
            next: (value) => {
                this.formSubmitted = true;
                this.message = Object.values(value)[1];

                setTimeout(() => {
                    this.router.navigate(['/']);
                }, 2000);
            },
            error: (err) => {
                this.error = err.error.message;
            }
        });
    }
}