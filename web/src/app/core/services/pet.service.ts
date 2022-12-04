import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from '../../../environments/environment';
import { IPet } from '../interfaces/pet';


const apiURL = environment.apiURL;

@Injectable({
    providedIn: 'root'
})
export class PetService {

    constructor(private httpClient: HttpClient) { }

    createPet() {
        return this.httpClient.get<IPet>(`${apiURL}/pet/create`);
    }

    getPetById(id: number) {
        return this.httpClient.get<IPet>(`${apiURL}/pet/${id}`);
    }

    updatePetById(id: number) {
        return this.httpClient.get<IPet>(`${apiURL}/pet/${id}`);
    }

    deletePetById(id: number) {
        return this.httpClient.get<IPet>(`${apiURL}/pet/${id}`);
    }

    addPetToLikedList(id: number) {
        return this.httpClient.get<IPet>(`${apiURL}/pet/like/${id}`);
    }
}