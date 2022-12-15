import { IPet } from "./pet";

export interface IUser {
    _id: string;
    email: string;
    name: string;
    imageUrl: string;
    password: string;
    myPets: IPet[];
    roles: string[];
    likedPets: string[];
    created_at: string;
    authToken: string;
    expiresAt: string;
};