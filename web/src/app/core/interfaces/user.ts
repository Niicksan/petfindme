export interface IUser {
    _id: string;
    email: string;
    name: string;
    password: string;
    myPets: string[];
    roles: string[];
    likedPets: string[];
    created_at: string;
    authToken: string;
    expiresAt: string;
};