import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { IPet } from '../interfaces/pet';

const apiURL = environment.apiURL;

@Injectable({
    providedIn: 'root'
})
export class CatalogService {

    constructor(private httpClient: HttpClient) { }

    getLatestPets() {
        return this.httpClient.get<IPet[]>(`${apiURL}/catalog/latest`);
    }

    getLostPets() {
        return this.httpClient.get<IPet[]>(`${apiURL}/catalog/lost`);
    }

    getFoundPets() {
        return this.httpClient.get<IPet[]>(`${apiURL}/catalog/found`);
    }

    getAdoptionPets() {
        return this.httpClient.get<IPet[]>(`${apiURL}/catalog/adoption`);
    }

    //   loadPosts(limit?: number) {
    //     return this.httpClient.get<IPet[]>(`${apiURL}/posts${limit ? `?limit=${limit}` : ``}`);
    //   }
}