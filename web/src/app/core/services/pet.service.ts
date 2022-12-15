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

    createPet(title: string, status: string, location: string, contactName: string, phone: string, imageUrl: string, description: string) {
        return this.httpClient.post<IPet>(`/api/pet/create`, { title, status, location, contactName, phone, imageUrl, description });
    }

    getPetById(id: number) {
        return this.httpClient.get<IPet>(`/api/pet/${id}`);
    }

    updatePetById(id: number) {
        return this.httpClient.get<IPet>(`/api/pet/${id}`);
    }

    deletePetById(id: number) {
        return this.httpClient.get<IPet>(`/api/pet/${id}`);
    }

    addPetToLikedList(id: number) {
        return this.httpClient.get<IPet>(`/api/pet/like/${id}`);
    }
}