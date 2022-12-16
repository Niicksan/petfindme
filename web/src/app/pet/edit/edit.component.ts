import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { PetService } from 'src/app/core/services/pet.service';
import { IPet } from 'src/app/core/interfaces/pet';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss',
        '../../core/contact/contact.component.scss']
})
export class EditComponent {
    pet: IPet;
    errors: string | undefined = undefined;

    editPetForm = this.fb.group({
        title: ['', [Validators.required, Validators.minLength(3)]],
        status: ['', [Validators.required]],
        location: ['', [Validators.required, Validators.minLength(3)]],
        contactName: ['', [Validators.required, Validators.minLength(3)]],
        phone: ['', [Validators.required, Validators.pattern("^(\\+359|0)[0-9]{9}$")]],
        imageUrl: ['', [Validators.pattern("^https?:\/\/.+$")]],
        description: ['', [Validators.required, Validators.minLength(20)]]
    });

    constructor(private fb: FormBuilder, private petService: PetService, private router: Router, private activatedRoute: ActivatedRoute) {
        this.pet = this.activatedRoute.snapshot.data?.['pet'];
    }

    editPetHandler() {
        if (this.editPetForm.invalid) { return; }

        const { title, status, location, contactName, phone, imageUrl, description } = this.editPetForm.value;

        this.petService.updatePetById(this.pet._id, title!, status!, location!, contactName!, phone!, imageUrl!, description!).subscribe({
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