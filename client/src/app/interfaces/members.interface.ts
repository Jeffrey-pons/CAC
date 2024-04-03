export interface Member {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    adresse: string;
    city: string;
    postaladresse: string;
    country: string;
    type: string;
}

export interface MemberResponse {
    members: Member[];
}