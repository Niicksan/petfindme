import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { IPet } from '../interfaces/pet';


@Injectable({
    providedIn: 'root'
})
export class PetService {

    constructor(private httpClient: HttpClient) { }

    createPet(title: string, status: string, location: string, contactName: string, phone: string, imageUrl: string, description: string) {
        return this.httpClient.post<IPet>(`/api/pet/create`, { title, status, location, contactName, phone, imageUrl, description });
    }

    getPetById(id: string) {
        return this.httpClient.get<IPet>(`/api/pet/${id}`);
    }

    updatePetById(id: string, title: string, status: string, location: string, contactName: string, phone: string, imageUrl: string, description: string) {
        return this.httpClient.put<IPet>(`/api/pet/${id}`, { title, status, location, contactName, phone, imageUrl, description });
    }

    deletePetById(id: string) {
        return this.httpClient.delete<IPet>(`/api/pet/${id}`);
    }

    addPetToLikedList(id: string) {
        return this.httpClient.get<IPet>(`/api/pet/like/${id}`);
    }
}