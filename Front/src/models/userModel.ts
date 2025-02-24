export interface User {
    id: number;
    prenom: string;
    nom: string;
}

export interface UserSet {
    total: number;
    data: User[];
}