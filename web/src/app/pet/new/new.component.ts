import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PetService } from 'src/app/core/services/pet.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html',
    styleUrls: ['./new.component.scss',
        '../../core/contact/contact.component.scss']
})
export class NewComponent {
    errors: string | undefined = undefined;

    createPetForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        status: ['', [Validators.required]],
        location: ['', [Validators.required, Validators.minLength(3)]],
        contactName: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern("^(\\+359|0)[0-9]{9}$")]],
        imageUrl: ['', [Validators.pattern("^https?:\/\/.+$")]],
        description: ['', [Validators.required, Validators.minLength(20)]]
    });

    constructor(private fb: FormBuilder, private petService: PetService, private router: Router) { }

    createPetHandler() {
        if (this.createPetForm.invalid) { return; }

        const { title, status, location, contactName, phone, imageUrl, description } = this.createPetForm.value;

        this.petService.createPet(title!, status!, location!, contactName!, phone!, imageUrl!, description!).subscribe({
            next: () => {
                this.router.navigate(['/user/profile']);
            },
            error: (err) => {
                this.errors = err.error;
                console.log(err.error);
            }
        })
    }
}
