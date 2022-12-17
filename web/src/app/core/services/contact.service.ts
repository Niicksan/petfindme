import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IContact } from '../interfaces/contact';
import { environment } from '../../../environments/environment';

const apiURL = environment.apiURL;


@Injectable({
    providedIn: 'root'
})
export class ContactService {

    constructor(private httpClient: HttpClient) { }

    contactUs(name: string, email: string, subject: string, message: string) {
        return this.httpClient.post<IContact>(`${apiURL}/contact-us`, { name, email, subject, message });
    }
}
